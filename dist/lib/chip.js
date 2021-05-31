import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Components
import IconButton from './icon_button';
export default function Chip(props) {
    let s = {};
    if (props.onChipSelect)
        s['cursor'] = 'pointer';
    let button;
    if (props.buttonComponent) {
        button = props.buttonComponent;
    }
    else if (props.onButtonClick && props.buttonIcon) {
        button = _jsx(IconButton, { icon: props.buttonIcon, onClick: props.onButtonClick, size: 'small' }, void 0);
    }
    return _jsx("div", Object.assign({ className: `vieolo-chip ${props.className || ''}`, style: { ...s, ...props.style }, id: props.id, onClick: () => {
            if (props.onChipSelect) {
                props.onChipSelect();
            }
        } }, { children: _jsxs("div", Object.assign({ className: `chip-content${props.selected ? ' chip-content-selected' : ''}` }, { children: [props.icon &&
                    props.icon,
                _jsx("p", { children: props.label }, void 0),
                ((props.onButtonClick && props.buttonIcon) || (props.buttonComponent)) &&
                    _jsx("span", { children: button }, void 0)] }), void 0) }), void 0);
}
