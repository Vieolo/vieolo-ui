import React from 'react';
export type SelectItemType = {
    title: string;
    value: string;
    category?: string;
    subTitle?: string;
    icon?: React.ReactNode;
};
type SelectProps = {
    title?: string;
    placeHolder?: string;
    items: SelectItemType[];
    selectedItems: string[];
    onSelect: (values: string[]) => void;
    error: boolean;
    clearable?: boolean;
    searchable?: boolean;
    multipleChoice?: boolean;
    height?: 'medium' | 'small';
    disabled?: boolean;
    ariaLabel?: string;
    width?: 'small' | 'medium' | 'full';
};
export default function Select(props: SelectProps): JSX.Element;
export {};
