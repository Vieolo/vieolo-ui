import React from 'react';
import { ColorOptionType, RowStyleType } from '../private/types';
export default function ItemRow(props: {
    title?: string;
    subTitle?: string;
    onClick?: () => void;
    selected?: boolean;
    leadingIcon?: React.ReactNode;
    buttonIcon?: React.ReactNode;
    buttonClick?: () => void;
    buttonSize?: 'small' | 'medium';
    buttonColor?: ColorOptionType;
    itemStyle?: RowStyleType;
    disabled?: boolean;
    ariaLabel?: string;
    /**
     * Passing this object will convert the row into a search row
     * The main `title` of the row will act as the placeholder of the search input (default: Search...)
     */
    searchRow?: {
        query: string;
        onQueryChange: (c: string) => void;
    };
}): JSX.Element;
