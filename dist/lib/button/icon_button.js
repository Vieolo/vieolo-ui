import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function IconButton(props) {
    let c = `vieolo-icon-button vieolo-icon-button--${props.size || 'medium'} vieolo-icon-button--border-radius-${props.borderRadius || 'default'}`;
    let e = props.emphasis || 'none';
    let col = props.color || 'primary';
    if (e === 'high') {
        c = `${c} background-color--${col}-normal ripple ripple--${col}-light color--${col}-text border--px-0`;
    }
    else if (e === 'medium') {
        c = `${c} background-color--${col}-light ripple ripple--${col}-normal  border--px-0`;
    }
    else if (e === 'low') {
        c = `${c} background-color--white border--${col}-light hover--${col}-light color--${col}-normal  border--px-${props.borderWidth || '2'} border--solid`;
    }
    else {
        c = `${c} background-color--white border--white hover-border--${col}-light color--${col}-normal border--px-${props.borderWidth || '2'} border--solid ripple--${col}-light`;
    }
    if (props.tooltip)
        c += " vieolo-tooltip";
    if (props.disabled)
        c += " disabled";
    if (props.className)
        c += " " + props.className;
    return _jsxs("button", Object.assign({ className: c, onClick: props.onClick, style: props.style || {}, type: props.type }, { children: [props.icon,
            props.tooltip &&
                _jsx("div", Object.assign({ className: `tooltip-text-${props.tooltipPosition || 'up'}` }, { children: props.tooltip }), void 0)] }), void 0);
}
