import { ReactNode } from 'react';
import { ColorOptionType } from '../types/types';
export declare type GanttChartContextMenuItem = {
    title: string;
    icon?: ReactNode;
    onClick: (r: GanttChartRowType, d?: GanttChartItemType) => void;
    color?: ColorOptionType;
    disabled?: boolean;
};
export declare type GanttChartItemType = {
    id?: number;
    from: number;
    to: number;
    ariaLabel?: string;
    title?: string;
    subtitle?: string;
    icon?: ReactNode;
    disabled?: boolean;
    /**
     * Callback function the item is clicked with a mouse or
     * tapped in a mobile device when no context menu us provided
     * Please note that if context menu items are provided, the `onClick`
     * callback is ignored in the case of a touch event.
     */
    onClick?: (d: GanttChartItemType) => void;
    color?: ColorOptionType | {
        border: string;
        background: string;
        text: string;
    };
    /**
     * The context menu items to appear when the user right clicks on the item or
     * taps when using a touch device.
     * Note that if you are providing the context menu items AND the `onClick` function,
     * the `onClick` functionality should always be included as one of the context menu options
     */
    contextMenuItems?: GanttChartContextMenuItem[];
    /**
     * These items are ignored while filtering rows based on the number of items.
     * so, if a row has only items with this property, it is considered an empty row
     */
    ignoredInFilter?: boolean;
};
export declare type GanttChartAuxiliaryItemType = {
    id: string;
    from: number;
    to: number;
    ariaLabel?: string;
    title?: string;
};
export declare type GanttChartRowType = {
    /** The value to identify the row on click */
    value: string;
    /** The title of row which is displayed on the left-most column of the chart */
    title: string;
    subtitle?: string;
    /** The Actual data in the chart */
    items: GanttChartItemType[];
    /** The menu items that appear when the user clicks on the more button on the row's title cell */
    contextMenuItems?: GanttChartContextMenuItem[];
    subItems?: GanttChartAuxiliaryItemType[];
    supItems?: GanttChartAuxiliaryItemType[];
    colorIndicator?: string;
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
    data: GanttChartRowType[];
    dataTitle: string;
    columnTitles: GanttChartColumnTitle[];
    columnGroups?: GanttChartColumnGroup[];
    initialFilter?: "All" | "Full" | "Empty";
    onDragReorder?: (newData: GanttChartRowType[]) => void;
    itemResize?: {
        allowOverlap?: boolean;
        integerIncrementation?: boolean;
        onItemResized: (row: GanttChartRowType, item: GanttChartItemType) => Promise<void | boolean>;
    };
}): JSX.Element;
