import React from 'react';
import { ColorOptionType } from '../private/types';
export declare type ListItem = {
    id: string;
    title: string;
    subTitle?: string;
    onClick?: () => void;
    selected: boolean;
    onButtonClick?: () => void;
    buttonColor?: ColorOptionType;
    buttonIcon?: React.ReactNode;
    buttonSize?: 'small' | 'medium';
    leadingIcon?: React.ReactNode;
};
export default function List(props: {
    items: ListItem[];
    enableSearch?: boolean;
    title: string;
    cardStyle?: "card-light-shadow" | "card-dark-shadow" | "card-no-shadow";
    height: string;
}): JSX.Element;
