import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Global
import BackButton from '../BackButton/back_button';
export default function BackButtonRow(props) {
    let actions = props.actions || [];
    return _jsxs("div", Object.assign({ className: `vieolo-back-button-row${props.centerLarge ? ' vieolo-back-button-row-center-large' : ''}` }, { children: [_jsx("div", Object.assign({ className: "back-button-container" }, { children: !props.removeBackButton &&
                    _jsx(BackButton, { backButtonText: props.backButtonText, icon: props.icon, onClick: props.onBack }, void 0) }), void 0),
            _jsx("div", Object.assign({ className: "center-component" }, { children: props.center && props.center }), void 0),
            _jsx("div", Object.assign({ className: "other-button-container" }, { children: actions }), void 0)] }), void 0);
}
