// React
import React from 'react';
export default function IconButton(props) {
    let rippleClass;
    let hoverClass;
    let colorClass = `${props.color || 'primary'}-color`;
    if (props.color == "error") {
        rippleClass = "ripple-error";
        hoverClass = "hover-error";
    }
    else if (props.color == "alert") {
        rippleClass = "ripple-alert";
        hoverClass = "hover-alert";
    }
    else if (props.color == "success") {
        rippleClass = "ripple-success";
        hoverClass = "hover-success";
    }
    else if (props.color == "accessoryOrange") {
        rippleClass = "ripple-accessory-orange";
        hoverClass = "hover-accessory-orange";
    }
    else {
        rippleClass = 'ripple-tertiary';
        hoverClass = "hover-tertiary";
    }
    let className = "icon-button " + " " + colorClass + " " + rippleClass + " " + hoverClass + " " + (props.className || "");
    if (props.tooltip)
        className += " tooltip";
    if (props.size == "small")
        className += " icon-button-small";
    if (props.disabled)
        className += " disabled";
    return React.createElement("button", { className: className, onClick: props.onClick },
        props.icon,
        props.tooltip &&
            React.createElement("div", { className: `tooltip-text-${props.tooltipPosition || 'up'}` }, props.tooltip));
}
