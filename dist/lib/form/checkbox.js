import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Checkbox(props) {
    return _jsx("div", Object.assign({ className: `vieolo-checkbox ${props.disabled ? 'disabled' : ''}`, tabIndex: 0, onKeyDown: e => {
            if ((e.code === "Enter" || e.code === "Space") && !props.disabled) {
                e.preventDefault();
                props.onChange(!props.value);
            }
        } }, { children: _jsxs("label", { children: [_jsx("input", { type: "checkbox", checked: props.value, onChange: () => props.onChange(!props.value) }, void 0),
                _jsx("svg", Object.assign({ viewBox: "0 0 21 21" }, { children: _jsx("path", { d: "M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186" }, void 0) }), void 0)] }, void 0) }), void 0);
}
