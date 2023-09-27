// React
import React, { useState } from 'react';
import TablePagination from '../TablePagination';

// Vieolo UI
import Typography from '../Typography';
import Checkbox from '../CheckBox';

// Material UI
import ReorderIcon from '@mui/icons-material/DragHandleRounded';

// Types
import { TypographyOptionTypes } from '../types';
import { TablePaginationType } from '../types/types';
import { useScreenSize } from '../hooks/useScreenSize';
import { getNextScreenSize } from '../utility/screen_utility';

export type TableSortDirection = 'ascending' | 'descending';

export type TableRow = {
    id: string | number,
    items: React.ReactNode[],
    /** The items to be displayed in lg (laptop) screen size and smaller */
    lg?: React.ReactNode[]
    /** The items to be displayed in md (tablet) screen size and smaller */
    md?: React.ReactNode[]
    /** The items to be displayed in sm (mobile) screen size */
    sm?: React.ReactNode[],
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

type TableGeneralProps = {
    headers?: string[] | React.ReactNode[],
    headerTypographyType?: TypographyOptionTypes,
    defaultTypographyType?: TypographyOptionTypes,
    columnGrid?: string,
}




export default function Table(props: TableGeneralProps & {
    /**
     * @deprecated The headers row is now optional, leaving which will result in absense of header row
     */
    removeHeaderRow?: boolean,
    headerTypographyType?: TypographyOptionTypes
    defaultTypographyType?: TypographyOptionTypes
    rows: TableRow[],
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
    /**
     * If you expect your table to be bigger than the width of certain (or all) screens, you can
     * make a few columns stick to the left when the user scrolls horizontally.
     */
    stickyColumnCount?: number,
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
    pagination?: TablePaginationType,
    /**
     * If true, all rows will have a checkbox in the start, allowing the user to check a row
     * A column of 30px will be added to the beginning of the column grid
     */
    isCheckable?: boolean,
    /**
     * The on change function of the checkbox in the header.
     * User can check or uncheck all of the items at once.
     * If this callback is omited, no checkbox will appear in the header
     */
    onCheckAll?: (allAreChecked: boolean) => void,
    columnGrid: string,
    lg?: TableGeneralProps,
    md?: TableGeneralProps,
    sm?: TableGeneralProps,
}): JSX.Element {

    let screensize = useScreenSize()

    function getScreenAwareProp<T extends keyof TableGeneralProps>(key: T): TableGeneralProps[T] {
        let currentSize = screensize;
        for (let i = 0; i < 4; i++) {
            if (currentSize === 'xl') {
                return props[key]
            }

            else if (props[currentSize] && props[currentSize]![key]) {
                return props[currentSize]![key]
            } else {
                currentSize = getNextScreenSize(currentSize)
            }
        }
        return props[key]
    }

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

    // Getting the screen aware props
    let columnGrid = getScreenAwareProp('columnGrid')!;
    let headers = getScreenAwareProp('headers');
    let defaultTypographyType = getScreenAwareProp('defaultTypographyType');
    let headerTypographyType = getScreenAwareProp('headerTypographyType');

    if (props.isCheckable || props.onReorder) columnGrid = `30px ${columnGrid}`;
    

    return <div key={screensize} className={`vieolo-table ${props.removeHeaderRow ? 'vieolo-table--headless' : ''}`} style={style}>

        <div className="vieolo-table__content" style={contentStyle}>
            {
                (props.removeHeaderRow !== true || Array.isArray(headers)) &&
                <div className={`vieolo-table__header-row ${props.stickyHeader ? 'position--sticky--top-0' : ''}`} style={{ gridTemplateColumns: columnGrid }}>
                    {
                        props.isCheckable &&
                        <>
                            {props.onCheckAll
                                ? <div className='center-by-flex-row'>
                                    <Checkbox
                                        onChange={(v) => {
                                            if (props.onCheckAll) props.onCheckAll(v);
                                            setAllChecked(v);
                                        }}
                                        value={allChecked}
                                    />
                                </div>
                                : <div></div>
                            }
                        </>

                    }
                    {
                        (headers || []).map((h: string | React.ReactNode, i) => {
                            let cellClassname = "vieolo-table__header-row__cell"
                            let left = 0
                            if (props.stickyColumnCount && i < props.stickyColumnCount) {
                                cellClassname += " vieolo-table__header-row__cell--sticky"

                                if (i === (props.stickyColumnCount - 1)) cellClassname += " vieolo-table__header-row__cell--sticky-last"

                                left = +columnGrid.split(" ").map(cg => cg.replace("px", "").replace("fr", ""))[i - 1]
                            }

                            return <div
                                key={`table_header_row_${i}`}
                                className={cellClassname}
                                style={{ cursor: (props.disableSort || !props.sortBy || !props.onSortChange || !props.sortDirection) ? 'default' : 'pointer', left: left || 0 }}
                                aria-label={`${props.ariaLabel || 'table'} header column ${h}`}
                                onClick={() => {
                                    if (!props.disableSort && props.onSortChange && props.sortBy && props.sortDirection && typeof h === 'string') {
                                        props.onSortChange(h, props.sortBy === h ? props.sortDirection === 'ascending' ? 'descending' : 'ascending' : (props.defaultDirection || 'ascending'));
                                    }
                                }}
                            >
                                {
                                    typeof h === 'string'
                                        ? <Typography type={headerTypographyType || "title-small"} text={h} />
                                        : <>
                                            {h}
                                        </>
                                }
                                {
                                    (props.sortBy === h && !props.disableSort && typeof h === 'string') &&
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
                        if (row.onClick) className += ` ${baseClass}--clickable`

                        let items = row.items;

                        let currentSize = screensize;
                        for (let i = 0; i < 4; i++) {
                            if (currentSize === 'xl') {
                                break;
                            } else if (row[currentSize]) {
                                items = row[currentSize]!;
                                break;
                            } else {
                                currentSize = getNextScreenSize(currentSize)
                            }
                        }
                        

                        return <div
                            key={`table_row_${row.id}`}
                            className={className} style={{ gridTemplateColumns: columnGrid }}
                            aria-label={`${props.ariaLabel || 'table'} row ${row.id}`}
                            onClick={() => {
                                if (row.onClick) row.onClick();
                            }}
                            draggable={props.onReorder !== undefined}
                            onDragStart={e => setDraggedRow({ id: row.id.toString(), index: i })}
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
                                items.map((r, z) => {
                                    let cellClassname = "vieolo-table__content-row__cell";
                                    let left = 0;
                                    if (props.stickyColumnCount && z < props.stickyColumnCount) {
                                        if (row.checked) cellClassname += " vieolo-table__content-row__cell--sticky-checked"
                                        else cellClassname += " vieolo-table__content-row__cell--sticky"

                                        if (z === (props.stickyColumnCount - 1)) cellClassname += " vieolo-table__content-row__cell--sticky-last"

                                        left = +columnGrid.split(" ").map(cg => cg.replace("px", "").replace("fr", ""))[z - 1]
                                    }

                                    return <div
                                        className={cellClassname}
                                        key={`table_row_${row.id}_${z}_div`}
                                        aria-label={`${props.ariaLabel || 'table'} cell ${row.id}_${z}`}
                                        style={{ left: left || 0 }}
                                    >
                                        {
                                            typeof r === 'string'
                                                ? <Typography text={r} type={defaultTypographyType || 'paragraph-medium'} />
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
            <div className="vieolo-table__pagination-row">
                <TablePagination
                    pagination={props.pagination}
                    ariaLabel={props.ariaLabel}
                    maxHeight={props.maxHeight}
                />
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