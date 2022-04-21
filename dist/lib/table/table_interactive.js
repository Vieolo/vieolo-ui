import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyTitleSmall from '../typography/typography_title_small';
export default function TableInteractive(props) {
    let [selectedCells, setSelectedCells] = useState([]);
    let [numericTotal, setNumericTotal] = useState(0);
    let style = {};
    if (props.width) {
        style.width = `${props.width}`;
    }
    function toggleSelectCell(key, numbericValue, action) {
        switch (action) {
            case 'add':
                setSelectedCells([...selectedCells, key]);
                setNumericTotal(numericTotal + numbericValue);
                break;
            case 'remove-last':
                setSelectedCells([...selectedCells].slice(0, -1));
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
    let cellClass = `vieolo-table-interactive__cell vieolo-table-interactive__cell--height-${props.isDense ? 'small' : 'medium'}`;
    return _jsxs("div", Object.assign({ className: "vieolo-table-interactive", style: style }, { children: [_jsx("div", Object.assign({ className: `vieolo-table-interactive__header-row ${props.headerSticky ? "position--sticky--top-0" : ""}`, style: { gridTemplateColumns: props.columnGrid } }, { children: props.headers.map(h => {
                    let s = typeof h === 'string' ? h : h.name;
                    return _jsx("div", Object.assign({ className: cellClass }, { children: _jsx(TypographyTitleSmall, { text: s }, void 0) }), s);
                }) }), void 0),
            props.rows.map((row, i) => {
                return _jsx("div", Object.assign({ className: "vieolo-table-interactive__content-row", style: { gridTemplateColumns: props.columnGrid } }, { children: row.map((r, ri) => {
                        let k = `${i}_${ri}`;
                        let className = cellClass;
                        if (r.onClick || r.selectable) {
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
                            }, onMouseDown: e => {
                                if (r.selectable && r.numericalValue) {
                                    if (selectedCells.length === 0)
                                        toggleSelectCell(k, r.numericalValue, 'only-entry');
                                    else
                                        toggleSelectCell(k, r.numericalValue, 'reset');
                                }
                            }, onMouseEnter: e => {
                                if (r.selectable && e.buttons && r.numericalValue) {
                                    if (selectedCells.includes(k))
                                        toggleSelectCell(k, r.numericalValue, 'remove-last');
                                    else
                                        toggleSelectCell(k, r.numericalValue, 'add');
                                }
                            } }, { children: [!r.span &&
                                    finalNode,
                                r.span &&
                                    _jsx("div", Object.assign({ style: style }, { children: finalNode }), void 0)] }), k);
                    }) }), `row_${i}`);
            }),
            props.showBottomRow &&
                _jsx("div", Object.assign({ className: `vieolo-table-interactive__bottom-row` }, { children: (selectedCells.length > 0 && !isNaN(numericTotal)) &&
                        _jsx(TypographyParagraphSmall, { text: numericTotal.toString() }, void 0) }), void 0)] }), void 0);
}
