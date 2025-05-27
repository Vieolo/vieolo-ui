import React from 'react';
import IconButton from '../IconButton';
import { ColorOptionType } from '../types/types';
type IconButtonType = Omit<React.ComponentProps<typeof IconButton>, "onClick" | "icon" | 'disabled'>;
export type DropDownMenuSwitch = {
    on: boolean;
    ariaLabel?: string;
    subTitle?: string;
    disabled?: boolean;
};
export type DropDownMenuItemType = {
    title: string;
    /** The unique value of each item which is used to reference this item */
    value: string;
    icon?: React.ReactNode;
    color?: ColorOptionType;
    switch?: DropDownMenuSwitch;
    topBorder?: boolean;
    hidden?: boolean;
};
type DropDownMenuProps = {
    buttonComponent?: React.ReactNode;
    defaultButtonConfig?: IconButtonType;
    disabled?: boolean;
    items: DropDownMenuItemType[];
    onItemSelect: (value: string) => void;
    className?: string;
    /** @deprecated The positioning of the dropdown is calculated automatically */
    position?: 'left' | 'right';
    disableIfAllItemsHidden?: boolean;
};
export default function DropDownMenu(props: DropDownMenuProps): JSX.Element;
export {};
