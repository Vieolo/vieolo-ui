import React from 'react';
import { ColorOptionType, FontWeightType } from '../private/types';
export default function TypographyTitleLarge(props: {
    text: string;
    className?: string;
    showTitle?: boolean;
    dataTestID?: string;
    ariaLabel?: string;
    color?: ColorOptionType;
    margin?: "0" | "5" | "10" | "20" | "half" | "one" | "two";
    fontWeight?: FontWeightType;
    style?: React.CSSProperties;
    colorType?: 'normal' | 'text' | 'light';
}): JSX.Element;
