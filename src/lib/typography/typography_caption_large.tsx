// React
import React from 'react';

// Internal Components
import TypographyBase from './typography_base';

export default function TypographyCaptionLarge (props: {
    text: string,
    className?: string,
    showTitle?: boolean
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-caption-large${props.className ? ` ${props.className}` : ""}`}
        showTitle={props.showTitle}
    />
}