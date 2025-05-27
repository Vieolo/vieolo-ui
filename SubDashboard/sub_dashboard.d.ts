import React from 'react';
import List, { ListItem } from '../List';
import { RowStyleType } from '../types';
import SubNavbarRow from '../SubNavbarRow';
export default function SubDashboard(props: {
    items: ListItem[];
    handleSubPageInURL?: boolean;
    children?: React.ReactNode;
    itemStyle?: RowStyleType;
    subNavbarOptions?: React.ComponentProps<typeof SubNavbarRow>;
    emptyText?: string;
    emptyIcon?: React.ReactNode;
    itemListOptions?: Omit<React.ComponentProps<typeof List>, "items" | "itemStyle" | "height">;
}): JSX.Element;
