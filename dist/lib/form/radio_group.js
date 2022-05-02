import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// Vieolo UI
import Typography from "../typography/typography";
export default function RadioGroup(props) {
    let className = `vieolo-radio-group__radio-contents vieolo-radio-group__radio-contents--${props.direction || 'horizontal'}`;
    let buttonClass = 'vieolo-radio-group__radio-button';
    return _jsx("div", Object.assign({ className: "vieolo-radio-group" }, { children: _jsx("div", Object.assign({ className: className }, { children: props.options.map((o) => {
                return _jsx("div", Object.assign({ className: `${buttonClass} ${props.value === o.id ? buttonClass + "--selected" : ""} ${buttonClass}--${props.direction || 'horizontal'}`, onClick: () => {
                        props.onOptionChange(o.id);
                    }, style: {
                        padding: `0 ${props.horizontalButtonPadding || 10}px`
                    } }, { children: typeof o.button === 'string'
                        ? _jsx(Typography, { text: o.button }, void 0)
                        : _jsx(_Fragment, { children: o.button }, void 0) }), o.id);
            }) }), void 0) }), void 0);
}
