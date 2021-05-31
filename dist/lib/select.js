import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import React, { Fragment } from 'react';
export default class Select extends React.Component {
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
            open: false
        };
        this.container = React.createRef();
    }
    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
        let main = document.querySelector('main');
        if (main)
            main.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
        let main = document.querySelector('main');
        if (main)
            main.style.overflow = 'auto';
    }
    getSelectedItem(value) {
        return this.props.items.filter(i => i.value == value)[0];
    }
    render() {
        let thisSelectedItem = this.getSelectedItem(this.props.selectedItem);
        return (_jsxs("div", Object.assign({ className: "vieolo-select", ref: this.container }, { children: [_jsxs("div", Object.assign({ className: `select-button${this.props.error ? ' select-button-error' : ''}`, onClick: () => { this.setState({ open: true }); } }, { children: [_jsx("p", Object.assign({ className: "button-title" }, { children: this.props.title }), void 0),
                        _jsx("p", Object.assign({ className: "button-value" }, { children: thisSelectedItem ? thisSelectedItem.title : null }), void 0)] }), void 0),
                this.state.open &&
                    _jsx("div", Object.assign({ className: "select-dropdown" }, { children: this.props.items.map(item => {
                            return _jsx(SelectItem, { item: item, isSelected: this.props.selectedItem == item.value, onSelect: (t) => {
                                    this.setState({
                                        open: false,
                                    });
                                    this.props.onSelect(t.value);
                                } }, void 0);
                        }) }), void 0)] }), void 0));
    }
}
function SelectItem(props) {
    let className = "select-item";
    if (props.isSelected)
        className += " select-item-selected";
    if (props.item.category)
        className += " select-item-category";
    return _jsxs(Fragment, { children: [props.item.category &&
                _jsx("p", Object.assign({ className: "category-name" }, { children: props.item.category }), void 0),
            _jsx("div", Object.assign({ className: className, onClick: () => { props.onSelect(props.item); } }, { children: props.item.title }), void 0)] }, void 0);
}
