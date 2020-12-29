// React
import React from 'react';
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
        document.querySelector('main').style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
        document.querySelector('main').style.overflow = 'auto';
    }
    getSelectedItem(value) {
        return this.props.items.filter(i => i.value == value)[0];
    }
    render() {
        let thisSelectedItem = this.getSelectedItem(this.props.selectedItem);
        return (React.createElement("div", { className: "vieolo-select", ref: this.container },
            React.createElement("div", { className: `select-button${this.props.error ? ' select-button-error' : ''}`, onClick: () => { this.setState({ open: true }); } },
                React.createElement("p", { className: "button-title" }, this.props.title),
                React.createElement("p", { className: "button-value" }, thisSelectedItem ? thisSelectedItem.title : null)),
            this.state.open &&
                React.createElement("div", { className: "select-dropdown" }, this.props.items.map(item => {
                    return React.createElement(SelectItem, { item: item, isSelected: this.props.selectedItem == item.value, onSelect: (t) => {
                            this.setState({
                                open: false,
                            });
                            this.props.onSelect(t.value);
                        } });
                }))));
    }
}
function SelectItem(props) {
    return React.createElement("div", { className: `select-item${props.isSelected ? " select-item-selected" : ''}`, onClick: () => { props.onSelect(props.item); } }, props.item.title);
}
