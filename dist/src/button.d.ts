import React from 'react';
export default function Button(props: {
    text: string;
    onClick?: () => void;
    disabled?: boolean;
    color: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'alert' | 'accessoryBlue' | 'accessoryOrange' | 'accessoryGreen';
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    fullWidth?: boolean;
    size?: 'large' | 'medium' | 'small';
    className?: string;
    toLowerCase?: boolean;
    fontSize?: number;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'text' | 'outlined' | 'contained';
}): JSX.Element;
