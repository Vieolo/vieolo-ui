/// <reference types="react" />
declare type SelectItemType = {
    title: string;
    value: string;
    category?: string;
};
declare type SelectProps = {
    title: string;
    items: SelectItemType[];
    selectedItems: string[];
    onSelect: (values: string[]) => void;
    error: boolean;
    clearable?: boolean;
    searchable?: boolean;
    multipleChoice?: boolean;
    height?: 'medium' | 'small';
};
export default function Select(props: SelectProps): JSX.Element;
export {};
