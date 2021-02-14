// React
import React from 'react';
// Installed Packges
import { fileValidation } from '@vieolo/validation';
export default function FileInput(props) {
    return React.createElement("form", { className: "vieolo-file-input" },
        React.createElement("input", { type: "file", value: '', multiple: props.multiple || false, title: "", accept: props.accept, onChange: e => {
                let allFilesValid = true;
                if (props.validateFileName) {
                    let fileList = e.target.files;
                    for (let file of fileList) {
                        if (!fileValidation({ file: file }).isValid) {
                            props.onError('File(s) have prohibited characters!');
                            allFilesValid = false;
                            return;
                        }
                    }
                }
                if (allFilesValid)
                    props.onChange(e.target.files);
            } }),
        React.createElement("div", null, props.icon
            ? props.icon
            : props.text || "Upload a file"));
}
