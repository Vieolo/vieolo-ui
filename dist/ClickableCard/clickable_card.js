import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Vieolo UI
import Typography from "../Typography";
import Card from "../Card";
import Flex from "../Flex";
import Spacer from "../Spacer";
export default function ClickableCard(props) {
    let textColor = undefined;
    let textColorType = undefined;
    if (props.keepEmphasisTextColorClasses) {
        textColor = props.emphasis === 'high' ? props.color || 'primary' : props.color;
        textColorType = props.emphasis === 'high'
            ? 'text'
            : props.emphasis === 'medium'
                ? 'text-light'
                : 'normal';
    }
    return _jsxs(Card, { ariaLabel: props.ariaLabel, borderRadius: props.borderRadius, className: `vieolo-clickable-card ${props.className || ''}`, color: props.color, elevation: props.elevation, emphasis: props.emphasis, height: props.height, onClick: props.onClick, padding: props.padding, style: props.style, width: props.width, keepEmphasisTextColorClasses: props.keepEmphasisTextColorClasses, children: [_jsxs(Flex, { justifyContent: "space-between", alignItems: "center", children: [_jsxs(Flex, { columnGap: "one", alignItems: "center", children: [props.icon &&
                                props.icon, _jsx(Typography, { type: "paragraph-medium", text: props.title, fontWeight: 'bold', fontFamily: "secondary", color: textColor, colorType: textColorType })] }), _jsx(Flex, { direction: "row-reverse", alignItems: "center", columnGap: "half", children: props.rightItems &&
                            props.rightItems })] }), props.description &&
                _jsxs(_Fragment, { children: [_jsx(Spacer, { height: "one" }), typeof props.description === 'string'
                            ? _jsx(Typography, { type: "paragraph-small", text: props.description, color: textColor, colorType: textColorType })
                            : _jsx(Typography, { type: props.description.typographyType || 'paragraph-small', text: props.description.text, textAlign: props.description.textAlign, color: textColor, colorType: textColorType })] })] });
}
