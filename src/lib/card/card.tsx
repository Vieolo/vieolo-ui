// React
import React from 'react';

// Utils and logics
import { getEmphasisClasses } from '../utility/style_utility';

// Types
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType } from '../private/types';


export default function Card(props: {
    emphasis?: EmphasisType,
    elevation?: ElevationType,
    borderRadius?: BorderRadiusType,
    color?: ColorOptionType,
    height?: string,
    width?: string,
    children?: React.ReactNode,
    padding?: 'none' | 'half' | 'one',
    ariaLabel?: string,
    style?: React.CSSProperties,
    className?: string
}) {

    let em = props.emphasis || 'none';
    let el = props.elevation || "0";
    let br = props.borderRadius || 'default';
    let co = props.color || 'primary';

    let className = `vieolo-card`;

    if (props.className) className += ` ${props.className}`;
    className += getEmphasisClasses(em, co, {removeTextColorClasses: true});

    className += ` vieolo-card--border-radius-${br}`;
    className += ` elevation--${el}`;
    className += ` padding--${props.padding || 'one'}`

    let style: React.CSSProperties = props.style || {};

    if (props.height) style.height = props.height;
    if (props.width) style.width = props.width;

    return <div className={className} style={style} aria-label={props.ariaLabel}>
        {props.children}
    </div>
}