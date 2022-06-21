/// <reference types="react" />
import { FlexDirection, FlexAlignItems, FlexJustifyContent } from '../Flex';
import { GridGapType } from '../types/types';
declare type GridSpanType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export default function Grid(props: {
    xl: GridSpanType;
    lg?: GridSpanType;
    md?: GridSpanType;
    sm?: GridSpanType;
    direction?: 'row' | 'column';
    children?: React.ReactNode;
    className?: string;
    /**
     * Will wrap the children in a `Flex` component
     * This is useful to be able to align the children of the `Grid` without the need to manually add a `div` or styling
     */
    flex?: {
        direction?: FlexDirection;
        justifyContent?: FlexJustifyContent;
        alignItems?: FlexAlignItems;
        rowGap?: GridGapType;
        columnGap?: GridGapType;
        className?: string;
    };
}): JSX.Element;
export {};
