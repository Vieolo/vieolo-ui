import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Button from '../Button/button';
import Typography from '../Typography';
// Installed Packges
import { fileNameValidation } from '@vieolo/validation-js';
export default function FileInput(props) {
    return _jsxs("form", Object.assign({ className: "vieolo-file-input" }, { children: [_jsx("input", { type: "file", value: '', multiple: props.multiple || false, title: "", accept: props.accept, onChange: e => {
                    if (props.accept) {
                        for (const file of e.target.files) {
                            if (!props.accept.includes(file.type)) {
                                return;
                            }
                        }
                    }
                    let allFilesValid = true;
                    if (props.validateFileName) {
                        let fileList = e.target.files;
                        for (let file of fileList) {
                            let fileName = props.preValidationNameEditor ? props.preValidationNameEditor(file.name) : file.name;
                            if (!fileNameValidation(fileName)) {
                                props.onError('File(s) have prohibited characters!');
                                allFilesValid = false;
                                return;
                            }
                        }
                    }
                    if (allFilesValid)
                        props.onChange(e.target.files);
                } }, void 0),
            _jsxs("div", Object.assign({ className: 'center-by-flex-column width--pc-100 height--pc-100' }, { children: [props.icon &&
                        _jsx("div", { children: props.icon }, void 0),
                    props.text &&
                        _jsx(Typography, { text: props.text }, void 0),
                    (props.text && props.browseButtonConfig) &&
                        _jsx("div", Object.assign({ className: "padding--one" }, { children: _jsx(Typography, { type: 'paragraph-small', text: 'or' }, void 0) }), void 0),
                    props.browseButtonConfig &&
                        _jsx(Button, { color: props.browseButtonConfig.color, text: props.browseButtonConfig.text, emphasis: props.browseButtonConfig.emphasis, fontSize: 12, height: 'small', type: 'button', onClick: e => {
                                var _a;
                                e.preventDefault();
                                ((_a = e.currentTarget.parentElement) === null || _a === void 0 ? void 0 : _a.previousElementSibling).click();
                            } }, void 0)] }), void 0)] }), void 0);
}
