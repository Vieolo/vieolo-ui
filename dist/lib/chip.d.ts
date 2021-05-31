import React from 'react';
export default function Chip(props: {
    className?: string;
    onChipSelect?: () => void;
    selected?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    label: string;
    buttonIcon?: any;
    buttonComponent?: React.ReactNode;
    onButtonClick?: () => void;
    id?: string;
}): JSX.Element;
