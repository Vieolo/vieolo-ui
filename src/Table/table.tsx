// React
import React, { useState } from 'react';
import IconButton from '../IconButton';

// Vieolo UI
import Typography from '../Typography';
import Checkbox from '../CheckBox';

// Material UI
import LeftArrowIcon from '@mui/icons-material/ArrowLeft';
import RightArrowIcon from '@mui/icons-material/ArrowRight';
import ReorderIcon from '@mui/icons-material/DragHandleRounded';

// Types
import { TypographyOptionTypes } from '../types';

export type TableSortDirection = 'ascending' | 'descending';

export type TableRow = {
    id: string,
    items: React.ReactNode[],
    /** 
     * If a function is passed, the entire row will be clickable.
     * It is recommended to avoid using clickable components inside the row when making the row clickable
     */
    onClick?: () => void,
    /**
     * If the table is not checkable, this property is ignored
     */
    checked?: boolean,
    /**
     * If the table is not checkable, this property is ignored
     */
    onCheckChange?: () => void
}

export default function Table(props: {
    headers?: string[],
    /**
     * @deprecated The headers row is now optional, leaving which will result in absense of header row
     */
    removeHeaderRow?: boolean,
    rows: TableRow[],
    columnGrid: string,
    disableSort?: boolean,
    sortBy?: string,
    sortDirection?: TableSortDirection,
    /** The default direction that the new sort will take. Defaults to ascending */
    defaultDirection?: TableSortDirection,
    /**
     * To make this callback work, `sortBy` and `sortDirection` should be provided and
     * `disableSort` should also be falsy
     */
    onSortChange?: (sort: string, direction: TableSortDirection) => void,
    /**
     * If this callback is provided, the user is able to drag and reorder the rows of the list
     * Note that if column sorting is enables, the order does not work
     * This callback will provide table rows with their new order
     * The provider of the callback is responsible for updating the underlying data
     */
    onReorder?: (newOrder: TableRow[]) => void,
    width?: string,
    stickyHeader?: boolean,
    maxHeight?: string,
    /**
     * Converts the height of each row from 40px to 28px
     */
    isDense?: boolean,
    ariaLabel?: string,
    /**
     * If the max height prop is provided, the pagination will appear below the max height,
     * adding to the total height
     */
    pagination?: {
        pageNumber: number,
        hasNextPage: boolean,
        startIndex: number,
        endIndex: number,
        totalIndex?: number,
        pageItemCount: number,
        onPageChange: (newPage: number) => void,
        onPageItemCountChange?: (newCount: number) => void
    },
    /**
     * If true, all rows will have a checkbox in the start, allowing the user to check a row
     * A column of 30px will be added to the beginning of the column grid
     */
    isCheckable?: boolean,
    /**
     * The on change function of the checkbox in the header
     * User can check or uncheck all of the items at once
     */
    onCheckAll?: (allAreChecked: boolean) => void,
    type?: TypographyOptionTypes
}): JSX.Element {

    let [allChecked, setAllChecked] = useState<boolean>(false);

    let [draggedRow, setDraggedRow] = useState<{ id: string, index: number } | null>(null);

    let style: React.CSSProperties = {}
    let contentStyle: React.CSSProperties = {}

    if (props.width) {
        style.width = `${props.width}`;
    }

    if (props.maxHeight) {
        contentStyle.maxHeight = props.maxHeight;
        contentStyle.overflowY = 'scroll';
    }

    let columnGrid = props.columnGrid;
    if (props.isCheckable || props.onReorder) columnGrid = `30px ${columnGrid}`;

    return <div className={`vieolo-table ${props.removeHeaderRow ? 'vieolo-table--headless' : ''}`} style={style}>

        <div className="vieolo-table__content" style={contentStyle}>
            {
                (props.removeHeaderRow !== true || Array.isArray(props.headers)) &&
                <div className={`vieolo-table__header-row ${props.stickyHeader ? 'position--sticky--top-0' : ''}`} style={{ gridTemplateColumns: columnGrid }}>
                    {
                        props.isCheckable &&
                        <div className='center-by-flex-row'>
                            <Checkbox
                                onChange={(v) => {
                                    if (props.onCheckAll) props.onCheckAll(v);
                                    setAllChecked(v);
                                }}
                                value={allChecked}
                            />
                        </div>
                    }
                    {
                        (props.headers || []).map((h, i) => {
                            return <div
                                key={`table_header_row_${i}`}
                                className="vieolo-table__header-row__cell"
                                style={{ cursor: (props.disableSort || !props.sortBy || !props.onSortChange || !props.sortDirection) ? 'default' : 'pointer' }}
                                aria-label={`${props.ariaLabel || 'table'} header column ${h}`}
                                onClick={() => {
                                    if (!props.disableSort && props.onSortChange && props.sortBy && props.sortDirection) {
                                        props.onSortChange(h, props.sortBy === h ? props.sortDirection === 'ascending' ? 'descending' : 'ascending' : (props.defaultDirection || 'ascending'));
                                    }
                                }}
                            >
                                <Typography type={props.type} text={h} />
                                {
                                    (props.sortBy === h && !props.disableSort) &&
                                    <>
                                        {
                                            props.sortDirection === 'ascending'
                                                ? <p>&darr;</p>
                                                : <p>&uarr;</p>
                                        }
                                    </>
                                }
                            </div>
                        })
                    }
                </div>
            }

            <div className={(props.maxHeight && props.pagination) && "padding-bottom--40"}>
                {
                    props.rows.map((row, i) => {
                        let baseClass = 'vieolo-table__content-row'
                        let className = `${baseClass}`;
                        if (props.isDense) className += ` ${baseClass}--dense`
                        if (row.checked) className += ` ${baseClass}--checked`
                        if (row.onClick) className += ' clickable'

                        return <div
                            key={`table_row_${row.id}`}
                            className={className} style={{ gridTemplateColumns: columnGrid }}
                            aria-label={`${props.ariaLabel || 'table'} row ${row.id}`}
                            onClick={() => {
                                if (row.onClick) row.onClick();
                            }}
                            draggable={props.onReorder !== undefined}
                            onDragStart={e => setDraggedRow({ id: row.id, index: i })}
                            onDragEnd={e => {
                                setDraggedRow(null)
                            }}
                            onDragOver={e => e.preventDefault()}
                            onDrop={e => {
                                if (!draggedRow || draggedRow.id === row.id) return;
                                if (props.onReorder) props.onReorder(moveItem<TableRow>([...props.rows], draggedRow.index, i));
                            }}
                        >
                            {
                                props.isCheckable &&
                                <div className='center-by-flex-row'>
                                    <Checkbox
                                        onChange={(v) => {
                                            if (row.onCheckChange) {
                                                row.onCheckChange();
                                                setAllChecked(false);
                                            }
                                        }}
                                        value={row.checked || false}
                                    />
                                </div>
                            }
                            {
                                props.onReorder &&
                                <div
                                    className='center-by-flex-row cursor--move'
                                >
                                    <ReorderIcon />
                                </div>
                            }
                            {
                                row.items.map((r, z) => {
                                    return <div
                                        className="vieolo-table__content-row__cell"
                                        key={`table_row_${row.id}_${z}_div`}
                                        aria-label={`${props.ariaLabel || 'table'} cell ${row.id}_${z}`}
                                    >
                                        {
                                            typeof r === 'string'
                                                ? <Typography text={r} />
                                                : r
                                        }
                                    </div>
                                })
                            }
                        </div>
                    })
                }
            </div>
        </div>

        {
            props.pagination &&
            <div className={`vieolo-table__pagination-row ${props.maxHeight && 'position--sticky--bottom-0'}`}>
                <div className="width--px-150 flex flex--space-around flex--align-items-center">
                    <IconButton
                        icon={<LeftArrowIcon />}
                        onClick={() => props.pagination!.onPageChange(props.pagination!.pageNumber - 1)}
                        color='primary'
                        size='small'
                        disabled={props.pagination!.pageNumber === 1}
                        ariaLabel={`${props.ariaLabel || 'table'} pagination previous page`}
                    />

                    <div className="width--px-100 border-radius--half background-color--primary-normal padding-vertical--5 center-by-flex-row">
                        <Typography text={`${props.pagination.startIndex} - ${props.pagination.endIndex}`} className="color--primary-text" ariaLabel={`${props.ariaLabel || 'table'} page number`} />
                    </div>

                    <IconButton
                        icon={<RightArrowIcon />}
                        onClick={() => props.pagination!.onPageChange(props.pagination!.pageNumber + 1)}
                        color='primary'
                        size='small'
                        disabled={!props.pagination!.hasNextPage}
                        ariaLabel={`${props.ariaLabel || 'table'} pagination next page`}
                    />
                </div>
            </div>
        }
    </div>

}


function moveItem<T>(data: T[], from: number, to: number): T[] {
    // remove `from` item and store it
    var f = data.splice(from, 1)[0];
    // insert stored item into position `to`
    data.splice(to, 0, f);

    return data;
}