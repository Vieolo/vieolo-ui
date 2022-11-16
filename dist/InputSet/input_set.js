import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Private Components
import TipIcon from '../private/tip_icon';
// Public Components
import Input from '../Input/input';
import IconButton from '../IconButton';
export default function InputSet(props) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size === 'small')
        width = '100px';
    else if (size === 'large')
        width = '240px';
    else if (size === 'full')
        width = '100%';
    let actionComponent = _jsx("span", {});
    if (props.actionButton) {
        actionComponent = _jsx(IconButton, { icon: props.actionButton.icon, onClick: props.actionButton.onClick, tooltip: props.actionButton.description, tooltipPosition: 'down-left', size: 'small' });
    }
    else if (props.tip) {
        actionComponent = _jsxs("div", { className: "tip-div vieolo-tooltip", children: [_jsx(TipIcon, {}), _jsx("div", { className: "tooltip-text-small tooltip-text-down-left", children: props.tip })] });
    }
    return _jsxs("div", { className: `vieolo-input-set${props.disabled ? ' disabled' : ''}`, style: { width: width }, children: [(props.label || props.actionButton) &&
                _jsxs("div", { className: "label-container", children: [_jsx("label", { children: props.label }), actionComponent] }), _jsx(Input, { value: props.value, error: props.error, onChange: props.onChange, placeholder: props.placeholder || '', size: props.size, type: props.type, ariaLabel: props.ariaLabel || props.label, autoFocus: props.autoFocus, onKeyDown: props.onKeyDown, inputType: props.inputType })] });
}
