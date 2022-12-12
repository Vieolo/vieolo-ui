// React
import React from 'react';

// Vieolo UI
import Button from '../Button/button';
import Typography from '../Typography';

// Installed Packges
import { fileNameValidation } from '@vieolo/validation-js';

// Types
import { ColorOptionType, EmphasisType } from '../types/types';


export default function FileInput(props: {
    icon?: React.ReactNode,
    onChange: (files: FileList) => void,
    onError: (error: string) => void,
    text?: string,
    multiple?: boolean,
    accept?: string,
    validateFileName?: boolean,
    style?: React.CSSProperties,
    /** 
     * This function (if provided) will change the name of the file prior checking for validation. 
     * This function is useful if the name of the file will change before being used or uploaded to the server
     */
    preValidationNameEditor?: (fileName: string) => string,
    /**
     * Passing the configs, will display a button indicating the user that browsing is possible
     */
    browseButtonConfig?: {
        text: string,
        color: ColorOptionType,
        emphasis: EmphasisType
    }
}) {

    return <form className="vieolo-file-input" style={props.style}>
        <input
            type="file"
            value={''}
            multiple={props.multiple || false}
            title={""}
            accept={props.accept}
            onChange={e => {
                if (props.accept) {
                    for (const file of (e.target.files as FileList)) {
                        if (!props.accept.includes(file.type)) {
                            return;
                        }
                    }
                }                

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
        <div className='center-by-flex-column width--pc-100 height--pc-100'>
            {
                props.icon &&
                <div>
                    {props.icon}
                </div>
            }
            {
                props.text &&
                <Typography text={props.text} />
            }

            {
                (props.text && props.browseButtonConfig) &&
                <div className="padding--one">
                    <Typography type='paragraph-small' text={'or'} />
                </div>
            }

            {
                props.browseButtonConfig &&
                <Button
                    color={props.browseButtonConfig.color}
                    text={props.browseButtonConfig.text}
                    emphasis={props.browseButtonConfig.emphasis}
                    fontSize={12}
                    height='small'
                    type='button'
                    onClick={e => {
                        e.preventDefault();
                        (e.currentTarget.parentElement?.previousElementSibling! as HTMLInputElement).click();
                    }}
                />
            }
        </div>
    </form>
}