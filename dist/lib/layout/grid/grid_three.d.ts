/// <reference types="react" />
import { GridGapType } from "../../private/types";
export default function GridThree(props: {
    children: React.ReactNode[];
    responsiveBreakpoint?: 'lg' | 'md' | 'sm';
    rowGap?: GridGapType;
    columnGap?: GridGapType;
}): JSX.Element;
