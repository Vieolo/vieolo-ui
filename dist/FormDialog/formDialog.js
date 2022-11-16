import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React
import { Fragment } from "react";
import Typography from "../Typography";
import Modal from "../Modal/modal";
import IconButton from "../IconButton";
import Button from '../Button/button';
// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';
export default function FormDialog(props) {
    let dialog = _jsxs("div", { className: "vieolo-form-dialog", "aria-label": props.ariaLabel, children: [_jsxs("div", { className: "vieolo-form-dialog__header flex-row-space-between", children: [_jsx(Typography, { type: "title-small", text: props.headerTitle }), props.headerRightComponent === 'close' &&
                        _jsx(IconButton, { icon: _jsx(CloseIcon, {}), onClick: () => {
                                if (!props.isLoading)
                                    props.onCancel();
                            }, color: 'primary', size: 'small', "aria-label": props.ariaLabel ? `${props.ariaLabel} close button` : undefined }), (props.headerRightComponent && props.headerRightComponent !== 'close') &&
                        props.headerRightComponent] }), _jsx("div", { className: `vieolo-form-dialog__content ${props.className || ''}`, style: { width: props.width, padding: props.padding === undefined ? 10 : props.padding }, children: props.children }), (!props.removeCancelButton || !props.removeSaveButton || props.extraButtons || (props.extraButtons || []).length > 0) &&
                _jsxs("div", { className: "vieolo-form-dialog__footer", children: [_jsx("div", { className: "vieolo-form-dialog__footer__spacer--left" }), !props.removeCancelButton &&
                            _jsxs(_Fragment, { children: [_jsx(Button, { onClick: props.onCancel, color: (props.cancelButtonConfig && props.cancelButtonConfig.color) ? props.cancelButtonConfig.color : "error", text: (props.cancelButtonConfig && props.cancelButtonConfig.text) ? props.cancelButtonConfig.text : "Cancel", borderRadius: (props.cancelButtonConfig && props.cancelButtonConfig.borderRadius) ? props.cancelButtonConfig.borderRadius : undefined, emphasis: (props.cancelButtonConfig && props.cancelButtonConfig.emphasis) ? props.cancelButtonConfig.emphasis : "none", ariaLabel: getButtonAriaLabel(props.headerTitle, "cancel button", props.ariaLabel, props.cancelButtonConfig), disabled: props.isLoading }), _jsx("div", { className: "vieolo-form-dialog__footer__spacer--middle" })] }), (props.extraButtons || []).map((e, i) => {
                            return _jsxs(Fragment, { children: [_jsx(Button, { color: e.color, text: e.text, onClick: e.onClick, ariaLabel: getButtonAriaLabel(props.headerTitle, e.text, props.ariaLabel, e), disabled: props.isLoading }, `form_dialog_extra_button_button_${i}`), _jsx("div", { className: "vieolo-form-dialog__footer__spacer--middle" }, `form_dialog_extra_button_spacer_${i}`)] }, `form_dialog_extra_button_fragment_${i}`);
                        }), !props.removeSaveButton &&
                            _jsx(Button, { onClick: props.onSave, color: (props.saveButtonConfig && props.saveButtonConfig.color) ? props.saveButtonConfig.color : "primary", text: (props.saveButtonConfig && props.saveButtonConfig.text) ? props.saveButtonConfig.text : "Save", borderRadius: (props.saveButtonConfig && props.saveButtonConfig.borderRadius) ? props.saveButtonConfig.borderRadius : undefined, emphasis: (props.saveButtonConfig && props.saveButtonConfig.emphasis) ? props.saveButtonConfig.emphasis : undefined, ariaLabel: getButtonAriaLabel(props.headerTitle, "save button", props.ariaLabel, props.saveButtonConfig), disabled: props.saveButtonDisabled || props.isLoading, isLoading: props.isLoading })] })] });
    if (props.inline)
        return dialog;
    return _jsx(Modal, { onClose: () => {
            if (!props.isLoading)
                props.onCancel();
        }, children: dialog });
}
function getButtonAriaLabel(headerTitle, buttonType, dialogAL, buttonConfig) {
    if (buttonConfig && buttonConfig.ariaLabel)
        return buttonConfig.ariaLabel;
    if (dialogAL)
        return `${dialogAL} ${buttonType}`;
    return `${headerTitle} ${buttonType}`;
}
