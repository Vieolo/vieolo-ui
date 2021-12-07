import React from 'react';
import { ColorOptionType } from '../private/types';
export default function ItemRow(props: {
    title: string;
    subTitle?: string;
    onClick?: () => void;
    selected?: boolean;
    leadingIcon?: React.ReactNode;
    buttonIcon?: React.ReactNode;
    buttonClick?: () => void;
    buttonSize?: 'small' | 'medium';
    buttonColor?: ColorOptionType;
    cardStyle?: 'card-light-shadow' | 'card-dark-shadow' | 'card-no-shadow';
    disabled?: boolean;
}): JSX.Element;
