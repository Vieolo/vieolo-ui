import React from 'react';
import { ColorOptionType, FontWeightType, TypographyOptionTypes } from '../types/types';
export type TypographyTextAlign = "left" | "center" | "right" | "justify";
export type TypographyFontFamily = "primary" | "secondary";
export type TypographyMargin = "0" | "5" | "10" | "20" | "half" | "one" | "two";
export type TypographyColorType = 'normal' | 'text' | 'light' | 'text-light';
export default function Typography(props: {
    /** default: paragraph-medium */
    type?: TypographyOptionTypes;
    className?: string;
    text: string;
    showTitle?: boolean;
    dataTestID?: string;
    ariaLabel?: string;
    color?: ColorOptionType;
    colorType?: TypographyColorType;
    margin?: TypographyMargin;
    fontWeight?: FontWeightType;
    style?: React.CSSProperties;
    fontFamily?: TypographyFontFamily;
    textAlign?: TypographyTextAlign;
    nonselectable?: boolean;
    /** This is the title that appears natively by the browser when the user hovers over the text */
    hoverTitle?: string;
}): JSX.Element;
