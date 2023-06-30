// Types
import { GridGapType } from '../types/types';

export type FlexJustifyContent = "start" | "end" | "space-around" | "space-between" | "center";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexAlignItems = "start" | "end" | "center";
export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse" | 'scroll';

type FlexProps = {
    justifyContent?: FlexJustifyContent,
    direction?: FlexDirection,
    alignItems?: FlexAlignItems,
    rowGap?: GridGapType,
    columnGap?: GridGapType,
    wrap?: FlexWrap,
}

export default function Flex(props: {
    className?: string,
    lg?: FlexProps,
    md?: FlexProps,
    sm?: FlexProps
    children?: React.ReactNode
} & FlexProps) {

    let c = "flex";

    // Default classes
    c += getFlexClass(props, 'xl');

    // Size classes
    let sizes = [props.lg, props.md, props.sm];
    for (let i = 0; i < sizes.length; i++) {
        const s = sizes[i];
        if (s !== undefined) {
            c += getFlexClass(s, i === 0 ? 'lg' : i === 1 ? 'md' : 'sm')
        } 
    }

    if (props.className) c += ` ${props.className}`

    return <div className={c}>
        {props.children}
    </div>
}

function getFlexClass(props: FlexProps, size: 'xl' | 'lg' | 'md' | 'sm') : string {
    let c = ""
    
    let sizeState = size === 'xl' ? '' : `--${size}`;

    // Flex classes
    if (props.direction) c += ` flex--direction--${props.direction}${sizeState}`;
    if (props.justifyContent) c += ` flex--justify-content--${props.justifyContent}${sizeState}`;
    if (props.alignItems) c += ` flex--align-items--${props.alignItems}${sizeState}`
    if (props.wrap) c += ` flex--wrap--${props.wrap === 'scroll' ? `scroll-${(props.direction || 'row').includes("row") ? "x" : "y"}` : props.wrap}${sizeState}`

    // Gap casses
    if (props.rowGap) c += ` row-gap--${props.rowGap}${sizeState}`;
    if (props.columnGap) c += ` column-gap--${props.columnGap}${sizeState}`;
    
    return c

}