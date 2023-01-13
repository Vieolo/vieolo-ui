import { jsx as _jsx } from "react/jsx-runtime";
export default function Checkbox(props) {
    return _jsx("div", { className: `vieolo-checkbox vieolo-checkbox--${props.type === 'round' ? 'round' : 'square'} ${props.disabled ? 'disabled' : ''}`, children: _jsx("input", { type: "checkbox", checked: props.value, onChange: e => {
                e.stopPropagation();
                if (props.disabled)
                    return;
                props.onChange(!props.value);
            }, "aria-label": props.ariaLabel }) });
}
