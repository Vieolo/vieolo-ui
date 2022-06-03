import { jsx as _jsx } from "react/jsx-runtime";
export default function Spinner(props) {
    return _jsx("svg", Object.assign({ className: `vieolo-spinner vieolo-spinner--${props.size || 'medium'}`, viewBox: "0 0 50 50" }, { children: _jsx("circle", { className: `vieolo-spinner__path vieolo-spinner__path--${props.color || 'primary'}-${props.colorType || 'normal'}`, cx: "25", cy: "25", r: "20", fill: "none", strokeWidth: "5" }, void 0) }), void 0);
}
