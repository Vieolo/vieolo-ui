// React
import React from 'react';

// Internal Components
import TypographyBase from './typography_base';

// Types
import { FontWeightType, ColorOptionType } from '../private/types';

export default function TypographyCaptionLarge (props: {
    text: string,
    className?: string,
    showTitle?: boolean,
    dataTestID?: string,
    ariaLabel?: string,
    color?: ColorOptionType,
    margin?: "0" | "5" | "10" | "20" | "half" | "one" | "two",
    fontWeight?: FontWeightType
}) {
    return <TypographyBase 
        text={props.text}
        className={`typography-caption-large${props.className ? ` ${props.className}` : ""}`}
        showTitle={props.showTitle}
        dataTestID={props.dataTestID}
        ariaLabel={props.ariaLabel}
        color={props.color}
        margin={props.margin}
        fontWeight={props.fontWeight}
    />
}