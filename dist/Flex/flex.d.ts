/// <reference types="react" />
import { GridGapType } from '../types/types';
export declare type FlexJustifyContent = "start" | "end" | "space-around" | "space-between" | "center";
export declare type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export declare type FlexAlignItems = "start" | "end" | "center";
export declare type FlexWrap = "wrap" | "nowrap" | "wrap-reverse";
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
