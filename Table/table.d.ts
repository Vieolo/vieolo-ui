import React from 'react';
import { TypographyOptionTypes } from '../types';
import { TablePaginationType } from '../types/types';
export type TableSortDirection = 'ascending' | 'descending';
export type TableRow = {
    id: string | number;
    items: React.ReactNode[];
    /** The items to be displayed in lg (laptop) screen size and smaller */
    lg?: React.ReactNode[];
    /** The items to be displayed in md (tablet) screen size and smaller */
    md?: React.ReactNode[];
    /** The items to be displayed in sm (mobile) screen size */
    sm?: React.ReactNode[];
    /**
     * If a function is passed, the entire row will be clickable.
     * It is recommended to avoid using clickable components inside the row when making the row clickable
     */
    onClick?: () => void;
    /**
     * If the table is not checkable, this property is ignored
     */
    checked?: boolean;
    /**
     * If the table is not checkable, this property is ignored
     */
    onCheckChange?: () => void;
};
type TableGeneralProps = {
    headers?: string[] | React.ReactNode[];
    headerTypographyType?: TypographyOptionTypes;
    defaultTypographyType?: TypographyOptionTypes;
    columnGrid?: string;
};
export default function Table(props: TableGeneralProps & {
    /**
     * @deprecated The headers row is now optional, leaving which will result in absense of header row
     */
    removeHeaderRow?: boolean;
    headerTypographyType?: TypographyOptionTypes;
    defaultTypographyType?: TypographyOptionTypes;
    rows: TableRow[];
    disableSort?: boolean;
    sortBy?: string;
    sortDirection?: TableSortDirection;
    /** The default direction that the new sort will take. Defaults to ascending */
    defaultDirection?: TableSortDirection;
    /**
     * To make this callback work, `sortBy` and `sortDirection` should be provided and
     * `disableSort` should also be falsy
     */
    onSortChange?: (sort: string, direction: TableSortDirection) => void;
    /**
     * If this callback is provided, the user is able to drag and reorder the rows of the list
     * Note that if column sorting is enables, the order does not work
     * This callback will provide table rows with their new order
     * The provider of the callback is responsible for updating the underlying data
     */
    onReorder?: (newOrder: TableRow[]) => void;
    width?: string;
    stickyHeader?: boolean;
    /**
     * If you expect your table to be bigger than the width of certain (or all) screens, you can
     * make a few columns stick to the left when the user scrolls horizontally.
     */
    stickyColumnCount?: number;
    maxHeight?: string;
    /**
     * Converts the height of each row from 40px to 28px
     */
    isDense?: boolean;
    ariaLabel?: string;
    /**
     * If the max height prop is provided, the pagination will appear below the max height,
     * adding to the total height
     */
    pagination?: TablePaginationType;
    /**
     * If true, all rows will have a checkbox in the start, allowing the user to check a row
     * A column of 30px will be added to the beginning of the column grid
     */
    isCheckable?: boolean;
    /**
     * The on change function of the checkbox in the header.
     * User can check or uncheck all of the items at once.
     * If this callback is omited, no checkbox will appear in the header
     */
    onCheckAll?: (allAreChecked: boolean) => void;
    columnGrid: string;
    lg?: TableGeneralProps;
    md?: TableGeneralProps;
    sm?: TableGeneralProps;
}): JSX.Element;
export {};
