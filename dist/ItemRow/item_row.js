import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import IconButton from '../IconButton';
import Typography from '../Typography';
// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';
import { getEmphasisClasses } from '../utility/style_utility';
export default function ItemRow(props) {
    let color = (props.itemStyle || { color: undefined }).color || 'secondary';
    let borderRadius = ` vieolo-item-row--border-radius-${(props.itemStyle && props.itemStyle.borderRadius) ? props.itemStyle.borderRadius : 'default'}`;
    let contentClassName = `vieolo-item-row__item-content row-height--${(props.itemStyle || { height: undefined }).height || 'large'}`;
    contentClassName += borderRadius;
    if (props.onClick)
        contentClassName += " cursor--pointer";
    if (props.leadingIcon)
        contentClassName += " vieolo-item-row__item-with-icon";
    else
        contentClassName += " vieolo-item-row__item-without-icon";
    let e = props.selected ? "high" : (props.itemStyle || { emphasis: undefined }).emphasis || "low";
    contentClassName += getEmphasisClasses(e, color, {
        hasRipple: props.onClick !== undefined,
        hoverable: props.onClick !== undefined,
        removeTextColorClasses: true
    });
    let mainClassName = `vieolo-item-row elevation--${(props.itemStyle || { elevation: undefined }).elevation || '0'}`;
    mainClassName += borderRadius;
    if (props.disabled)
        mainClassName += ` disabled`;
    return _jsx("div", Object.assign({ className: mainClassName, "aria-label": props.ariaLabel || props.title }, { children: _jsxs("div", Object.assign({ className: contentClassName, onClick: () => {
                if (props.onClick)
                    props.onClick();
            } }, { children: [props.leadingIcon &&
                    _jsx("div", Object.assign({ className: "vieolo-item-row__leading-icon-div" }, { children: props.leadingIcon }), void 0),
                props.searchRow
                    ? _jsx("input", { value: props.searchRow.query, onChange: e => { var _a; return (_a = props.searchRow) === null || _a === void 0 ? void 0 : _a.onQueryChange(e.target.value); }, placeholder: props.title || "Search..." }, void 0)
                    : _jsxs("div", Object.assign({ className: "vieolo-item-row__title-col" }, { children: [_jsx(Typography, { text: props.title || '', fontWeight: 'bold', color: props.selected ? color : undefined, colorType: props.selected ? 'text' : undefined }, void 0),
                            props.subTitle &&
                                _jsx(Typography, { type: 'caption-large', text: props.subTitle, showTitle: true, color: props.selected ? color : undefined, colorType: props.selected ? 'text' : undefined }, void 0)] }), void 0),
                (props.buttonClick && props.buttonIcon)
                    ? _jsx("div", Object.assign({ className: `vieolo-item-row__button-col` }, { children: _jsx(IconButton, { icon: props.buttonIcon, onClick: props.buttonClick, color: props.buttonColor || 'primary', size: props.buttonSize || 'small' }, void 0) }), void 0)
                    : (props.searchRow && props.searchRow.query.trim()) &&
                        _jsx("div", Object.assign({ className: "vieolo-item-row__button-col" }, { children: _jsx(IconButton, { icon: _jsx(CloseIcon, {}, void 0), onClick: () => props.searchRow.onQueryChange(''), color: 'error', size: 'small' }, void 0) }), void 0)] }), void 0) }), void 0);
}
