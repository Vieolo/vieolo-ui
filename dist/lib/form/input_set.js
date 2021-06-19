import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Private Components
import TipIcon from '../private/tip_icon';
// Public Components
import Input from './input';
import IconButton from '../button/icon_button';
export default function InputSet(props) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size === 'small')
        width = '100px';
    else if (size === 'large')
        width = '240px';
    else if (size === 'full')
        width = '100%';
    let actionComponent = _jsx("span", {}, void 0);
    if (props.actionButton) {
        actionComponent = _jsx(IconButton, { icon: props.actionButton.icon, onClick: props.actionButton.onClick, tooltip: props.actionButton.description, tooltipPosition: 'down-left', size: 'small' }, void 0);
    }
    else if (props.tip) {
        actionComponent = _jsxs("div", Object.assign({ className: "tip-div vieolo-tooltip" }, { children: [_jsx(TipIcon, {}, void 0),
                _jsx("div", Object.assign({ className: "tooltip-text-small tooltip-text-down-left" }, { children: props.tip }), void 0)] }), void 0);
    }
    return _jsxs("div", Object.assign({ className: `vieolo-input-set${props.disabled ? ' disabled' : ''}`, style: { width: width } }, { children: [_jsxs("div", Object.assign({ className: "label-container" }, { children: [_jsx("label", { children: props.label }, void 0),
                    actionComponent] }), void 0),
            _jsx(Input, { value: props.value, error: props.error, onChange: props.onChange, placeholder: props.placeholder || '', size: props.size, type: props.type }, void 0)] }), void 0);
}
