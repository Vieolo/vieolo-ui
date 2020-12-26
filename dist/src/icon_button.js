// React
import React from 'react';
export default function IconButton(props) {
    let rippleClass = `ripple-${props.color}`;
    let hoverClass = `hover-${props.color}`;
    let colorClass = `${props.color || 'primary'}-color`;
    let className = "vieolo-icon-button " + " " + colorClass + " " + rippleClass + " " + hoverClass + " " + (props.className || "");
    if (props.tooltip)
        className += " tooltip";
    if (props.size == "small")
        className += " vieolo-icon-button-small";
    if (props.disabled)
        className += " disabled";
    return React.createElement("button", { className: className, onClick: props.onClick },
        props.icon,
        props.tooltip &&
            React.createElement("div", { className: `tooltip-text-${props.tooltipPosition || 'up'}` }, props.tooltip));
}
