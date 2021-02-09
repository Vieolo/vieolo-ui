// React
import React from 'react';


// Installed Packges
import { fileValidation } from '@vieolo/validation';


export default function FileInput(props: {
    icon?: React.ReactNode,
    onChange: (files: FileList) => void,
    onError: (error: string) => void,
    text?: string,
    multiple?: boolean,
    accept?: string
}) {
    
    return <form className="vieolo-file-input">
        <input
            type="file"
            value={''}
            multiple={props.multiple || false}
            title={""}
            accept={props.accept}
            onChange={e => {
                if (!fileValidation({ file: e.target.files[0] }).isValid) {
                    props.onError('File(s) have prohibited characters!');
                } else props.onChange(e.target.files);
            }}
        />
        <div>
            {
                props.icon
                    ? props.icon
                    : props.text || "Upload a file"
            }
        </div>
    </form>
}