// React
import React from 'react';

// Types
import { ColorOptionType, FontWeightType } from '../private/types';


export type TypographyTextAlign = "left" | "center" | "right" | "justify";
export type TypographyFontFamily = "primary" | "secondary";
export type TypographyMargin = "0" | "5" | "10" | "20" | "half" | "one" | "two";
export type TypographyColorType = 'normal' | 'text' | 'light' | 'text-light';


export default function TypographyBase(props: {
    className: string,
    text: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,
    color?: ColorOptionType,
    colorType?: TypographyColorType,
    margin?: TypographyMargin,
    fontWeight?: FontWeightType,
    style?: React.CSSProperties,
    fontFamily?: TypographyFontFamily,
    textAlign?: TypographyTextAlign
}) {
    let finalClassName = `color--${props.color || (props.className.includes("caption") ? 'gray' : 'default')}-${props.colorType || 'normal'} `;
    finalClassName += `margin-vertical--${props.margin || "0"} `;
    finalClassName += `font-weight--${props.fontWeight || (props.className.includes("title") ? 'bold' : 'normal')} `;
    finalClassName += `font-family--${props.fontFamily || 'primary'} `;
    if (props.textAlign) finalClassName += `text-align--${props.textAlign} `;
    finalClassName += `${props.className} `;


    return <p
        className={finalClassName.trim()}
        title={props.showTitle ? props.text : ""}
        aria-label={props.ariaLabel}
        data-testid={props.dataTestID}
        style={props.style}
    >
        {props.text}
    </p>
}