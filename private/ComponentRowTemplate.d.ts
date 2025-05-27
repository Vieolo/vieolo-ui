import React from 'react';
import { RowHeightType } from '../types/types';
export type ComponentRowTemplateResponsive = boolean | 'lg' | 'md' | 'sm';
export default function ComponentRowTemplate(props: {
    title: string | React.ReactNode;
    subtitle: string | React.ReactNode;
    disabled?: boolean | undefined;
    height?: RowHeightType | "default";
    className?: string;
    handleKeyboardNav: boolean;
    rightSideComponent: React.ReactNode;
    onRowClick?: () => void;
    /**
     * Whether the title column should be positioned on the top of right component to accomodate for smaller screens.
     *
     * You can explicitly determine the breakpoint from which the row is responsive. If a boolean is given, the breakpoint will be considered to the mobile layout
     */
    responsive?: ComponentRowTemplateResponsive;
}): JSX.Element;
