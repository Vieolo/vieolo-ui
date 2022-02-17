// React
import React from 'react';



export default function TypographyBase(props: {
    className: string,
    text: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string
}) {
    return <p
        className={props.className}
        title={props.showTitle ? props.text : ""}
        aria-label={props.ariaLabel}
        data-testid={props.dataTestID}
    >
        {props.text}
    </p>
}