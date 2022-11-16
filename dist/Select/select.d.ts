/// <reference types="react" />
export type SelectItemType = {
    title: string;
    value: string;
    category?: string;
    subTitle?: string;
};
type SelectProps = {
    title: string;
    items: SelectItemType[];
    selectedItems: string[];
    onSelect: (values: string[]) => void;
    error: boolean;
    clearable?: boolean;
    searchable?: boolean;
    multipleChoice?: boolean;
    height?: 'medium' | 'small';
    disabled?: boolean;
};
export default function Select(props: SelectProps): JSX.Element;
export {};
