// React
import React  from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyTitleSmall from '../typography/typography_title_small';


export type TableSortDirection = 'ascending' | 'descending';

export default function Table(props: {
    headers: string[],
    rows: React.ReactNode[][],
    columnGrid: string,
    disableSort: boolean,
    sortBy: string,
    sortDirection: TableSortDirection,
    /** The default direction that the new sort will take. Defaults to ascending */
    defaultDirection?: TableSortDirection,
    onSortChange: (sort: string, direction: TableSortDirection) => void,
    width?: string
}): JSX.Element {

    let style: React.CSSProperties = {}

    if (props.width) {
        style.width = `${props.width}`;
    }

    return <div className="vieolo-table" style={style}>
        <div className="vieolo-table__header-row" style={{gridTemplateColumns: props.columnGrid}}>
            {
                props.headers.map(h => {
                    return <div 
                        className="vieolo-table__header-row__cell" 
                        style={{cursor: props.disableSort ? 'default' : 'pointer'}}
                        onClick={() => {
                            if (!props.disableSort) {
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

        {
            props.rows.map(row => {
                return <div className="vieolo-table__content-row" style={{gridTemplateColumns: props.columnGrid}}>
                    {
                        row.map(r => {
                            return <div 
                                className="vieolo-table__content-row__cell"
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

}