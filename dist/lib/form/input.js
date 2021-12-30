import { jsx as _jsx } from "react/jsx-runtime";
export default function Input(props) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size === 'small')
        width = '100px';
    else if (size === 'large')
        width = '240px';
    else if (size === 'full')
        width = '100%';
    return _jsx("input", { type: props.type || 'text', value: props.value, placeholder: props.placeholder, onChange: e => { props.onChange(e.target.value); }, className: `vieolo-input${props.error ? ' input-error' : ''}${props.disabled ? ' disabled' : ''}`, style: { width: width } }, void 0);
}
