import React from 'react';
export declare type DropDownMenuItemType = {
    title: string;
    /** The unique value of each item which is used to reference this item */
    value: string;
    icon?: React.ReactNode;
};
declare type DropDownMenuProps = {
    buttonComponent: React.ReactNode;
    disabled?: boolean;
    items: DropDownMenuItemType[];
    onItemSelect: (value: string) => void;
    className?: string;
    /** @deprecated The positioning of the dropdown is calculated automatically */
    position?: 'left' | 'right';
};
export default function DropDownMenu(props: DropDownMenuProps): JSX.Element;
export {};
