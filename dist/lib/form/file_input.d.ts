import React from 'react';
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
}): JSX.Element;
