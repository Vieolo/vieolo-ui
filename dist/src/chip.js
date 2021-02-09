// React
import React from 'react';
// Components
import IconButton from './icon_button';
export default function Chip(props) {
    let s = {};
    if (props.onChipSelect)
        s['cursor'] = 'pointer';
    let button;
    if (props.buttonComponent) {
        button = props.buttonComponent;
    }
    else if (props.onButtonClick && props.buttonIcon) {
        button = React.createElement(IconButton, { icon: props.buttonIcon, onClick: props.onButtonClick, size: 'small' });
    }
    return React.createElement("div", { className: `vieolo-chip ${props.className || ''}`, style: { ...s, ...props.style }, id: props.id, onClick: () => {
            if (props.onChipSelect) {
                props.onChipSelect();
            }
        } },
        React.createElement("div", { className: `chip-content${props.selected ? ' chip-content-selected' : ''}` },
            props.icon &&
                props.icon,
            React.createElement("p", null, props.label),
            ((props.onButtonClick && props.buttonIcon) || (props.buttonComponent)) &&
                React.createElement("span", null, button)));
}
