import React from 'react';
import { ColorOptionType, FontWeightType } from '../private/types';
export default function TypographyBase(props: {
    className: string;
    text: string;
    showTitle?: boolean;
    dataTestID?: string;
    ariaLabel?: string;
    color?: ColorOptionType;
    margin?: "0" | "5" | "10" | "20" | "half" | "one" | "two";
    fontWeight?: FontWeightType;
    style?: React.CSSProperties;
}): JSX.Element;
