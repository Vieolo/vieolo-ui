import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Private Components
import TipIcon from '../private/tip_icon';
// Public Components
import Select from '../Select';
import Typography from '../Typography';
export default function SelectSet(props) {
    let actionComponent;
    if (props.tip) {
        actionComponent = _jsxs("div", { className: "tip-div vieolo-tooltip", children: [_jsx(TipIcon, {}), _jsx("div", { className: "tooltip-text-small tooltip-text-down-left", children: props.tip })] });
    }
    let className = `vieolo-select-set vieolo-select-set--${props.width || 'medium'}`;
    if (props.disabled) {
        className += " disabled";
    }
    return _jsxs("div", { className: className, children: [_jsxs("div", { className: "label-container", children: [_jsx("label", { children: props.label }), actionComponent && actionComponent] }), _jsx(Select, { ...props, error: props.error === true || (typeof props.error === 'string' && props.error.length > 0) }), (typeof props.error === 'string' && props.error.trim().length > 0) &&
                _jsx(Typography, { text: props.error, type: 'caption-medium', color: 'error', colorType: 'normal', className: 'vieolo-input-set__error' })] });
}
