import React from 'react';
import { BorderRadiusType, ColorOptionType } from '../types/types';
export default function Chip(props: {
    className?: string;
    /** When the chip itself is clicked */
    onChipSelect?: () => void;
    selected?: boolean;
    disabled?: boolean;
    /** This is an informative and non-functional icon which appear on the left side of the Chip */
    icon?: React.ReactNode;
    style?: React.CSSProperties;
    label: string;
    /** The icon for the default button of the Chip which appears on the right side of the Chip */
    buttonIcon?: any;
    /** The callback function for the default button of the Chip which appears on the right side of the Chip */
    onButtonClick?: () => void;
    /** The custom button component which will appear on the right side of the Chip and has a higher priority than the default button */
    color?: ColorOptionType;
    buttonComponent?: React.ReactNode;
    emphasis?: 'medium' | 'low' | 'low-normal';
    borderRadius?: BorderRadiusType;
    id?: string;
    size?: "medium" | 'small';
}): JSX.Element;
