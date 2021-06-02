import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return _jsxs("button", Object.assign({ className: c, onClick: props.onClick, style: s }, { children: [props.startIcon &&
                _jsx("span", Object.assign({ className: "start-icon" }, { children: props.startIcon }), void 0),
            props.text,
            props.endIcon &&
                _jsx("span", Object.assign({ className: 'end-icon' }, { children: props.endIcon }), void 0)] }), void 0);
}
