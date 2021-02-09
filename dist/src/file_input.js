// React
import React from 'react';
// Installed Packges
import { fileValidation } from '@vieolo/validation';
export default function FileInput(props) {
    return React.createElement("form", { className: "vieolo-file-input" },
        React.createElement("input", { type: "file", value: '', multiple: props.multiple || false, title: "", accept: props.accept, onChange: e => {
                if (!fileValidation({ file: e.target.files[0] }).isValid) {
                    props.onError('File(s) have prohibited characters!');
                }
                else
                    props.onChange(e.target.files);
            } }),
        React.createElement("div", null, props.icon
            ? props.icon
            : props.text || "Upload a file"));
}
