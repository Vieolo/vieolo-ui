// React
import React from 'react';


// Installed Packges
import { fileNameValidation } from '@vieolo/validation-js';


export default function FileInput(props: {
    icon?: React.ReactNode,
    onChange: (files: FileList) => void,
    onError: (error: string) => void,
    text?: string,
    multiple?: boolean,
    accept?: string,
    validateFileName?: boolean,
    /** 
     * This function (if provided) will change the name of the file prior checking for validation. 
     * This function is useful if the name of the file will change before being used or uploaded to the server
     */
    preValidationNameEditor?: (fileName: string) => string
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
                    let fileList = e.target.files as FileList;

                    for (let file of fileList as any as File[]) {
                        let fileName = props.preValidationNameEditor ? props.preValidationNameEditor(file.name) : file.name;
                        if (!fileNameValidation(fileName)) {
                            props.onError('File(s) have prohibited characters!');
                            allFilesValid = false;
                            return;
                        }        
                    }
                }
                
                if (allFilesValid) props.onChange(e.target.files as FileList);
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