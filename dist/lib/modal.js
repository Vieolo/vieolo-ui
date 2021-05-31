import { jsx as _jsx } from "react/jsx-runtime";
// React
import React from 'react';
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleClickOutside = (event) => {
            if (this.container.current && !this.container.current.contains(event.target)) {
                this.props.onClose(event);
            }
        };
        this.container = React.createRef();
    }
    componentDidMount() {
        let main = document.querySelector('main');
        if (main)
            main.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        let main = document.querySelector('main');
        if (main)
            main.style.overflow = 'auto';
    }
    render() {
        return (_jsx("div", Object.assign({ className: `vieolo-modal`, onClick: this.handleClickOutside }, { children: _jsx("div", Object.assign({ className: "modal-content", ref: this.container }, { children: this.props.children }), void 0) }), void 0));
    }
}
