/// <reference types="react" />
import { GridGapType } from '../types/types';
export type FlexJustifyContent = "start" | "end" | "space-around" | "space-between" | "center";
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type FlexAlignItems = "start" | "end" | "center" | "stretch";
export type FlexWrap = "wrap" | "nowrap" | "wrap-reverse" | 'scroll';
type FlexProps = {
    justifyContent?: FlexJustifyContent;
    direction?: FlexDirection;
    alignItems?: FlexAlignItems;
    rowGap?: GridGapType;
    columnGap?: GridGapType;
    wrap?: FlexWrap;
};
export default function Flex(props: {
    className?: string;
    lg?: FlexProps;
    md?: FlexProps;
    sm?: FlexProps;
    children?: React.ReactNode;
} & FlexProps): JSX.Element;
export {};
