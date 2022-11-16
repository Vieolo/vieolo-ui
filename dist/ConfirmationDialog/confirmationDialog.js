import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import Modal from "../Modal";
import Button from '../Button';
import Typography from "../Typography";
export default function ConfirmationDialog(props) {
    let dialog = _jsxs("div", { className: "vieolo-confirmation-dialog", "aria-label": "Confirmation Dialog", children: [_jsx("div", { className: "vieolo-form-dialog__message", style: { width: props.width, padding: props.padding === undefined ? 10 : props.padding }, children: typeof props.message === 'string'
                    ? _jsx(Typography, { type: "paragraph-large", text: props.message })
                    : _jsx(_Fragment, { children: props.message }) }), _jsxs("div", { className: "vieolo-confirmation-dialog__footer", children: [_jsx("div", { className: "vieolo-confirmation-dialog__footer__spacer--left" }), !props.removeRejectButton &&
                        _jsxs(_Fragment, { children: [_jsx(Button, { onClick: () => {
                                        if (props.onReject)
                                            props.onReject();
                                    }, color: (props.rejectButtonConfig && props.rejectButtonConfig.color) ? props.rejectButtonConfig.color : "error", text: (props.rejectButtonConfig && props.rejectButtonConfig.text) ? props.rejectButtonConfig.text : "Cancel", borderRadius: (props.rejectButtonConfig && props.rejectButtonConfig.borderRadius) ? props.rejectButtonConfig.borderRadius : undefined, emphasis: (props.rejectButtonConfig && props.rejectButtonConfig.emphasis) ? props.rejectButtonConfig.emphasis : "none", ariaLabel: props.rejectButtonConfig ? props.rejectButtonConfig.ariaLabel : undefined }), _jsx("div", { className: "vieolo-form-dialog__footer__spacer--middle" })] }), _jsx(Button, { onClick: props.onAccept, color: (props.acceptButtonConfig && props.acceptButtonConfig.color) ? props.acceptButtonConfig.color : "primary", text: (props.acceptButtonConfig && props.acceptButtonConfig.text) ? props.acceptButtonConfig.text : "Ok", borderRadius: (props.acceptButtonConfig && props.acceptButtonConfig.borderRadius) ? props.acceptButtonConfig.borderRadius : undefined, emphasis: (props.acceptButtonConfig && props.acceptButtonConfig.emphasis) ? props.acceptButtonConfig.emphasis : undefined, ariaLabel: props.acceptButtonConfig ? props.acceptButtonConfig.ariaLabel : undefined })] })] });
    if (props.inline)
        return dialog;
    return _jsx(Modal, { onClose: () => {
            if (props.onReject)
                props.onReject();
        }, children: dialog });
}
