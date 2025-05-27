import React from 'react';
import { ColorOptionType, FontWeightType, TypographyOptionTypes } from '../types/types';
export type TypographyTextAlign = "left" | "center" | "right" | "justify";
export type TypographyFontFamily = "primary" | "secondary";
export type TypographyMargin = "0" | "5" | "10" | "20" | "half" | "one" | "two";
export type TypographyColorType = 'normal' | 'text' | 'light' | 'text-light';
export type TypographyStyle = {
    /** default: paragraph-medium */
    type?: TypographyOptionTypes;
    color?: ColorOptionType;
    colorType?: TypographyColorType;
    margin?: TypographyMargin;
    fontWeight?: FontWeightType;
    fontFamily?: TypographyFontFamily;
    textAlign?: TypographyTextAlign;
};
export default function Typography(props: {
    className?: string;
    text: string;
    showTitle?: boolean;
    dataTestID?: string;
    ariaLabel?: string;
    style?: React.CSSProperties;
    nonselectable?: boolean;
    noTextOverflow?: boolean;
    /** This is the title that appears natively by the browser when the user hovers over the text */
    hoverTitle?: string;
    lg?: TypographyStyle;
    md?: TypographyStyle;
    sm?: TypographyStyle;
} & TypographyStyle): JSX.Element;
