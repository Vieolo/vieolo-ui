import React from 'react';
declare type SelectItemType = {
    title: string;
    value: string;
    category?: string;
};
declare type SelectProps = {
    title: string;
    items: SelectItemType[];
    selectedItem: string;
    onSelect: (value: string) => void;
    error: boolean;
};
export default class Select extends React.Component<SelectProps, {
    open: boolean;
}> {
    container: React.RefObject<unknown>;
    constructor(props: SelectProps);
    handleButtonClick: () => void;
    handleClickOutside: (event: any) => void;
    componentDidMount(): void;
    componentWillUnmount(): void;
    getSelectedItem(value: string): SelectItemType;
    render(): React.ReactNode;
}
export {};
