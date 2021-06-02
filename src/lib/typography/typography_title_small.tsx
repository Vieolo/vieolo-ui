// React
import React from 'react';

// Internal Components
import TypographyBase from './typography_base';

export default function TypographyTitleSmall (props: {
    text: string,
    className?: string,
    showTitle?: boolean
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-title-small${props.className ? ` ${props.className}` : ""}`}
        showTitle={props.showTitle}
    />
}