import React from 'react';
import { ColorOptionType, RowStyleType } from '../types/types';
import { GridGapType } from '../types';
export type ListItem = {
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
    disabled?: boolean;
    ariaLabel?: string;
    /**
     * The group that the item belongs to
     * If the item does not belong to a group, it will appear after all of the groups
     */
    group?: string;
};
export default function List(props: {
    /**
     * The style of the items
     * This styles applied both to grouped and ungrouped items
     */
    itemStyle?: RowStyleType;
    /** The style of the group expandable cards when collapsed */
    collapsedGroupStyle?: RowStyleType;
    /**
     * The style of the group expandable cards when expanded
     * If undefined, the `collapsedGroupStyle` is used
     */
    expandedGroupStyle?: RowStyleType;
    items: ListItem[];
    enableSearch?: boolean;
    enableSorting?: boolean;
    enableSubtitleSearch?: boolean;
    title?: string;
    height: string;
    horizontalPadding?: 'none' | 'half' | 'one';
    ariaLabel?: string;
    onlyAllowOneGroupToExpand?: boolean;
    headerActions?: React.ReactNode;
    controlItemBorderRadius?: boolean;
    rowGap?: GridGapType;
}): JSX.Element;
