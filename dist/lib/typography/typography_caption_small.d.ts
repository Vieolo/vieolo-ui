import React from 'react';
import { TypographyColorType, TypographyFontFamily, TypographyMargin, TypographyTextAlign } from './typography_base';
import { ColorOptionType, FontWeightType } from '../private/types';
export default function TypographyCaptionSmall(props: {
    text: string;
    className?: string;
    showTitle?: boolean;
    dataTestID?: string;
    ariaLabel?: string;
    color?: ColorOptionType;
    margin?: TypographyMargin;
    fontWeight?: FontWeightType;
    style?: React.CSSProperties;
    colorType?: TypographyColorType;
    fontFamily?: TypographyFontFamily;
    textAlign?: TypographyTextAlign;
}): JSX.Element;
