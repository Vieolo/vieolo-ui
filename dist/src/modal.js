// React
import React from 'react';
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = (event) => {
            if (this.container.current && !this.container.current.contains(event.target)) {
                this.props.onClose();
            }
        };
        this.container = React.createRef();
    }
    componentDidMount() {
        document.querySelector('main').style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.querySelector('main').style.overflow = 'auto';
    }
    render() {
        return (React.createElement("div", { className: `vieolo-modal`, onClick: this.handleClickOutside },
            React.createElement("div", { className: "modal-content", ref: this.container }, this.props.children)));
    }
}
