/// <reference types="react" />
export declare type DoubleToggleListItem = {
    title: string;
    id: string;
    on: boolean;
    disabled?: boolean;
};
export default function DoubleToggleList(props: {
    title: string;
    description: string;
    items: DoubleToggleListItem[];
    onItemToggle: (id: string, newValue: boolean) => void;
    chipSize?: 'small' | 'medium';
}): JSX.Element;
