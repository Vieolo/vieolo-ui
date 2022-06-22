import React from 'react';
import { SelectItemType } from '../Select';
export default function SelectSet(props: {
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    items: SelectItemType[];
    selectedItems: string[];
    onSelect: (values: string[]) => void;
    error: boolean;
    clearable?: boolean;
    searchable?: boolean;
    multipleChoice?: boolean;
    height?: 'medium' | 'small';
    disabled?: boolean;
}): JSX.Element;
