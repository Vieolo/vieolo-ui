// React
import React from 'react';



export default function TypographyBase(props: {
    className: string,
    text: string,
    showTitle?: boolean
}) {
    return <p
        className={props.className}
        title={props.showTitle ? props.text : ""}
    >
        {props.text}
    </p>
}