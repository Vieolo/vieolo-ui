import React from 'react';
export default function InputSet(props: {
    label: string;
    placeholder?: string;
    tip?: string;
    error: boolean;
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
    type?: 'text' | 'number' | 'password';
    actionButton?: {
        description: string;
        icon: React.ReactNode;
        onClick: () => void;
    };
}): JSX.Element;
