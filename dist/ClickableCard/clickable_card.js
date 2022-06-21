import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Vieolo UI
import Typography from "../Typography";
import Card from "../Card";
import Flex from "../Flex";
import Spacer from "../Spacer";
export default function ClickableCard(props) {
    return _jsxs(Card, Object.assign({ ariaLabel: props.ariaLabel, borderRadius: props.borderRadius, className: `vieolo-clickable-card ${props.className || ''}`, color: props.color, elevation: props.elevation, emphasis: props.emphasis, height: props.height, onClick: props.onClick, padding: props.padding, style: props.style, width: props.width, keepEmphasisTextColorClasses: props.keepEmphasisTextColorClasses }, { children: [_jsxs(Flex, Object.assign({ justifyContent: "space-between", alignItems: "center" }, { children: [_jsxs(Flex, Object.assign({ columnGap: "one", alignItems: "center" }, { children: [props.icon &&
                                props.icon,
                            _jsx(Typography, { type: "paragraph-medium", text: props.title, fontWeight: 'bold', fontFamily: "secondary", color: props.emphasis === 'high' ? props.color || 'primary' : undefined, colorType: props.emphasis === 'high' ? 'text' : undefined }, void 0)] }), void 0),
                    _jsx(Flex, Object.assign({ direction: "row-reverse", alignItems: "center", columnGap: "half" }, { children: props.rightItems &&
                            props.rightItems }), void 0)] }), void 0),
            props.description &&
                _jsxs(_Fragment, { children: [_jsx(Spacer, { height: "one" }, void 0),
                        typeof props.description === 'string'
                            ? _jsx(Typography, { type: "paragraph-small", text: props.description, color: props.emphasis === 'high' ? props.color || 'primary' : undefined, colorType: props.emphasis === 'high' ? 'text' : undefined }, void 0)
                            : _jsx(Typography, { type: props.description.typographyType || 'paragraph-small', text: props.description.text, textAlign: props.description.textAlign, color: props.emphasis === 'high' ? props.color || 'primary' : undefined, colorType: props.emphasis === 'high' ? 'text' : undefined }, void 0)] }, void 0)] }), void 0);
}
