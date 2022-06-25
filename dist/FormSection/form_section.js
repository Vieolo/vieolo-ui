import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Flex from '../Flex';
import Card from '../Card';
import Typography from '../Typography';
export default function FormSection(props) {
    return _jsxs(Card, Object.assign({ className: `vieolo-form-section${props.disabled ? ' disabled' : ''}` }, { children: [_jsxs(Flex, Object.assign({ className: "vieolo-form-section__header-container" }, { children: [_jsx(Typography, { text: props.title, fontWeight: 'bold' }, void 0),
                    props.secondaryValue &&
                        _jsx(Typography, { text: props.secondaryValue }, void 0)] }), void 0),
            _jsx(Flex, Object.assign({ className: "vieolo-form-section__content-container" }, { children: props.children }), void 0)] }), void 0);
}
