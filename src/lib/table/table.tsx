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
                    return <div className="vieolo-table__cell">
                        {
                            (props.sortBy === h && !props.disableSort) &&
                            <p>{props.sortDirection === 'ascending' ? "&darr;" : "&uarr;"}</p>
                        }
                        <TypographyTitleSmall text={h} />
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
                                className="vieolo-table__cell"
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