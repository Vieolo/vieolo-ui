import React from 'react';
export default function FileInput(props: {
    icon?: React.ReactNode;
    onChange: (files: FileList) => void;
    onError: (error: string) => void;
    text?: string;
    multiple?: boolean;
    accept?: string;
    validateFileName?: boolean;
}): JSX.Element;
