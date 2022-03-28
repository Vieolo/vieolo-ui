// React
import React from 'react';

// Internal Components
import TypographyBase, { TypographyColorType, TypographyFontFamily, TypographyMargin, TypographyTextAlign } from './typography_base';

// Types
import { ColorOptionType, FontWeightType } from '../private/types';

export default function TypographyParagraphSmall (props: {
    text: string,
    className?: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,
    color?: ColorOptionType,
    margin?: TypographyMargin,
    fontWeight?: FontWeightType,
    style?: React.CSSProperties,
    colorType?: TypographyColorType,
    fontFamily?: TypographyFontFamily,
    textAlign?: TypographyTextAlign
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-paragraph-small${props.className ? ` ${props.className}` : ""}`}
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