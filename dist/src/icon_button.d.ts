import React from 'react';
export default function IconButton(props: {
    color?: 'primary' | 'secondary' | 'tertiary' | 'background' | 'alert' | 'error' | 'success' | 'accessory-orange' | 'accessory-blue' | 'accessory-green';
    className?: string;
    disabled?: boolean;
    size?: 'small' | 'medium';
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: React.ReactNode;
    tooltip?: string;
    tooltipPosition?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';
}): JSX.Element;
