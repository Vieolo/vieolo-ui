import React from 'react';
import { TypographyColorType, TypographyFontFamily, TypographyMargin, TypographyTextAlign } from './typography_base';
import { FontWeightType, ColorOptionType } from '../private/types';
export default function TypographyCaptionLarge(props: {
    text: string;
    className?: string;
    showTitle?: boolean;
    dataTestID?: string;
    ariaLabel?: string;
    color?: ColorOptionType;
    margin?: TypographyMargin;
    colorType?: TypographyColorType;
    fontWeight?: FontWeightType;
    style?: React.CSSProperties;
    fontFamily?: TypographyFontFamily;
    textAlign?: TypographyTextAlign;
}): JSX.Element;
