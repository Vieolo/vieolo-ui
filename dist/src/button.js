// React
import React from 'react';
export default function Button(props) {
    let s = {};
    let c = `vieolo-button`;
    if (props.toLowerCase) {
        s['textTransform'] = 'initial';
    }
    if (props.fontSize) {
        s['fontSize'] = `${props.fontSize}px`;
    }
    if (props.className)
        c += " " + props.className;
    if (props.color) {
        c += " " + props.color + "-background";
        c += " " + "ripple-" + props.color;
    }
    if (props.disabled)
        c += " disabled";
    return React.createElement("button", { className: c, onClick: props.onClick, style: s },
        props.startIcon &&
            React.createElement("span", { className: "start-icon" }, props.startIcon),
        props.text,
        props.endIcon &&
            React.createElement("span", { className: 'end-icon' }, props.endIcon));
}
