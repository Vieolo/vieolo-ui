import React from 'react';
import { RowHeightType } from '../types/types';
export default function SetRowTemplate(props: {
    title: string | React.ReactNode;
    subtitle: string | React.ReactNode;
    disabled?: boolean | undefined;
    height?: RowHeightType | "default";
    className?: string;
    handleKeyboardNav: boolean;
    rightSideComponent: React.ReactNode;
    onRowClick?: () => void;
}): JSX.Element;
