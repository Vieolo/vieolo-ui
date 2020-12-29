// React
import React from 'react';
// Components
import Textarea from './textarea';
export default function TextareaSet(props) {
    return React.createElement("div", { className: `vieolo-textarea-set${props.disabled ? ' disabled' : ''}` },
        React.createElement("label", null, props.label),
        props.tip &&
            React.createElement("div", { className: "tip-div tooltip" },
                React.createElement("div", { className: "tip-icon" }, "!"),
                React.createElement("div", { className: "tooltip-text-down" }, props.tip)),
        React.createElement("br", null),
        React.createElement(Textarea, { value: props.value, error: props.error, onChange: props.onChange, placeholder: props.placeholder || '', size: props.size }));
}
