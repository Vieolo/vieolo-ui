// React
import React from 'react';

// Internal Components
import TypographyBase, { TypographyColorType, TypographyFontFamily, TypographyMargin, TypographyTextAlign } from './typography_base';

// Types
import { FontWeightType, ColorOptionType } from '../private/types';

export default function TypographyCaptionLarge (props: {
    text: string,
    className?: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,
    color?: ColorOptionType,
    margin?: TypographyMargin,
    colorType?: TypographyColorType,
    fontWeight?: FontWeightType,
    style?: React.CSSProperties,
    fontFamily?: TypographyFontFamily,
    textAlign?: TypographyTextAlign
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-caption-large${props.className ? ` ${props.className}` : ""}`}
        showTitle={props.showTitle}
        dataTestID={props.dataTestID}
        ariaLabel={props.ariaLabel}
        color={props.color}
        margin={props.margin}
        fontWeight={props.fontWeight}
        style={props.style}
        colorType={props.colorType}
        fontFamily={props.fontFamily}
        textAlign={props.textAlign}
    />
}