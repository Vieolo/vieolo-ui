import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Vieolo UI
import Flex from '../layout/flex/flex';
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyTitleSmall from '../typography/typography_title_small';
import { toFixedFloat } from '@vieolo/parsers';
import Input from '../form/input';
import IconButton from '../button/icon_button';
import { CloseIcon } from '../icons/icons';
export default function TableInteractive(props) {
    let [selectedCells, setSelectedCells] = useState([]);
    let [selectedCellColumn, setSelectedCellColumn] = useState(-1);
    let [numericTotal, setNumericTotal] = useState(0);
    let [editCellData, setEditCellData] = useState(null);
    let style = {};
    if (props.width) {
        style.width = `${props.width}`;
    }
    function toggleSelectCell(key, numbericValue, action, column) {
        switch (action) {
            case 'add':
                setSelectedCells([...selectedCells, key]);
                setNumericTotal(numericTotal + numbericValue);
                setSelectedCellColumn(column);
                break;
            case 'remove-last':
                setSelectedCells([...selectedCells].slice(0, -1));
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
    let cellClass = `vieolo-table-interactive__cell vieolo-table-interactive__cell--height-${props.isDense ? 'small' : 'medium'}`;
    return _jsxs("div", Object.assign({ className: "vieolo-table-interactive", style: style }, { children: [_jsx("div", Object.assign({ className: `vieolo-table-interactive__header-row ${props.headerSticky ? "position--sticky--top-0 z-index--3" : ""}`, style: { gridTemplateColumns: props.columnGrid } }, { children: props.headers.map(h => {
                    let s = typeof h === 'string' ? h : h.name;
                    return _jsx("div", Object.assign({ className: cellClass }, { children: _jsx(TypographyTitleSmall, { text: s }, void 0) }), s);
                }) }), void 0),
            props.rows.map((row, i) => {
                return _jsx("div", Object.assign({ className: "vieolo-table-interactive__content-row", style: { gridTemplateColumns: props.columnGrid } }, { children: row.map((r, ri) => {
                        let k = `${i}_${ri}`;
                        if (editCellData && editCellData.cellIndex === ri && editCellData.rowIndex === i) {
                            return _jsx(InputCell, { cellClass: cellClass, onChange: v => setEditCellData({ ...editCellData, newText: v }), onSubmit: () => {
                                    if (r.onTextEdit) {
                                        r.onTextEdit(editCellData.newText);
                                        setEditCellData(null);
                                    }
                                }, value: editCellData.newText, onCancel: () => setEditCellData(null) }, k + "_input_cell");
                        }
                        let className = cellClass;
                        if (r.onClick || r.selectable || r.onTextEdit) {
                            className += ' cursor--pointer nonselectable vieolo-table-interactive__cell--hover';
                        }
                        if (selectedCells.includes(k)) {
                            className += ` background-color--${props.selectedColor || 'secondary'}-light`;
                        }
                        else {
                            if (r.background) {
                                className += ` background-color--${r.background}-light`;
                            }
                            else {
                                className += ` background-color--content-background`;
                            }
                        }
                        let style = {};
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
                        if (typeof r.value === 'string' || typeof r.value === 'number')
                            finalNode = _jsx(TypographyParagraphMedium, { text: typeof header === 'string' ? r.value.toString() : header.formatter(r.numericalValue || r.value) }, void 0);
                        return _jsxs("div", Object.assign({ className: className, onClick: () => {
                                if (r.onClick)
                                    r.onClick(r.id);
                                else if (r.onTextEdit && typeof r.value === 'string') {
                                    setEditCellData({
                                        cellIndex: ri,
                                        rowIndex: i,
                                        initialText: r.value,
                                        newText: r.value
                                    });
                                }
                            }, onMouseDown: e => {
                                if (r.selectable && r.numericalValue) {
                                    if (selectedCells.length === 0)
                                        toggleSelectCell(k, r.numericalValue, 'only-entry', ri);
                                    else
                                        toggleSelectCell(k, r.numericalValue, 'reset', ri);
                                }
                            }, onMouseEnter: e => {
                                if (r.selectable && e.buttons && r.numericalValue) {
                                    if (selectedCells.includes(k))
                                        toggleSelectCell(k, r.numericalValue, 'remove-last', ri);
                                    else
                                        toggleSelectCell(k, r.numericalValue, 'add', ri);
                                }
                            } }, { children: [!r.span &&
                                    finalNode,
                                r.span &&
                                    _jsx("div", Object.assign({ style: style }, { children: finalNode }), void 0)] }), k);
                    }) }), `row_${i}`);
            }),
            props.showBottomRow &&
                _jsx(BottomRow, { header: props.headers[selectedCellColumn], numericTotal: numericTotal, selectedCells: selectedCells }, void 0)] }), void 0);
}
function BottomRow(props) {
    function format(v) {
        return typeof props.header === 'string' ? v.toString() : props.header.formatter(v);
    }
    let average = toFixedFloat(props.numericTotal / props.selectedCells.length, 2);
    return _jsx("div", Object.assign({ className: `vieolo-table-interactive__bottom-row` }, { children: (props.selectedCells.length > 0 && !isNaN(props.numericTotal) && props.header) &&
            _jsxs(Flex, Object.assign({ direction: 'row', alignItems: 'center', className: 'height--pc-100 padding-horizontal--one', justifyContent: 'space-between' }, { children: [_jsx(TypographyParagraphSmall, { text: `Count: ${props.selectedCells.length}`, fontWeight: 'bold' }, void 0),
                    _jsx(TypographyParagraphSmall, { text: `Average: ${format(average)}`, fontWeight: 'bold' }, void 0),
                    _jsx(TypographyParagraphSmall, { text: `Total: ${format(props.numericTotal)}`, fontWeight: 'bold' }, void 0)] }), void 0) }), void 0);
}
function InputCell(props) {
    return _jsx("div", Object.assign({ className: `${props.cellClass} ${props.cellClass.split(" ")[0] + "--input"}` }, { children: _jsx("form", Object.assign({ onSubmit: e => {
                e.preventDefault();
                e.stopPropagation();
                props.onSubmit();
            } }, { children: _jsxs(Flex, Object.assign({ alignItems: 'center', columnGap: 'half', justifyContent: 'space-between' }, { children: [_jsx(Input, { value: props.value, error: false, onChange: v => props.onChange(v), size: 'full', autoFocus: true, onKeyDown: e => {
                            if (e.key === 'Escape') {
                                props.onCancel();
                            }
                        } }, void 0),
                    _jsx(IconButton, { icon: _jsx(CloseIcon, {}, void 0), size: 'extra-small', color: 'error', emphasis: 'none', onClick: props.onCancel, type: 'button' }, void 0)] }), void 0) }), void 0) }), void 0);
}
