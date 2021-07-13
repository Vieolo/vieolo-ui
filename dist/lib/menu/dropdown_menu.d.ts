import React from 'react';
declare type DropDownMenuProps = {
    buttonComponent: React.ReactNode;
    disabled?: boolean;
    items: {
        title: string;
        icon?: React.ReactNode;
    }[];
    onItemSelect: (title: string) => void;
    className?: string;
    position?: 'left' | 'right';
};
export default function DropDownMenu(props: DropDownMenuProps): JSX.Element;
export {};
