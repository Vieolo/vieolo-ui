import React from 'react';
import { DropDownMenuItemType } from '../menu/dropdown_menu';
import { EmphasisType, BorderRadiusType, ColorOptionType } from '../private/types';
export default function Button(props: {
    text: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    color: ColorOptionType;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    /**
     * selects the subclass of the `vieolo-button`
     * default: medium
     */
    height?: 'large' | 'medium' | 'small';
    /** default: content */
    width?: 'content' | 'full';
    className?: string;
    toLowerCase?: boolean;
    fontSize?: number;
    style?: React.CSSProperties;
    type?: 'button' | 'submit' | 'reset';
    /** default: high */
    emphasis?: EmphasisType;
    /** default: `vieolo-button` css class */
    borderRadius?: BorderRadiusType;
    /** Adds an Icon button to the right side of the button */
    auxiliary?: {
        icon: React.ReactNode;
        onClick: (dropDownItemValue?: string) => void;
        dropDownMenuItems?: DropDownMenuItemType[];
        ariaLabel?: string;
    };
    ariaLabel?: string;
}): JSX.Element;
