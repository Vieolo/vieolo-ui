import React from 'react';
import { ColorOptionType, EmphasisType } from '../types/types';
export default function FileInput(props: {
    icon?: React.ReactNode;
    onChange: (files: FileList) => void;
    onError: (error: string) => void;
    text?: string;
    multiple?: boolean;
    accept?: string;
    validateFileName?: boolean;
    /**
     * This function (if provided) will change the name of the file prior checking for validation.
     * This function is useful if the name of the file will change before being used or uploaded to the server
     */
    preValidationNameEditor?: (fileName: string) => string;
    /**
     * Passing the configs, will display a button indicating the user that browsing is possible
     */
    browseButtonConfig?: {
        text: string;
        color: ColorOptionType;
        emphasis: EmphasisType;
    };
}): JSX.Element;
