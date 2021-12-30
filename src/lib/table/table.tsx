// React
import React from 'react';
import IconButton from '../button/icon_button';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyTitleSmall from '../typography/typography_title_small';

// Material UI
import LeftArrowIcon from '@mui/icons-material/ArrowLeft';
import RightArrowIcon from '@mui/icons-material/ArrowRight';

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
    width?: string,
    stickyHeader?: boolean,
    maxHeight?: string,
    /**
     * Converts the height of each row from 40px to 28px
     */
    isDense?: boolean,    
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
    onCheckAll?: (allAreChecked: boolean) => void
}): JSX.Element {

    let style: React.CSSProperties = {}
    let contentStyle: React.CSSProperties = {}

    if (props.width) {
        style.width = `${props.width}`;
    }

    if (props.maxHeight) {
        contentStyle.maxHeight = props.maxHeight;
        contentStyle.overflowY = 'scroll';
    }

    return <div className={`vieolo-table ${props.removeHeaderRow ? 'vieolo-table--headless' : ''}`} style={style}>

        <div className="vieolo-table__content" style={contentStyle}>
            {
                (props.removeHeaderRow !== true || Array.isArray(props.headers)) &&
                <div className={`vieolo-table__header-row ${props.stickyHeader ? 'position--sticky--top-0' : ''}`} style={{ gridTemplateColumns: props.columnGrid }}>
                    {
                        (props.headers || []).map((h, i) => {
                            return <div
                                key={`table_header_row_${i}`}
                                className="vieolo-table__header-row__cell"
                                style={{ cursor: (props.disableSort || !props.sortBy || !props.onSortChange || !props.sortDirection) ? 'default' : 'pointer' }}
                                onClick={() => {
                                    if (!props.disableSort && props.onSortChange && props.sortBy && props.sortDirection) {
                                        props.onSortChange(h, props.sortBy === h ? props.sortDirection === 'ascending' ? 'descending' : 'ascending' : (props.defaultDirection || 'ascending'));
                                    }
                                }}
                            >
                                <TypographyTitleSmall text={h} />
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
                        let className = 'vieolo-table__content-row';
                        if (props.isDense) className += ` ${className}--dense`
                        if (row.onClick) className += ' clickable'
                        
                        return <div
                            key={`table_row_${i}`}
                            className={className} style={{ gridTemplateColumns: props.columnGrid }}
                            onClick={() => {
                                if (row.onClick) row.onClick();
                            }}
                        >
                            {
                                row.items.map((r, z) => {
                                    return <div
                                        className="vieolo-table__content-row__cell"
                                        key={`table_row_${i}_${z}_div`}
                                    >
                                        {
                                            typeof r === 'string'
                                                ? <TypographyParagraphMedium text={r} />
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
                    />

                    <div className="width--px-100 border-radius--half background-color--primary-normal padding-vertical--5 center-by-flex-row">
                        <TypographyParagraphMedium text={`${props.pagination.startIndex} - ${props.pagination.endIndex}`} className="color--primary-text" />
                    </div>

                    <IconButton
                        icon={<RightArrowIcon />}
                        onClick={() => props.pagination!.onPageChange(props.pagination!.pageNumber + 1)}
                        color='primary'
                        size='small'
                        disabled={!props.pagination!.hasNextPage}
                    />
                </div>
            </div>
        }
    </div>

}