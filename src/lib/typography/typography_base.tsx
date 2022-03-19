// React
import React from 'react';

// Types
import { ColorOptionType, FontWeightType } from '../private/types';



export default function TypographyBase(props: {
    className: string,
    text: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,
    color?: ColorOptionType,
    colorType?: 'normal' | 'text' | 'light',
    margin?: "0" | "5" | "10" | "20" | "half" | "one" | "two",
    fontWeight?: FontWeightType,
    style?: React.CSSProperties
}) {
    let finalClassName = `color--${props.color || (props.className.includes("caption") ? 'gray' : 'default')}-${props.colorType || 'normal'} `;
    finalClassName += `margin-vertical--${props.margin || "0"} `;
    finalClassName += `font-weight--${props.fontWeight || (props.className.includes("title") ? 'bold' : 'normal')} `;
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