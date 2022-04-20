// React
import React, { useState } from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyBase from '../typography/typography_base';
import { ColorOptionType } from '../private/types';


export type TableInteractiveCell = {
    /** A string or a react node */
    value: React.ReactNode | string,
    onClick?: () => void,
    selectable?: boolean,
    span?: {
        direction: 'top' | 'bottom' | 'left' | 'right',
        span: number
    },
    numericalValue?: number,
    background?: ColorOptionType,    
}


export default function TableInteractive(props: {
    headers: string[],
    headerRemainInView?: boolean,
    headerSize?: 'large' | 'medium'
    rows: TableInteractiveCell[][],
    columnGrid: string,
    width?: string,
    showBottomRow?: boolean,
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

    return <div className="vieolo-table-interactive" style={style}>
        <div className={`vieolo-table-interactive__header-row ${props.headerRemainInView ? "position--sticky-0" : ""}`} style={{gridTemplateColumns: props.columnGrid}}>
            {
                props.headers.map(h => {
                    return <div className="vieolo-table-interactive__cell" key={h}>
                        <TypographyBase className={`typography-${(!props.headerSize || props.headerSize === 'large') ? 'title-small' : 'paragraph-medium'}`} text={h} />
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
                            let className = 'vieolo-table-interactive__cell';
                            if (r.onClick || r.selectable) {
                                className += ' cursor--pointer nonselectable';
                            }

                            if (r.background) {
                                className += ` background-color--${r.background}-light`;
                            } else {
                                className += ` background-color--content-background`
                            }

                            if (selectedCells.includes(k)) {
                                className += ' background--hover';
                            }

                            let style: React.CSSProperties = {};

                            if (r.span) {
                                className += ' position--relative';

                                style.height = (r.span.span + 1) * 40;
                                style.position = 'absolute';
                                style.top = '0';
                                style.left = '0';
                                style.right = '0';
                            }
                            
                            let finalNode = r.value;

                            if (typeof r.value === 'string') finalNode = <TypographyParagraphMedium text={r.value} />;
                            

                            return <div 
                                className={className}
                                key={k}
                                onClick={r.onClick}
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