import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import Button from "../Button";
export default function FloatingActionButton(props) {
    return _jsx("div", { className: "vieolo-floating-action-button", children: _jsx(Button, { ...props, text: props.text || "", startIcon: props.icon, emphasis: props.emphasis || 'high' }) });
}
