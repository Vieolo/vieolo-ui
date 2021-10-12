import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Installed Packges
import { fileNameValidation } from '@vieolo/validation-js';
export default function FileInput(props) {
    return _jsxs("form", Object.assign({ className: "vieolo-file-input" }, { children: [_jsx("input", { type: "file", value: '', multiple: props.multiple || false, title: "", accept: props.accept, onChange: e => {
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
            _jsx("div", { children: props.icon
                    ? props.icon
                    : props.text || "Upload a file" }, void 0)] }), void 0);
}
