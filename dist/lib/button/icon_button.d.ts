import React from 'react';
import { BorderRadiusType, ColorOptionType, EmphasisType } from '../private/types';
export default function IconButton(props: {
    color?: ColorOptionType;
    className?: string;
    disabled?: boolean;
    /** default: medium */
    size?: 'small' | 'medium';
    /** default: none */
    emphasis?: EmphasisType;
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon: React.ReactNode;
    tooltip?: string;
    tooltipPosition?: 'up' | 'down' | 'left' | 'right' | 'up-left' | 'up-right' | 'down-left' | 'down-right';
    borderRadius?: BorderRadiusType;
    style?: React.CSSProperties;
    /** default: 2 */
    borderWidth?: '0' | '1' | '2';
    type?: 'button' | 'submit' | 'reset';
}): JSX.Element;
