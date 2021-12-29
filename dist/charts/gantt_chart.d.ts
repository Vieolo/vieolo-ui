import { ReactNode } from 'react';
import { ColorOptionType } from '../lib/private/types';
export declare type GanttChartContextMenuItem = {
    title: string;
    icon?: ReactNode;
    onClick: (d: GanttChartItemType) => void;
    color?: ColorOptionType;
    disabled?: boolean;
};
export declare type GanttChartItemType = {
    id?: number;
    from: number;
    to: number;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    disabled?: boolean;
    onClick?: (d: GanttChartItemType) => void;
    color?: ColorOptionType | {
        border: string;
        background: string;
        text: string;
    };
    contextMenuItems?: GanttChartContextMenuItem[];
    subItems?: {
        from: number;
        to: number;
    }[];
    supItems?: {
        from: number;
        to: number;
    }[];
};
export declare type GanttChartDataType = {
    /** The value to identify the row on click */
    value: string;
    /** The title of row which is displayed on the left-most column of the chart */
    title: string;
    subtitle?: string;
    /** The Actual data in the chart */
    items: GanttChartItemType[];
};
export declare type GanttChartColumnTitle = {
    title: string;
    subtitle?: string;
    onClick?: () => void;
};
export declare type GanttChartColumnGroup = {
    start: number;
    end: number;
    title: string;
};
export default function GanttChart(props: {
    data: GanttChartDataType[];
    dataTitle: string;
    columnTitles: GanttChartColumnTitle[];
    columnGroups?: GanttChartColumnGroup[];
    initialFilter?: "All" | "Full" | "Empty";
}): JSX.Element;
