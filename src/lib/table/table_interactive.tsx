// React
import React, { useState } from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyTitleSmall from '../typography/typography_title_small';

// Types
import { ColorOptionType } from '../private/types';


export type TableInteractiveCell = {
    id?: string,
    /** 
     * A string or a react node 
     * In order to make an overlay, pass a react node and give it a span
     */
    value: React.ReactNode | string,
    onClick?: (id?: string) => void,
    selectable?: boolean,
    span?: {
        direction: 'top' | 'bottom' | 'left' | 'right',
        span: number
    },
    numericalValue?: number,
    background?: ColorOptionType,    
}


export default function TableInteractive(props: {
    headers: (string | {name: string, formatter: (s: string | number) => string})[],
    headerSticky?: boolean,
    rows: TableInteractiveCell[][],
    selectedColor?: ColorOptionType
    columnGrid: string,
    width?: string,
    showBottomRow?: boolean,
    isDense?: boolean,
    columnSelectedTotalFormat?: {[column: number]: (total: number) => string}
}): JSX.Element {

    let [selectedCells, setSelectedCells] = useState<string[]>([]);
    let [numericTotal, setNumericTotal] = useState<number>(0);

    let style: React.CSSProperties = {}

    if (props.width) {
        style.width = `${props.width}`;
    }

    function toggleSelectCell(key: string, numbericValue: number, action: 'add' | 'remove-last' | 'reset' | 'only-entry') {
        switch (action) {
            case 'add':
                setSelectedCells([...selectedCells, key])
                setNumericTotal(numericTotal + numbericValue);
                break;
            case 'remove-last':
                setSelectedCells([...selectedCells].slice(0, -1))
                break;
            case 'reset': 
                setSelectedCells([]);
                setNumericTotal(0);
                break;
            case 'only-entry': 
                setSelectedCells([key]);
                setNumericTotal(numbericValue);
                break;
            default:
                break;
        }
    }

    let cellClass = `vieolo-table-interactive__cell vieolo-table-interactive__cell--height-${props.isDense ? 'small' : 'medium'}`

    return <div className="vieolo-table-interactive" style={style}>
        <div className={`vieolo-table-interactive__header-row ${props.headerSticky ? "position--sticky--top-0 z-index--3" : ""}`} style={{gridTemplateColumns: props.columnGrid}}>
            {
                props.headers.map(h => {
                    let s = typeof h === 'string' ? h : h.name;
                    return <div className={cellClass} key={s}>
                        <TypographyTitleSmall text={s} />
                    </div>
                })
            }
        </div>

        {
            props.rows.map((row, i) => {
                return <div className="vieolo-table-interactive__content-row" style={{gridTemplateColumns: props.columnGrid}} key={`row_${i}`}>
                    {
                        row.map((r, ri) => {
                            let k = `${i}_${ri}`;
                            let className = cellClass;
                            
                            if (r.onClick || r.selectable) {
                                className += ' cursor--pointer nonselectable vieolo-table-interactive__cell--hover';
                            }

                            if (selectedCells.includes(k)) {
                                className += ` background-color--${props.selectedColor || 'secondary'}-light`;
                            } else {
                                if (r.background) {
                                    className += ` background-color--${r.background}-light`;
                                } else {
                                    className += ` background-color--content-background`
                                }
                            }


                            let style: React.CSSProperties = {};

                            if (r.span) {
                                className += ' position--relative';

                                style.height = `calc(${r.span.span + 1}00% + ${r.span.span + 1}px)`;
                                style.position = 'absolute';
                                style.top = '0';
                                style.left = '0';
                                style.right = '0';
                                style.zIndex = 2;
                            }
                            
                            let finalNode = r.value;

                            // Getting the header
                            // If the header is a string, the value is diplayed unchanged.
                            // If the header contains the `formatter` function, the value of formatter function is displayed
                            let header = props.headers[ri];

                            if (typeof r.value === 'string' || typeof r.value === 'number') finalNode = <TypographyParagraphMedium text={typeof header === 'string' ? r.value.toString() : header.formatter( r.numericalValue || r.value)} />;
                            

                            return <div 
                                className={className}
                                key={k}
                                onClick={() => {
                                    if (r.onClick) r.onClick(r.id);
                                }}
                                onMouseDown={e => {
                                    if (r.selectable && r.numericalValue) {
                                        if (selectedCells.length === 0) toggleSelectCell(k, r.numericalValue, 'only-entry')
                                        else toggleSelectCell(k, r.numericalValue, 'reset')
                                    }                                    
                                }}
                                onMouseEnter={e => {                                    
                                    if (r.selectable && e.buttons && r.numericalValue) {                    
                                        if (selectedCells.includes(k)) toggleSelectCell(k, r.numericalValue, 'remove-last')
                                        else toggleSelectCell(k, r.numericalValue, 'add')
                                    }                                    
                                }}
                            >
                                {
                                    !r.span &&
                                    finalNode
                                }

                                {
                                    r.span &&
                                    <div style={style}>
                                        {finalNode}
                                    </div>
                                }
                            </div>
                        })
                    }
                </div>
            })
        }

        {
            props.showBottomRow &&
            <div className={`vieolo-table-interactive__bottom-row`}>
                {
                    (selectedCells.length > 0 && !isNaN(numericTotal)) &&
                    <TypographyParagraphSmall text={numericTotal.toString()} />
                }
            </div>
        }
    </div>

}