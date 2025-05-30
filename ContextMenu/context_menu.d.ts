import { ReactNode } from 'react';
import { ColorOptionType } from '../types/types';
export type ContextMenuItem = {
    title: string;
    icon?: ReactNode;
    color?: ColorOptionType;
    onClick: (v: string) => void;
    disabled?: boolean;
    ariaLabel?: string;
};
export default function ContextMenu(props: {
    items: ContextMenuItem[];
    position: {
        x: number;
        y: number;
    };
    onClose: () => void;
}): JSX.Element;
