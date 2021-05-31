// React
import React from 'react';


// Installed Packges
import { fileValidation } from '@vieolo/validation-js';


export default function FileInput(props: {
    icon?: React.ReactNode,
    onChange: (files: FileList) => void,
    onError: (error: string) => void,
    text?: string,
    multiple?: boolean,
    accept?: string,
    validateFileName?: boolean
}) {
    
    return <form className="vieolo-file-input">
        <input
            type="file"
            value={''}
            multiple={props.multiple || false}
            title={""}
            accept={props.accept}
            onChange={e => {
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
                
                if (allFilesValid) props.onChange(e.target.files);
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