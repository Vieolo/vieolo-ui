import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function IconButton(props) {
    let rippleClass = `ripple-${props.color || 'primary'}`;
    let hoverClass = `hover-${props.color || 'primary'}`;
    let colorClass = `${props.color || 'primary'}-color`;
    let className = `vieolo-icon-button ${colorClass} ${hoverClass} ${rippleClass} ${props.className || ""}`;
    if (props.tooltip)
        className += " vieolo-tooltip";
    if (props.size === "small")
        className += " vieolo-icon-button-small";
    if (props.disabled)
        className += " disabled";
    return _jsxs("button", Object.assign({ className: className, onClick: props.onClick }, { children: [props.icon,
            props.tooltip &&
                _jsx("div", Object.assign({ className: `tooltip-text-${props.tooltipPosition || 'up'}` }, { children: props.tooltip }), void 0)] }), void 0);
}
