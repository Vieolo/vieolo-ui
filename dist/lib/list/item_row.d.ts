import React from 'react';
export default function ItemRow(props: {
    title: string;
    subTitle?: string;
    onClick?: () => void;
    selected?: boolean;
    leadingIcon?: React.ReactNode;
    buttonIcon?: React.ReactNode;
    buttonClick?: () => void;
    buttonSize?: 'small' | 'medium';
    buttonColor?: 'primary' | 'secondary' | 'tertiary' | 'background' | 'alert' | 'error' | 'success' | 'accessory-orange' | 'accessory-blue' | 'accessory-green';
    cardStyle?: 'card-light-shadow' | 'card-dark-shadow' | 'card-no-shadow';
}): JSX.Element;
