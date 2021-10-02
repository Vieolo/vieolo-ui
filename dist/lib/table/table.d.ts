import React from 'react';
export declare type TableSortDirection = 'ascending' | 'descending';
export default function Table(props: {
    headers: string[];
    removeHeaderRow?: boolean;
    rows: React.ReactNode[][];
    columnGrid: string;
    disableSort: boolean;
    sortBy: string;
    sortDirection: TableSortDirection;
    /** The default direction that the new sort will take. Defaults to ascending */
    defaultDirection?: TableSortDirection;
    onSortChange: (sort: string, direction: TableSortDirection) => void;
    width?: string;
    /**
     * If a functin is passed, the entire row will be clickable.
     * It is recommended to avoid using clickable components inside the row when making the row clickable
     */
    onRowClick?: (index: number) => void;
}): JSX.Element;
