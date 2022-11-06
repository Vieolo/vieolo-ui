import React from 'react';
import { ColorOptionType } from '../types/types';
export declare type DropDownMenuSwitch = {
    on: boolean;
    ariaLabel?: string;
    subTitle?: string;
    disabled?: boolean;
};
export declare type DropDownMenuItemType = {
    title: string;
    /** The unique value of each item which is used to reference this item */
    value: string;
    icon?: React.ReactNode;
    color?: ColorOptionType;
    switch?: DropDownMenuSwitch;
    topBorder?: boolean;
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
