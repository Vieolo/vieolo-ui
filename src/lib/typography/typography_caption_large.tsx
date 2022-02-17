// React
import React from 'react';

// Internal Components
import TypographyBase from './typography_base';

export default function TypographyCaptionLarge (props: {
    text: string,
    className?: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-caption-large${props.className ? ` ${props.className}` : ""}`}
        showTitle={props.showTitle}
        dataTestID={props.dataTestID}
        ariaLabel={props.ariaLabel}
    />
}