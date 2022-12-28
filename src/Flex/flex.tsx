// Types
import { GridGapType } from '../types/types';

export type FlexJustifyContent = "start" | "end" | "space-around" | "space-between" | "center";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexAlignItems = "start" | "end" | "center";
export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse" | 'scroll';

export default function Flex(props: {
    justifyContent?: FlexJustifyContent,
    direction?: FlexDirection,
    alignItems?: FlexAlignItems,
    rowGap?: GridGapType,
    columnGap?: GridGapType,
    className?: string,
    wrap?: FlexWrap,
    children?: React.ReactNode
}) {

    let c = "flex";

    if (props.direction) c += ` flex--direction--${props.direction}`;
    if (props.justifyContent) c += ` flex--justify-content--${props.justifyContent}`;
    if (props.alignItems) c += ` flex--align-items--${props.alignItems}`
    if (props.rowGap) c += ` row-gap--${props.rowGap}`;
    if (props.columnGap) c += ` column-gap--${props.columnGap}`;
    if (props.className) c += ` ${props.className}`
    if (props.wrap) c += ` flex--wrap--${props.wrap === 'scroll' ? `scroll-${(props.direction || 'row').includes("row") ? "x" : "y"}` : props.wrap}`

    return <div className={c}>
        {props.children}
    </div>
}