import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React
import { Fragment } from "react";
// Typography
import TypographyTitleSmall from "../typography/typography_title_small";
import Modal from "./modal";
import IconButton from "../button/icon_button";
import Button from '../button/button';
// Material UI
import CloseIcon from '@material-ui/icons/CloseRounded';
export default function FormDialog(props) {
    return _jsx(Modal, Object.assign({ onClose: props.onCancel }, { children: _jsxs("div", Object.assign({ className: "vieolo-form-dialog" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-form-dialog__header flex-row-space-between" }, { children: [_jsx(TypographyTitleSmall, { text: props.headerTitle }, void 0),
                        props.headerRightComponent === 'close' &&
                            _jsx(IconButton, { icon: _jsx(CloseIcon, {}, void 0), onClick: props.onCancel, color: 'primary', size: 'small' }, void 0),
                        (props.headerRightComponent && props.headerRightComponent !== 'close') &&
                            props.headerRightComponent] }), void 0),
                _jsx("div", Object.assign({ className: "vieolo-form-dialog__content", style: { width: props.width, padding: props.padding === undefined ? 10 : props.padding } }, { children: props.children }), void 0),
                (!props.removeCancelButton || !props.removeSaveButton || props.extraButtons || (props.extraButtons || []).length > 0) &&
                    _jsxs("div", Object.assign({ className: "vieolo-form-dialog__footer" }, { children: [_jsx("div", { className: "vieolo-form-dialog__footer__spacer--left" }, void 0),
                            !props.removeCancelButton &&
                                _jsxs(_Fragment, { children: [_jsx(Button, { onClick: props.onCancel, color: "error", text: props.cancelText || 'Cancel' }, void 0),
                                        _jsx("div", { className: "vieolo-form-dialog__footer__spacer--middle" }, void 0)] }, void 0),
                            (props.extraButtons || []).map((e, i) => {
                                return _jsxs(Fragment, { children: [_jsx(Button, { color: e.color, text: e.text, onClick: e.onClick }, `form_dialog_extra_button_button_${i}`),
                                        _jsx("div", { className: "vieolo-form-dialog__footer__spacer--middle" }, `form_dialog_extra_button_spacer_${i}`)] }, `form_dialog_extra_button_fragment_${i}`);
                            }),
                            !props.removeSaveButton &&
                                _jsx(Button, { onClick: props.onSave, color: "primary", text: props.saveText || 'Save', disabled: props.saveButtonDisabled }, void 0)] }), void 0)] }), void 0) }), void 0);
}
