import React from 'react';
export declare type TableSortDirection = 'ascending' | 'descending';
export declare type TableRow = {
    id: string;
    items: React.ReactNode[];
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
export default function Table(props: {
    headers?: string[];
    /**
     * @deprecated The headers row is now optional, leaving which will result in absense of header row
     */
    removeHeaderRow?: boolean;
    rows: TableRow[];
    columnGrid: string;
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
    width?: string;
    stickyHeader?: boolean;
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
    pagination?: {
        pageNumber: number;
        hasNextPage: boolean;
        startIndex: number;
        endIndex: number;
        totalIndex?: number;
        pageItemCount: number;
        onPageChange: (newPage: number) => void;
        onPageItemCountChange?: (newCount: number) => void;
    };
    /**
     * If true, all rows will have a checkbox in the start, allowing the user to check a row
     * A column of 30px will be added to the beginning of the column grid
     */
    isCheckable?: boolean;
    /**
     * The on change function of the checkbox in the header
     * User can check or uncheck all of the items at once
     */
    onCheckAll?: (allAreChecked: boolean) => void;
}): JSX.Element;
