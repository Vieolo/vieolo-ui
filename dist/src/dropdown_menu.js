// React
import React from 'react';
export default class DropDownMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleButtonClick = () => {
            this.setState(state => {
                return {
                    open: !this.state.open
                };
            });
        };
        this.handleClickOutside = (event) => {
            if (this.container.current && !this.container.current.contains(event.target)) {
                this.setState({
                    open: false,
                });
            }
        };
        this.state = {
            open: false,
        };
        this.container = React.createRef();
    }
    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    }
    render() {
        return (React.createElement("div", { className: `vieolo-dropdown-menu ${this.props.className || ''}`, ref: this.container },
            React.createElement("div", { onClick: () => this.handleButtonClick() }, this.props.buttonComponent),
            this.state.open &&
                React.createElement("div", { className: "dropdown" }, this.props.items.map(item => {
                    return React.createElement(DropDownMenuItem, { title: item.title, icon: item.icon, onClick: (t) => {
                            this.setState({
                                open: false,
                            });
                            this.props.onItemSelec(t);
                        } });
                }))));
    }
}
function DropDownMenuItem(props) {
    return React.createElement("div", { className: "dropdown-item", onClick: () => { props.onClick(props.title); } },
        props.icon &&
            props.icon,
        props.title);
}
