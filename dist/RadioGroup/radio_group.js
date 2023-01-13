import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Typography from "../Typography";
import Flex from "../Flex";
import Card from "../Card";
// Utility
import { handleOnKeyDown } from "../utility/onkeydown_utility";
import Checkbox from "../CheckBox";
export default function RadioGroup(props) {
    return _jsx("div", { className: `vieolo-radio-group${props.disabled ? ' disabled' : ''}`, children: _jsx(Flex, { direction: props.direction === 'vertical' ? 'column' : 'row', rowGap: props.gap || 'none', columnGap: props.gap || 'none', children: props.options.map((o) => {
                return _jsx("div", { "aria-label": o.ariaLabel || undefined, tabIndex: props.disabled ? undefined : 0, className: 'vieolo-radio-group__button', onClick: () => {
                        props.onOptionChange(o.id);
                    }, onKeyDown: (e) => {
                        if (props.disabled)
                            return;
                        handleOnKeyDown(e, {
                            onEnter: () => {
                                props.onOptionChange(o.id);
                            }
                        });
                    }, children: _jsx(Card, { className: `padding-vertical--${props.verticalButtonPadding || 'half'} padding-horizontal--${props.horizontalButtonPadding || 'half'}`, borderRadius: props.borderRadius || 'half', color: props.color, emphasis: props.value === o.id ? 'medium' : 'none', children: _jsxs(Flex, { columnGap: "half", alignItems: "center", children: [o.icon
                                    ? o.icon
                                    : _jsx(Checkbox, { type: "round", value: props.value === o.id, onChange: () => { } }), (o.title || o.subTitle) &&
                                    _jsxs("div", { children: [o.title &&
                                                _jsx(Typography, { text: o.title, fontWeight: 'bold', nonselectable: true }), o.subTitle &&
                                                _jsx(Typography, { text: o.subTitle, type: 'paragraph-small', nonselectable: true })] })] }) }) }, o.id);
            }) }) });
}
