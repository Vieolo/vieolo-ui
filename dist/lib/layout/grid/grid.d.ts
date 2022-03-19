/// <reference types="react" />
declare type GridSpanType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export default function Grid(props: {
    xl: GridSpanType;
    lg?: GridSpanType;
    md?: GridSpanType;
    sm?: GridSpanType;
    direction?: 'row' | 'column';
    children?: React.ReactNode;
}): JSX.Element;
export {};
