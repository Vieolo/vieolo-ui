import React from 'react';
export declare type ListItem = {
    id: string;
    title: string;
    subTitle?: string;
    onClick?: () => void;
    selected: boolean;
    onButtonClick?: () => void;
    buttonColor?: 'primary' | 'secondary' | 'tertiary' | 'background' | 'alert' | 'error' | 'success' | 'accessory-orange' | 'accessory-blue' | 'accessory-green';
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
