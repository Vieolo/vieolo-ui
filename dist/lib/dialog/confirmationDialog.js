import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from "./modal";
import Button from '../button/button';
import { TypographyParagraphLarge } from "../typography";
export default function FormDialog(props) {
    let dialog = _jsxs("div", Object.assign({ className: "vieolo-confirmation-dialog" }, { children: [_jsx("div", Object.assign({ className: "vieolo-form-dialog__message", style: { width: props.width, padding: props.padding === undefined ? 10 : props.padding } }, { children: typeof props.message === 'string'
                    ? _jsx(TypographyParagraphLarge, { text: props.message }, void 0)
                    : _jsx(_Fragment, { children: props.message }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "vieolo-confirmation-dialog__footer" }, { children: [_jsx("div", { className: "vieolo-confirmation-dialog__footer__spacer--left" }, void 0),
                    !props.removeRejectButton &&
                        _jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => {
                                        if (props.onReject)
                                            props.onReject();
                                    }, color: (props.rejectButtonConfig && props.rejectButtonConfig.color) ? props.rejectButtonConfig.color : "error", text: (props.rejectButtonConfig && props.rejectButtonConfig.text) ? props.rejectButtonConfig.text : "Cancel", borderRadius: (props.rejectButtonConfig && props.rejectButtonConfig.borderRadius) ? props.rejectButtonConfig.borderRadius : undefined, emphasis: (props.rejectButtonConfig && props.rejectButtonConfig.emphasis) ? props.rejectButtonConfig.emphasis : "none" }, void 0),
                                _jsx("div", { className: "vieolo-form-dialog__footer__spacer--middle" }, void 0)] }, void 0),
                    _jsx(Button, { onClick: props.onAccept, color: (props.acceptButtonConfig && props.acceptButtonConfig.color) ? props.acceptButtonConfig.color : "primary", text: (props.acceptButtonConfig && props.acceptButtonConfig.text) ? props.acceptButtonConfig.text : "Ok", borderRadius: (props.acceptButtonConfig && props.acceptButtonConfig.borderRadius) ? props.acceptButtonConfig.borderRadius : undefined, emphasis: (props.acceptButtonConfig && props.acceptButtonConfig.emphasis) ? props.acceptButtonConfig.emphasis : undefined }, void 0)] }), void 0)] }), void 0);
    if (props.inline)
        return dialog;
    return _jsx(Modal, Object.assign({ onClose: () => {
            if (props.onReject)
                props.onReject();
        } }, { children: dialog }), void 0);
}
