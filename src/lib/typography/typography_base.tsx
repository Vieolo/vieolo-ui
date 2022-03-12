// React
import React from 'react';

// Types
import { ColorOptionType } from '../private/types';



export default function TypographyBase(props: {
    className: string,
    text: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,
    color?: ColorOptionType,
    margin?: "0" | "5" | "10" | "20" | "half" | "one" | "two"
}) {
    let finalClassName = `${props.className} `;
    finalClassName += `${props.color || (props.className.includes("caption") ? 'gray-text' : 'default-text')}-color `;
    finalClassName += `margin-vertical--${props.margin || "0"} `;

    return <p
        className={finalClassName.trim()}
        title={props.showTitle ? props.text : ""}
        aria-label={props.ariaLabel}
        data-testid={props.dataTestID}
    >
        {props.text}
    </p>
}