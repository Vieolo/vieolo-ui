import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Spinner from '../Spinner/spinner';
import { getBorderRadiusClasses, getEmphasisClasses } from '../utility/style_utility';
export default function IconButton(props) {
    function getClassName(size) {
        let s = '';
        if (!size || size === 'xl') {
            s = props.size || 'medium';
        }
        else {
            let so = props[size];
            if (so) {
                s = so.size || '';
            }
            if (s.trim())
                s = `${s}--${size}`;
        }
        if (s.trim())
            return `vieolo-icon-button--${s} `;
        return '';
    }
    let xlClass = "vieolo-icon-button " + getClassName();
    let lgClass = props.lg ? getClassName('lg') : " ";
    let mdClass = props.md ? getClassName('md') : " ";
    let smClass = props.sm ? getClassName('sm') : " ";
    let c = xlClass + lgClass + mdClass + smClass;
    c += getBorderRadiusClasses('vieolo-icon-button', props.borderRadius || 'default');
    let e = props.emphasis || 'none';
    let col = props.color || 'primary';
    c += getEmphasisClasses(e, col, {
        hasRipple: props.onClick !== undefined,
        hoverable: true,
        borderWidth: props.borderWidth,
        transparentBackground: props.isTransparent
    });
    if (props.tooltip)
        c += " vieolo-tooltip";
    if (props.disabled)
        c += " disabled";
    if (props.className)
        c += " " + props.className;
    return _jsxs("button", { className: c, onClick: props.isLoading ? undefined : props.onClick, style: props.style || {}, type: props.type, "aria-label": props.ariaLabel, children: [props.isLoading ? _jsx(Spinner, { size: props.size, color: col, colorType: e === 'high' ? 'text' : 'normal' }) : props.icon, props.tooltip &&
                _jsx("div", { className: `tooltip-text-${props.tooltipPosition || 'up'}`, children: props.tooltip })] });
}
