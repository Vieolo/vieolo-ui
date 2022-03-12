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
}) {
    let finalClassName = `${props.className} ${props.color || (props.className.includes("caption") ? 'gray-text' : 'default-text')}-color`;

    return <p
        className={finalClassName.trim()}
        title={props.showTitle ? props.text : ""}
        aria-label={props.ariaLabel}
        data-testid={props.dataTestID}
    >
        {props.text}
    </p>
}