import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { getEmphasisClasses } from '../utility/style_utility';
// Components
import IconButton from '../IconButton';
export default function Chip(props) {
    let color = props.color || 'primary';
    let c = `vieolo-chip vieolo-chip--border-radius-${props.borderRadius || 'default'} vieolo-chip--${props.size || "medium"}`;
    let e = props.emphasis || 'low';
    if (props.disabled)
        c += " disabled";
    c += getEmphasisClasses(props.selected ? 'high' : e, color, {
        hasRipple: true,
        hoverable: true
    });
    let s = {};
    if (props.onChipSelect)
        s['cursor'] = 'pointer';
    let button;
    if (props.buttonComponent) {
        button = props.buttonComponent;
    }
    else if (props.onButtonClick && props.buttonIcon) {
        button = _jsx(IconButton, { icon: props.buttonIcon, onClick: e => {
                e.stopPropagation();
                if (props.onButtonClick)
                    props.onButtonClick();
            }, borderRadius: props.borderRadius !== 'default' ? props.borderRadius : 'full', color: color, size: 'extra-small', emphasis: "none", borderWidth: '0' }, void 0);
    }
    return _jsx("div", Object.assign({ className: c, style: { ...s, ...props.style }, id: props.id, onClick: e => {
            if (props.onChipSelect) {
                e.stopPropagation();
                props.onChipSelect();
            }
        } }, { children: _jsxs("div", Object.assign({ className: `vieolo-chip__content` }, { children: [props.icon &&
                    props.icon,
                _jsx("p", Object.assign({ className: props.icon ? "margin-left--5" : "" }, { children: props.label }), void 0),
                ((props.onButtonClick && props.buttonIcon) || (props.buttonComponent)) &&
                    _jsx("span", { children: button }, void 0)] }), void 0) }), void 0);
}
