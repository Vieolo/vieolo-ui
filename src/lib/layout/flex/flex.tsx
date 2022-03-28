// Types
import { GridGapType } from '../../private/types';

export type FlexJustifyContent = "start" | "end" | "space-around" | "space-between" | "center";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexAlignItems = "start" | "end" | "center";

export default function Flex(props: {
    justifyContent?: FlexJustifyContent,
    direction?: FlexDirection,
    alignItems?: FlexAlignItems,
    rowGap?: GridGapType,
    columnGap?: GridGapType,
    className?: string,
    children?: React.ReactNode
}) {

    let c = "flex";

    if (props.direction) c += ` flex--direction--${props.direction}`;
    if (props.justifyContent) c += ` flex--justify-content--${props.justifyContent}`;
    if (props.alignItems) c += ` flex--align-items--${props.alignItems}`
    if (props.rowGap) c += ` row-gap--${props.rowGap}`;
    if (props.columnGap) c += ` column-gap--${props.columnGap}`;
    if (props.className) c += ` ${props.className}`

    return <div className={c}>
        {props.children}
    </div>
}