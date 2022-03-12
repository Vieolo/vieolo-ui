// React
import React from 'react';

// Internal Components
import TypographyBase from './typography_base';

// Types
import { ColorOptionType } from '../private/types';

export default function TypographyCaptionSmall (props: {
    text: string,
    className?: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,
    color?: ColorOptionType
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-caption-small${props.className ? ` ${props.className}` : ""}`}
        showTitle={props.showTitle}
        dataTestID={props.dataTestID}
        ariaLabel={props.ariaLabel}
        color={props.color}
    />
}