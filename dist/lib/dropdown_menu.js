import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
        return (_jsxs("div", Object.assign({ className: `vieolo-dropdown-menu ${this.props.className || ''}`, ref: this.container }, { children: [_jsx("div", Object.assign({ onClick: () => this.handleButtonClick() }, { children: this.props.buttonComponent }), void 0),
                this.state.open &&
                    _jsx("div", Object.assign({ className: "dropdown" }, { children: this.props.items.map(item => {
                            return _jsx(DropDownMenuItem, { title: item.title, icon: item.icon, onClick: (t) => {
                                    this.setState({
                                        open: false,
                                    });
                                    this.props.onItemSelec(t);
                                } }, void 0);
                        }) }), void 0)] }), void 0));
    }
}
function DropDownMenuItem(props) {
    return _jsxs("div", Object.assign({ className: "dropdown-item", onClick: () => { props.onClick(props.title); } }, { children: [props.icon &&
                props.icon,
            props.title] }), void 0);
}
