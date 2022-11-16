import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Global
import BackButton from '../BackButton/back_button';
export default function BackButtonRow(props) {
    let actions = props.actions || [];
    return _jsxs("div", { className: `vieolo-back-button-row${props.centerLarge ? ' vieolo-back-button-row-center-large' : ''}`, children: [_jsx("div", { className: "back-button-container", children: !props.removeBackButton &&
                    _jsx(BackButton, { backButtonText: props.backButtonText, icon: props.icon, onClick: props.onBack }) }), _jsx("div", { className: "center-component", children: props.center && props.center }), _jsx("div", { className: "other-button-container", children: actions })] });
}
