import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useEffect, useState } from "react";
import Typography from "../Typography";
import Modal from "../Modal/modal";
import IconButton from "../IconButton";
import Button from '../Button/button';
import Flex from "../Flex";
//Installed Packages
import Device from '@vieolo/device-js';
// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';
export default function FormDialog(props) {
    let [virtKeyboardOffset, setVirtKeyboardOffset] = useState(0);
    useEffect(() => {
        const handleVirtualKeyboard = (event) => {
            const viewport = window.visualViewport;
            let value = viewport.offsetTop ? viewport.offsetTop : window.innerHeight - viewport.height;
            setVirtKeyboardOffset(value);
            if (value && Device.isAnAppleDevice())
                window.scrollBy({ top: -viewport.offsetTop });
        };
        if (Device.isTouchOnlyDevice && window.visualViewport) {
            window.visualViewport.addEventListener("resize", handleVirtualKeyboard);
            // window.visualViewport.addEventListener("scroll", handleVirtualKeyboard);
        }
        return () => {
            if (Device.isTouchOnlyDevice && window.visualViewport) {
                window.visualViewport.removeEventListener("resize", handleVirtualKeyboard);
                // window.visualViewport.removeEventListener("scroll", handleVirtualKeyboard);
            }
        };
    }, []);
    let dClass = "vieolo-form-dialog";
    let footerButtonSize = "medium";
    if (!props.inline && virtKeyboardOffset > 0) {
        dClass += " vieolo-form-dialog--keyboard-open";
        footerButtonSize = "small";
    }
    let dialog = _jsxs("div", { className: dClass, "aria-label": props.ariaLabel, children: [_jsxs("div", { className: "vieolo-form-dialog__header flex-row-space-between", children: [_jsx(Typography, { type: "title-small", text: props.headerTitle }), props.headerRightComponent === 'close' &&
                        _jsx(IconButton, { icon: _jsx(CloseIcon, {}), onClick: () => {
                                if (!props.isLoading)
                                    props.onCancel();
                            }, color: 'primary', size: 'small', "aria-label": props.ariaLabel ? `${props.ariaLabel} close button` : undefined }), (props.headerRightComponent && props.headerRightComponent !== 'close') &&
                        props.headerRightComponent] }), _jsx("div", { className: `vieolo-form-dialog__content ${props.className || ''}`, style: { width: props.width, padding: props.padding === undefined ? 10 : props.padding }, children: props.children }), (!props.removeCancelButton || !props.removeSaveButton || props.extraButtons || (props.extraButtons || []).length > 0) &&
                _jsxs("div", { className: "vieolo-form-dialog__footer", children: [_jsxs(Flex, { justifyContent: "start", alignItems: "center", columnGap: "one", children: [!props.removeCancelButton &&
                                    _jsx(Button, { height: footerButtonSize, onClick: props.onCancel, color: (props.cancelButtonConfig && props.cancelButtonConfig.color) ? props.cancelButtonConfig.color : "error", text: (props.cancelButtonConfig && props.cancelButtonConfig.text) ? props.cancelButtonConfig.text : "Cancel", borderRadius: (props.cancelButtonConfig && props.cancelButtonConfig.borderRadius) ? props.cancelButtonConfig.borderRadius : undefined, emphasis: (props.cancelButtonConfig && props.cancelButtonConfig.emphasis) ? props.cancelButtonConfig.emphasis : "none", ariaLabel: getButtonAriaLabel(props.headerTitle, "cancel button", props.ariaLabel, props.cancelButtonConfig), disabled: props.isLoading, startIcon: (props.cancelButtonConfig || {}).startIcon }), (props.extraButtonsLeft || []).map((e, i) => {
                                    return _jsx(Button, { color: e.color, text: e.text, onClick: e.onClick, ariaLabel: getButtonAriaLabel(props.headerTitle, e.text, props.ariaLabel, e), disabled: props.isLoading, height: footerButtonSize, emphasis: e.emphasis, borderRadius: e.borderRadius, startIcon: e.startIcon }, `form_dialog_extra_button_button_${i}`);
                                })] }), _jsxs(Flex, { alignItems: "center", justifyContent: "end", children: [(props.extraButtons || []).map((e, i) => {
                                    return _jsx(Button, { color: e.color, text: e.text, onClick: e.onClick, ariaLabel: getButtonAriaLabel(props.headerTitle, e.text, props.ariaLabel, e), disabled: props.isLoading, height: footerButtonSize, emphasis: e.emphasis, borderRadius: e.borderRadius, startIcon: e.startIcon }, `form_dialog_extra_button_button_${i}`);
                                }), !props.removeSaveButton &&
                                    _jsx(Button, { onClick: props.onSave, color: (props.saveButtonConfig && props.saveButtonConfig.color) ? props.saveButtonConfig.color : "primary", text: (props.saveButtonConfig && props.saveButtonConfig.text) ? props.saveButtonConfig.text : "Save", borderRadius: (props.saveButtonConfig && props.saveButtonConfig.borderRadius) ? props.saveButtonConfig.borderRadius : undefined, emphasis: (props.saveButtonConfig && props.saveButtonConfig.emphasis) ? props.saveButtonConfig.emphasis : undefined, ariaLabel: getButtonAriaLabel(props.headerTitle, "save button", props.ariaLabel, props.saveButtonConfig), disabled: props.saveButtonDisabled || props.isLoading, isLoading: props.isLoading, height: footerButtonSize, startIcon: (props.saveButtonConfig || {}).startIcon })] })] })] });
    if (props.inline)
        return dialog;
    return _jsx(Modal, { onClose: () => {
            if (!props.isLoading)
                props.onCancel();
        }, position: virtKeyboardOffset > 0 ? 'top' : 'center', children: dialog });
}
function getButtonAriaLabel(headerTitle, buttonType, dialogAL, buttonConfig) {
    if (buttonConfig && buttonConfig.ariaLabel)
        return buttonConfig.ariaLabel;
    if (dialogAL)
        return `${dialogAL} ${buttonType}`;
    return `${headerTitle} ${buttonType}`;
}
