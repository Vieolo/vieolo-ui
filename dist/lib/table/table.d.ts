import React from 'react';
export declare type TableSortDirection = 'ascending' | 'descending';
export default function Table(props: {
    headers?: string[];
    /**
     * @deprecated The headers row is now optional, leaving which will result in absense of header row
     */
    removeHeaderRow?: boolean;
    rows: React.ReactNode[][];
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
    /**
     * If a functin is passed, the entire row will be clickable.
     * It is recommended to avoid using clickable components inside the row when making the row clickable
     */
    onRowClick?: (index: number) => void;
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
}): JSX.Element;
