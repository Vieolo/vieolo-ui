import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
// Vieolo UI
import Typography from "../Typography";
// Utility
import { handleOnKeyDown } from "../utility/onkeydown_utility";
export default function RadioGroup(props) {
    let className = `vieolo-radio-group__radio-contents vieolo-radio-group__radio-contents--${props.direction || 'horizontal'}`;
    let buttonClass = 'vieolo-radio-group__radio-button';
    return _jsx("div", { className: `vieolo-radio-group${props.disabled ? ' disabled' : ''}`, children: _jsx("div", { className: className, children: props.options.map((o) => {
                return _jsx("div", { "aria-label": o.ariaLabel || undefined, tabIndex: props.disabled ? undefined : 0, className: `${buttonClass} ${props.value === o.id ? buttonClass + "--selected" : ""} ${buttonClass}--${props.direction || 'horizontal'}`, onClick: () => {
                        props.onOptionChange(o.id);
                    }, onKeyDown: (e) => {
                        if (props.disabled)
                            return;
                        handleOnKeyDown(e, {
                            onEnter: () => {
                                props.onOptionChange(o.id);
                            }
                        });
                    }, style: {
                        padding: `0 ${props.horizontalButtonPadding || 10}px`
                    }, children: typeof o.button === 'string'
                        ? _jsx(Typography, { text: o.button })
                        : _jsx(_Fragment, { children: o.button }) }, o.id);
            }) }) });
}
