import React from 'react';
export default function Input(props: {
    value: string;
    placeholder?: string;
    onChange: (v: string) => void;
    error: boolean;
    size?: 'small' | 'medium' | 'large' | 'full';
    type?: 'text' | 'number' | 'password';
    disabled?: boolean;
    ariaLabel?: string;
    autoFocus?: boolean;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}): JSX.Element;
