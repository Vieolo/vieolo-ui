import React from 'react';
import { FontWeightType, ColorOptionType } from '../private/types';
export default function TypographyCaptionLarge(props: {
    text: string;
    className?: string;
    showTitle?: boolean;
    dataTestID?: string;
    ariaLabel?: string;
    color?: ColorOptionType;
    margin?: "0" | "5" | "10" | "20" | "half" | "one" | "two";
    colorType?: 'normal' | 'text' | 'light';
    fontWeight?: FontWeightType;
    style?: React.CSSProperties;
}): JSX.Element;
