/// <reference types="react" />
import { GridGapType } from '../types/types';
export type FlexJustifyContent = "start" | "end" | "space-around" | "space-between" | "center";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexAlignItems = "start" | "end" | "center";
export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";
export default function Flex(props: {
    justifyContent?: FlexJustifyContent;
    direction?: FlexDirection;
    alignItems?: FlexAlignItems;
    rowGap?: GridGapType;
    columnGap?: GridGapType;
    className?: string;
    wrap?: FlexWrap;
    children?: React.ReactNode;
}): JSX.Element;
