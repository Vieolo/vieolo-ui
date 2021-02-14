// React
import React from 'react';
// Components
import Input from './input';
export default function TextareaSet(props) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size == 'small')
        width = '100px';
    else if (size == 'large')
        width = '240px';
    else if (size == 'full')
        width = '100%';
    return React.createElement("div", { className: `vieolo-input-set${props.disabled ? ' disabled' : ''}`, style: { width: width } },
        React.createElement("div", { className: "label-container" },
            React.createElement("label", null, props.label),
            props.tip &&
                React.createElement("div", { className: "tip-div vieolo-tooltip" },
                    React.createElement("div", { className: "tip-icon" }, "!"),
                    React.createElement("div", { className: "tooltip-text-small tooltip-text-down-left" }, props.tip))),
        React.createElement(Input, { value: props.value, error: props.error, onChange: props.onChange, placeholder: props.placeholder || '', size: props.size, type: props.type }));
}
