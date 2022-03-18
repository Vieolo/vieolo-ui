// React
import React from 'react';

// Utils and logics
import { getEmphasisClasses } from '../utility/style_utility';

// Types
import { BorderRadiusType, ColorOptionType, EmphasisType } from '../private/types';


export default function Card(props: {
    emphasis?: EmphasisType,
    elevation?: "0" | "1" | "2",
    borderRadius?: BorderRadiusType,
    color?: ColorOptionType,
    height?: string,
    width?: string,
    children?: React.ReactNode,
    padding?: 'none' | 'half' | 'one'
}) {

    let em = props.emphasis || 'none';
    let el = props.elevation || "0";
    let br = props.borderRadius || 'default';
    let co = props.color || 'primary';

    let className = `vieolo-card`;

    className += getEmphasisClasses(em, co, {removeTextColorClasses: true});

    className += ` vieolo-card--border-radius-${br}`;
    className += ` elevation--${el}`;
    className += ` padding--${props.padding || 'one'}`

    let style: React.CSSProperties = {};

    if (props.height) style.height = props.height;
    if (props.width) style.width = props.width;

    return <div className={className} style={style}>
        {props.children}
    </div>
}