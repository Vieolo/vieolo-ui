// React
import React from 'react';

// Utils and logics
import { getBorderRadiusClasses, getEmphasisClasses } from '../utility/style_utility';

// Types
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType } from '../types/types';


export default function Card(props: {
    emphasis?: EmphasisType,
    elevation?: ElevationType,
    borderRadius?: BorderRadiusType,
    color?: ColorOptionType,
    height?: string,
    width?: string,
    children?: React.ReactNode,
    padding?: 'none' | 'half' | 'one' | 'two',
    ariaLabel?: string,
    style?: React.CSSProperties,
    className?: string,
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    keepEmphasisTextColorClasses?: boolean
}) {

    let em = props.emphasis || 'none';
    let el = props.elevation || "0";
    let co = props.color || 'primary';

    let className = `vieolo-card`;

    if (props.className) className += ` ${props.className}`;
    className += getEmphasisClasses(em, co, {
        removeTextColorClasses: props.keepEmphasisTextColorClasses ? false : true,
        hasRipple: props.onClick !== undefined,
        hoverable: props.onClick !== undefined,
    });

    className += getBorderRadiusClasses("vieolo-card", props.borderRadius)
    className += ` elevation--${el}`;
    className += ` padding--${props.padding || 'one'}`

    if (props.onClick) className += ` cursor--pointer`

    let style: React.CSSProperties = props.style || {};

    if (props.height) style.height = props.height;
    if (props.width) style.width = props.width;

    return <div className={className} style={style} aria-label={props.ariaLabel} onClick={props.onClick}>
        {props.children}
    </div>
}