import React from 'react';
export default function InputSet(props: {
    label: string;
    ariaLabel?: string;
    placeholder?: string;
    tip?: string;
    error: boolean;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
    type?: 'text' | 'number' | 'password';
    autoFocus?: boolean;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    actionButton?: {
        description: string;
        icon: React.ReactNode;
        onClick: () => void;
    };
}): JSX.Element;
