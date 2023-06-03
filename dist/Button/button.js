import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Components
import DropDownMenu from '../DropDownMenu/dropdown_menu';
import Spinner from '../Spinner/spinner';
import { getEmphasisClasses } from '../utility/style_utility';
export default function Button(props) {
    let s = {};
    let h = props.height || 'medium';
    let w = props.width || 'content';
    let c = `vieolo-button vieolo-button--${h} vieolo-button--${w}-width vieolo-button--border-radius-${props.borderRadius || 'default'}`;
    let e = props.emphasis || 'high';
    if (props.toLowerCase) {
        s['textTransform'] = 'initial';
    }
    if (props.fontSize) {
        s['fontSize'] = `${props.fontSize}px`;
    }
    if (props.auxiliary) {
        s.borderTopRightRadius = 0;
        s.borderBottomRightRadius = 0;
        s.marginRight = 2;
    }
    c += getEmphasisClasses(e, props.color || 'primary', {
        hasRipple: true,
        hoverable: true,
        transparentBackground: props.isTransparent
    });
    if (props.disabled)
        c += " disabled";
    if (props.className)
        c += " " + props.className;
    let button = _jsxs("button", { className: c, onClick: (props.isLoading || props.disabled) ? undefined : props.onClick, style: s, "aria-label": props.ariaLabel, children: [props.isLoading
                ? _jsx(Spinner, { size: props.height, color: props.color || 'primary', colorType: e === 'high' ? 'text' : 'normal' })
                : _jsx(_Fragment, { children: props.startIcon &&
                        _jsx("span", { className: "start-icon", children: props.startIcon }) }), props.text, props.endIcon &&
                _jsx("span", { className: 'end-icon', children: props.endIcon })] });
    if (props.auxiliary) {
        let aux = _jsx("button", { "aria-label": props.auxiliary.ariaLabel, className: c, type: props.type, style: {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                width: 40,
                minWidth: 10,
            }, onClick: () => {
                if (!props.auxiliary.dropDownMenuItems || props.auxiliary.dropDownMenuItems.length === 0)
                    props.auxiliary.onClick();
            }, children: props.auxiliary.isLoading ? _jsx(Spinner, { size: props.height, color: props.color || 'primary', colorType: e === 'high' ? 'text' : 'normal' }) : props.auxiliary.icon });
        return _jsxs("div", { className: "flex", children: [button, (props.auxiliary.dropDownMenuItems && props.auxiliary.dropDownMenuItems.length > 0)
                    ? _jsx(DropDownMenu, { buttonComponent: aux, items: props.auxiliary.dropDownMenuItems, onItemSelect: v => props.auxiliary.onClick(v) })
                    : aux] });
    }
    return button;
}
