import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Private Components
import TipIcon from '../private/tip_icon';
// Public Components
import Textarea from './textarea';
export default function TextareaSet(props) {
    let size = props.size || 'medium';
    let width = '180px';
    if (size == 'small')
        width = '100px';
    else if (size == 'large')
        width = '240px';
    else if (size == 'full')
        width = '100%';
    return _jsxs("div", Object.assign({ className: `vieolo-textarea-set${props.disabled ? ' disabled' : ''}`, style: { width: width } }, { children: [_jsxs("div", Object.assign({ className: "label-container" }, { children: [_jsx("label", { children: props.label }, void 0),
                    props.tip &&
                        _jsxs("div", Object.assign({ className: "tip-div vieolo-tooltip" }, { children: [_jsx(TipIcon, {}, void 0),
                                _jsx("div", Object.assign({ className: "tooltip-text-small tooltip-text-down-left" }, { children: props.tip }), void 0)] }), void 0)] }), void 0),
            _jsx(Textarea, { value: props.value, error: props.error, onChange: props.onChange, placeholder: props.placeholder || '', size: props.size, ariaLabel: props.label }, void 0)] }), void 0);
}
