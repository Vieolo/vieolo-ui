import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
import IconButton from '../IconButton';
// Vieolo UI
import Typography from '../Typography';
import Checkbox from '../CheckBox';
// Material UI
import LeftArrowIcon from '@mui/icons-material/ArrowLeft';
import RightArrowIcon from '@mui/icons-material/ArrowRight';
import ReorderIcon from '@mui/icons-material/DragHandleRounded';
export default function Table(props) {
    let [allChecked, setAllChecked] = useState(false);
    let [draggedRow, setDraggedRow] = useState(null);
    let style = {};
    let contentStyle = {};
    if (props.width) {
        style.width = `${props.width}`;
    }
    if (props.maxHeight) {
        contentStyle.maxHeight = props.maxHeight;
        contentStyle.overflowY = 'scroll';
    }
    let columnGrid = props.columnGrid;
    if (props.isCheckable || props.onReorder)
        columnGrid = `30px ${columnGrid}`;
    return _jsxs("div", { className: `vieolo-table ${props.removeHeaderRow ? 'vieolo-table--headless' : ''}`, style: style, children: [_jsxs("div", { className: "vieolo-table__content", style: contentStyle, children: [(props.removeHeaderRow !== true || Array.isArray(props.headers)) &&
                        _jsxs("div", { className: `vieolo-table__header-row ${props.stickyHeader ? 'position--sticky--top-0' : ''}`, style: { gridTemplateColumns: columnGrid }, children: [props.isCheckable &&
                                    _jsx("div", { className: 'center-by-flex-row', children: _jsx(Checkbox, { onChange: (v) => {
                                                if (props.onCheckAll)
                                                    props.onCheckAll(v);
                                                setAllChecked(v);
                                            }, value: allChecked }) }), (props.headers || []).map((h, i) => {
                                    return _jsxs("div", { className: "vieolo-table__header-row__cell", style: { cursor: (props.disableSort || !props.sortBy || !props.onSortChange || !props.sortDirection) ? 'default' : 'pointer' }, "aria-label": `${props.ariaLabel || 'table'} header column ${h}`, onClick: () => {
                                            if (!props.disableSort && props.onSortChange && props.sortBy && props.sortDirection && typeof h === 'string') {
                                                props.onSortChange(h, props.sortBy === h ? props.sortDirection === 'ascending' ? 'descending' : 'ascending' : (props.defaultDirection || 'ascending'));
                                            }
                                        }, children: [typeof h === 'string'
                                                ? _jsx(Typography, { type: props.headerTypographyType || "title-small", text: h })
                                                : _jsx(_Fragment, { children: h }), (props.sortBy === h && !props.disableSort && typeof h === 'string') &&
                                                _jsx(_Fragment, { children: props.sortDirection === 'ascending'
                                                        ? _jsx("p", { children: "\u2193" })
                                                        : _jsx("p", { children: "\u2191" }) })] }, `table_header_row_${i}`);
                                })] }), _jsx("div", { className: (props.maxHeight && props.pagination) && "padding-bottom--40", children: props.rows.map((row, i) => {
                            let baseClass = 'vieolo-table__content-row';
                            let className = `${baseClass}`;
                            if (props.isDense)
                                className += ` ${baseClass}--dense`;
                            if (row.checked)
                                className += ` ${baseClass}--checked`;
                            if (row.onClick)
                                className += ' clickable';
                            return _jsxs("div", { className: className, style: { gridTemplateColumns: columnGrid }, "aria-label": `${props.ariaLabel || 'table'} row ${row.id}`, onClick: () => {
                                    if (row.onClick)
                                        row.onClick();
                                }, draggable: props.onReorder !== undefined, onDragStart: e => setDraggedRow({ id: row.id, index: i }), onDragEnd: e => {
                                    setDraggedRow(null);
                                }, onDragOver: e => e.preventDefault(), onDrop: e => {
                                    if (!draggedRow || draggedRow.id === row.id)
                                        return;
                                    if (props.onReorder)
                                        props.onReorder(moveItem([...props.rows], draggedRow.index, i));
                                }, children: [props.isCheckable &&
                                        _jsx("div", { className: 'center-by-flex-row', children: _jsx(Checkbox, { onChange: (v) => {
                                                    if (row.onCheckChange) {
                                                        row.onCheckChange();
                                                        setAllChecked(false);
                                                    }
                                                }, value: row.checked || false }) }), props.onReorder &&
                                        _jsx("div", { className: 'center-by-flex-row cursor--move', children: _jsx(ReorderIcon, {}) }), row.items.map((r, z) => {
                                        return _jsx("div", { className: "vieolo-table__content-row__cell", "aria-label": `${props.ariaLabel || 'table'} cell ${row.id}_${z}`, children: typeof r === 'string'
                                                ? _jsx(Typography, { text: r })
                                                : r }, `table_row_${row.id}_${z}_div`);
                                    })] }, `table_row_${row.id}`);
                        }) })] }), props.pagination &&
                _jsx("div", { className: `vieolo-table__pagination-row ${props.maxHeight && 'position--sticky--bottom-0'}`, children: _jsxs("div", { className: "width--px-150 flex flex--space-around flex--align-items-center", children: [_jsx(IconButton, { icon: _jsx(LeftArrowIcon, {}), onClick: () => props.pagination.onPageChange(props.pagination.pageNumber - 1), color: 'primary', size: 'small', disabled: props.pagination.pageNumber === 1, ariaLabel: `${props.ariaLabel || 'table'} pagination previous page` }), _jsx("div", { className: "width--px-100 border-radius--half background-color--primary-normal padding-vertical--5 center-by-flex-row", children: _jsx(Typography, { text: `${props.pagination.startIndex} - ${props.pagination.endIndex}`, className: "color--primary-text", ariaLabel: `${props.ariaLabel || 'table'} page number` }) }), _jsx(IconButton, { icon: _jsx(RightArrowIcon, {}), onClick: () => props.pagination.onPageChange(props.pagination.pageNumber + 1), color: 'primary', size: 'small', disabled: !props.pagination.hasNextPage, ariaLabel: `${props.ariaLabel || 'table'} pagination next page` })] }) })] });
}
function moveItem(data, from, to) {
    // remove `from` item and store it
    var f = data.splice(from, 1)[0];
    // insert stored item into position `to`
    data.splice(to, 0, f);
    return data;
}
