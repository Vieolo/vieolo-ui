import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export default function Switch(props) {
    return _jsxs("div", { className: `vieolo-switch${props.disabled ? ' disabled' : ''}`, children: [_jsx("input", { id: props.switchID, type: "checkbox", name: "set-name", className: "switch-input", checked: props.on, readOnly: true }), _jsxs("label", { htmlFor: props.switchID, className: "switch-label", onClick: (e) => {
                    e.stopPropagation();
                    props.onChange(!props.on);
                }, "aria-label": props.ariaLabel, children: [_jsx("span", { className: "switch-on" }), _jsx("span", { className: "switch-off" })] })] });
}
