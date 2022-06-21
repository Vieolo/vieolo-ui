import React from 'react';
import { ColorOptionType } from '../types/types';
export declare type TableInteractiveCell = {
    id?: string;
    /**
     * A string or a react node
     * In order to make an overlay, pass a react node and give it a span
     */
    value: React.ReactNode | string;
    onClick?: (id?: string) => void;
    selectable?: boolean;
    span?: {
        direction: 'top' | 'bottom' | 'left' | 'right';
        span: number;
    };
    numericalValue?: number;
    background?: ColorOptionType;
    onTextEdit?: (newValue: string) => void;
};
declare type HeaderFormatter = (s: string | number) => string;
export default function TableInteractive(props: {
    headers: (string | {
        name: string;
        formatter: HeaderFormatter;
    })[];
    headerSticky?: boolean;
    rows: TableInteractiveCell[][];
    selectedColor?: ColorOptionType;
    columnGrid: string;
    width?: string;
    showBottomRow?: boolean;
    isDense?: boolean;
}): JSX.Element;
export {};
