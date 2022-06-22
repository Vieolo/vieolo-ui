import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Spinner from '../Spinner/spinner';
import { getEmphasisClasses } from '../utility/style_utility';
export default function IconButton(props) {
    let c = `vieolo-icon-button vieolo-icon-button--${props.size || 'medium'} vieolo-icon-button--border-radius-${props.borderRadius || 'default'}`;
    let e = props.emphasis || 'none';
    let col = props.color || 'primary';
    c += getEmphasisClasses(e, col, {
        hasRipple: true,
        hoverable: true,
        borderWidth: props.borderWidth
    });
    if (props.tooltip)
        c += " vieolo-tooltip";
    if (props.disabled)
        c += " disabled";
    if (props.className)
        c += " " + props.className;
    return _jsxs("button", Object.assign({ className: c, onClick: props.onClick, style: props.style || {}, type: props.type, "aria-label": props.ariaLabel }, { children: [props.isLoading ? _jsx(Spinner, { size: props.size, color: col, colorType: e === 'high' ? 'text' : 'normal' }, void 0) : props.icon,
            props.tooltip &&
                _jsx("div", Object.assign({ className: `tooltip-text-${props.tooltipPosition || 'up'}` }, { children: props.tooltip }), void 0)] }), void 0);
}