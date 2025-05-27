import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Flex from '../Flex';
import Card from '../Card';
import Typography from '../Typography';
export default function FormSection(props) {
    return _jsxs(Card, { borderRadius: props.borderRadius, color: props.color, emphasis: props.emphasis, elevation: props.elevation, className: `vieolo-form-section${props.disabled ? ' disabled' : ''}`, children: [_jsxs(Flex, { className: "vieolo-form-section__header-container", children: [_jsx(Typography, { text: props.title, fontWeight: 'bold' }), props.secondaryValue &&
                        _jsx(_Fragment, { children: typeof props.secondaryValue === 'string'
                                ? _jsx(Typography, { text: props.secondaryValue })
                                : props.secondaryValue })] }), _jsx(Flex, { className: "vieolo-form-section__content-container", children: props.children })] });
}
