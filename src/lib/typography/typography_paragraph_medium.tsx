// React
import React from 'react';

// Internal Components
import TypographyBase from './typography_base';

export default function TypographyParagraphMedium (props: {
    text: string,
    className?: string,
    showTitle?: boolean
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-paragraph-medium${props.className ? ` ${props.className}` : ""}`}
        showTitle={props.showTitle}
    />
}