import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Button(props) {
    let s = {};
    let h = props.height || 'medium';
    let w = props.width || 'content';
    let c = `vieolo-button vieolo-button--${h} vieolo-button--${w}-width vieolo-button--border-radius-${props.borderRadius || 'default'}`;
    let e = props.emphasis || 'high';
    if (props.toLowerCase) {
        s['textTransform'] = 'initial';
    }
    if (props.fontSize) {
        s['fontSize'] = `${props.fontSize}px`;
    }
    if (e === 'high') {
        c = `${c} background-color--${props.color}-normal ripple ripple--${props.color}-light color--${props.color}-text border--px-0`;
    }
    else if (e === 'medium') {
        c = `${c} background-color--${props.color}-light ripple ripple--${props.color}-normal  border--px-0`;
    }
    else if (e === 'low') {
        c = `${c} background-color--white border--${props.color}-light hover--${props.color}-light color--${props.color}-normal  border--px-2 border--solid`;
    }
    else {
        c = `${c} background-color--white border--white hover-border--${props.color}-light color--${props.color}-normal border--px-2 border--solid ripple--${props.color}-light`;
    }
    if (props.disabled)
        c += " disabled";
    if (props.className)
        c += " " + props.className;
    return _jsxs("button", Object.assign({ className: c, onClick: props.onClick, style: s }, { children: [props.startIcon &&
                _jsx("span", Object.assign({ className: "start-icon" }, { children: props.startIcon }), void 0),
            props.text,
            props.endIcon &&
                _jsx("span", Object.assign({ className: 'end-icon' }, { children: props.endIcon }), void 0)] }), void 0);
}
