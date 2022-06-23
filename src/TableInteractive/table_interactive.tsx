// React
import React, { useState } from 'react';

// Vieolo UI
import Flex from '../Flex/flex';
import Typography from '../Typography';
import Input from '../Input/input';
import IconButton from '../IconButton';

// Icons
import { CloseIcon } from '../icons/icons';

// Types
import { ColorOptionType } from '../types/types';

// Installed Packages
import { toFixedFloat } from '@vieolo/parsers';


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
    onTextEdit?: (newValue: string) => void
}


type HeaderFormatter = (s: string | number) => string;

type EditCellData = {
    rowIndex: number,
    cellIndex: number,
    initialText: string,
    newText: string
}


export default function TableInteractive(props: {
    headers: (string | { name: string, formatter: HeaderFormatter })[],
    headerSticky?: boolean,
    rows: TableInteractiveCell[][],
    selectedColor?: ColorOptionType
    columnGrid: string,
    width?: string,
    showBottomRow?: boolean,
    isDense?: boolean,
}): JSX.Element {

    let [selectedCells, setSelectedCells] = useState<string[]>([]);
    let [selectedCellColumn, setSelectedCellColumn] = useState<number>(-1);
    let [numericTotal, setNumericTotal] = useState<number>(0);
    let [editCellData, setEditCellData] = useState<EditCellData | null>(null)

    let style: React.CSSProperties = {}

    if (props.width) {
        style.width = `${props.width}`;
    }

    function toggleSelectCell(key: string, numbericValue: number, action: 'add' | 'remove-last' | 'reset' | 'only-entry', column: number) {
        switch (action) {
            case 'add':
                setSelectedCells([...selectedCells, key])
                setNumericTotal(numericTotal + numbericValue);
                setSelectedCellColumn(column);
                break;
            case 'remove-last':
                setSelectedCells([...selectedCells].slice(0, -1))
                break;
            case 'reset':
                setSelectedCells([]);
                setNumericTotal(0);
                setSelectedCellColumn(-1);
                break;
            case 'only-entry':
                setSelectedCells([key]);
                setNumericTotal(numbericValue);
                setSelectedCellColumn(column);
                break;
            default:
                break;
        }
    }

    let cellClass = `vieolo-table-interactive__cell vieolo-table-interactive__cell--height-${props.isDense ? 'small' : 'medium'}`

    return <div className="vieolo-table-interactive" style={style}>
        <div className={`vieolo-table-interactive__header-row ${props.headerSticky ? "position--sticky--top-0 z-index--3" : ""}`} style={{ gridTemplateColumns: props.columnGrid }}>
            {
                props.headers.map(h => {
                    let s = typeof h === 'string' ? h : h.name;
                    return <div className={cellClass} key={s}>
                        <Typography type='title-small' text={s} />
                    </div>
                })
            }
        </div>

        {
            props.rows.map((row, i) => {
                return <div className="vieolo-table-interactive__content-row" style={{ gridTemplateColumns: props.columnGrid }} key={`row_${i}`} aria-label={`row ${i + 1}`}>
                    {
                        row.map((r, ri) => {
                            let k = `${i}_${ri}`;

                            if (editCellData && editCellData.cellIndex === ri && editCellData.rowIndex === i) {
                                return <InputCell
                                    cellClass={cellClass}
                                    onChange={v => setEditCellData({ ...editCellData as any, newText: v })}
                                    onSubmit={() => {
                                        if (r.onTextEdit) {
                                            r.onTextEdit(editCellData!.newText)
                                            setEditCellData(null)
                                        }
                                    }}
                                    value={editCellData.newText}
                                    key={k + "_input_cell"}
                                    onCancel={() => setEditCellData(null)}
                                />
                            }

                            let className = cellClass;

                            if (r.onClick || r.selectable || r.onTextEdit) {
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

                                style.height = r.span.span * (props.isDense ? 30 : 40 ) // `calc(${r.span.span + 1}00% + ${r.span.span + 1}px)`;
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

                            if (typeof r.value === 'string' || typeof r.value === 'number') finalNode = <Typography text={typeof header === 'string' ? r.value.toString() : header.formatter(r.numericalValue || r.value)} />;


                            return <div
                                className={className}
                                key={k}
                                onClick={() => {
                                    if (r.onClick) r.onClick(r.id);
                                    else if (r.onTextEdit && typeof r.value === 'string') {
                                        setEditCellData({
                                            cellIndex: ri,
                                            rowIndex: i,
                                            initialText: r.value,
                                            newText: r.value
                                        })
                                    }
                                }}
                                onMouseDown={e => {
                                    if (r.selectable && r.numericalValue !== undefined) {
                                        if (selectedCells.length === 0) toggleSelectCell(k, r.numericalValue, 'only-entry', ri)
                                        else toggleSelectCell(k, r.numericalValue, 'reset', ri)
                                    }
                                }}
                                onMouseEnter={e => {
                                    if (r.selectable && e.buttons && r.numericalValue !== undefined) {
                                        if (selectedCells.includes(k)) toggleSelectCell(k, r.numericalValue, 'remove-last', ri)
                                        else toggleSelectCell(k, r.numericalValue, 'add', ri)
                                    }
                                }}
                                aria-label={`row ${i + 1} cell ${ri + 1}`}
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
            <BottomRow
                header={props.headers[selectedCellColumn]}
                numericTotal={numericTotal}
                selectedCells={selectedCells}
            />
        }
    </div>

}


function BottomRow(props: {
    selectedCells: string[],
    header: string | { formatter: HeaderFormatter },
    numericTotal: number
}) {

    function format(v: string | number) {
        return typeof props.header === 'string' ? v.toString() : props.header.formatter(v)
    }

    let average = toFixedFloat(props.numericTotal / props.selectedCells.length, 2);

    return <div className={`vieolo-table-interactive__bottom-row`}>
        {
            (props.selectedCells.length > 0 && !isNaN(props.numericTotal) && props.header) &&
            <Flex direction='row' alignItems='center' className='height--pc-100 padding-horizontal--one' justifyContent='space-between'>
                <Typography type='paragraph-small' text={`Count: ${props.selectedCells.length}`} fontWeight='bold' />
                <Typography type='paragraph-small' text={`Average: ${format(average)}`} fontWeight='bold' />
                <Typography type='paragraph-small' text={`Total: ${format(props.numericTotal)}`} fontWeight='bold' />
            </Flex>

        }

    </div>
}


function InputCell(props: {
    value: string,
    onChange: (v: string) => void,
    onSubmit: () => void,
    cellClass: string,
    onCancel: () => void
}) {
    return <div className={`${props.cellClass} ${props.cellClass.split(" ")[0] + "--input"}`}>
        <form onSubmit={e => {
            e.preventDefault();
            e.stopPropagation();
            props.onSubmit();
        }}>
            <Flex alignItems='center' columnGap='half' justifyContent='space-between'>
                <Input
                    value={props.value}
                    error={false}
                    onChange={v => props.onChange(v)}
                    size='full'
                    autoFocus
                    onKeyDown={e => {
                        if (e.key === 'Escape') {
                            props.onCancel()
                        }
                    }}
                />
                <IconButton
                    icon={<CloseIcon />}
                    size={'extra-small'}
                    color={'error'}
                    emphasis={'none'}
                    onClick={props.onCancel}
                    type='button'
                />
            </Flex>
        </form>
    </div>
}