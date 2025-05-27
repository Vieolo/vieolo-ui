import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
import TablePagination from '../TablePagination';
// Vieolo UI
import Typography from '../Typography';
import Checkbox from '../CheckBox';
// Material UI
import ReorderIcon from '@mui/icons-material/DragHandleRounded';
import { useScreenSize } from '../hooks/useScreenSize';
import { getNextScreenSize } from '../utility/screen_utility';
export default function Table(props) {
    let screensize = useScreenSize();
    function getScreenAwareProp(key) {
        let currentSize = screensize;
        for (let i = 0; i < 4; i++) {
            if (currentSize === 'xl') {
                return props[key];
            }
            else if (props[currentSize] && props[currentSize][key]) {
                return props[currentSize][key];
            }
            else {
                currentSize = getNextScreenSize(currentSize);
            }
        }
        return props[key];
    }
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
    // Getting the screen aware props
    let columnGrid = getScreenAwareProp('columnGrid');
    let headers = getScreenAwareProp('headers');
    let defaultTypographyType = getScreenAwareProp('defaultTypographyType');
    let headerTypographyType = getScreenAwareProp('headerTypographyType');
    if (props.isCheckable || props.onReorder)
        columnGrid = `30px ${columnGrid}`;
    return _jsxs("div", { className: `vieolo-table ${props.removeHeaderRow ? 'vieolo-table--headless' : ''}`, style: style, children: [_jsxs("div", { className: "vieolo-table__content", style: contentStyle, children: [(props.removeHeaderRow !== true || Array.isArray(headers)) &&
                        _jsxs("div", { className: `vieolo-table__header-row ${props.stickyHeader ? 'position--sticky--top-0' : ''}`, style: { gridTemplateColumns: columnGrid }, children: [props.isCheckable &&
                                    _jsx(_Fragment, { children: props.onCheckAll
                                            ? _jsx("div", { className: 'center-by-flex-row', children: _jsx(Checkbox, { onChange: (v) => {
                                                        if (props.onCheckAll)
                                                            props.onCheckAll(v);
                                                        setAllChecked(v);
                                                    }, value: allChecked }) })
                                            : _jsx("div", {}) }), (headers || []).map((h, i) => {
                                    let cellClassname = "vieolo-table__header-row__cell";
                                    let left = 0;
                                    if (props.stickyColumnCount && i < props.stickyColumnCount) {
                                        cellClassname += " vieolo-table__header-row__cell--sticky";
                                        if (i === (props.stickyColumnCount - 1))
                                            cellClassname += " vieolo-table__header-row__cell--sticky-last";
                                        left = +columnGrid.split(" ").map(cg => cg.replace("px", "").replace("fr", ""))[i - 1];
                                    }
                                    return _jsxs("div", { className: cellClassname, style: { cursor: (props.disableSort || !props.sortBy || !props.onSortChange || !props.sortDirection) ? 'default' : 'pointer', left: left || 0 }, "aria-label": `${props.ariaLabel || 'table'} header column ${h}`, onClick: () => {
                                            if (!props.disableSort && props.onSortChange && props.sortBy && props.sortDirection && typeof h === 'string') {
                                                props.onSortChange(h, props.sortBy === h ? props.sortDirection === 'ascending' ? 'descending' : 'ascending' : (props.defaultDirection || 'ascending'));
                                            }
                                        }, children: [typeof h === 'string'
                                                ? _jsx(Typography, { type: headerTypographyType || "title-small", text: h })
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
                                className += ` ${baseClass}--clickable`;
                            let items = row.items;
                            let currentSize = screensize;
                            for (let i = 0; i < 4; i++) {
                                if (currentSize === 'xl') {
                                    break;
                                }
                                else if (row[currentSize]) {
                                    items = row[currentSize];
                                    break;
                                }
                                else {
                                    currentSize = getNextScreenSize(currentSize);
                                }
                            }
                            return _jsxs("div", { className: className, style: { gridTemplateColumns: columnGrid }, "aria-label": `${props.ariaLabel || 'table'} row ${row.id}`, onClick: () => {
                                    if (row.onClick)
                                        row.onClick();
                                }, draggable: props.onReorder !== undefined, onDragStart: e => setDraggedRow({ id: row.id.toString(), index: i }), onDragEnd: e => {
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
                                        _jsx("div", { className: 'center-by-flex-row cursor--move', children: _jsx(ReorderIcon, {}) }), items.map((r, z) => {
                                        let cellClassname = "vieolo-table__content-row__cell";
                                        let left = 0;
                                        if (props.stickyColumnCount && z < props.stickyColumnCount) {
                                            if (row.checked)
                                                cellClassname += " vieolo-table__content-row__cell--sticky-checked";
                                            else
                                                cellClassname += " vieolo-table__content-row__cell--sticky";
                                            if (z === (props.stickyColumnCount - 1))
                                                cellClassname += " vieolo-table__content-row__cell--sticky-last";
                                            left = +columnGrid.split(" ").map(cg => cg.replace("px", "").replace("fr", ""))[z - 1];
                                        }
                                        return _jsx("div", { className: cellClassname, "aria-label": `${props.ariaLabel || 'table'} cell ${row.id}_${z}`, style: { left: left || 0 }, children: typeof r === 'string'
                                                ? _jsx(Typography, { text: r, type: defaultTypographyType || 'paragraph-medium' })
                                                : r }, `table_row_${row.id}_${z}_div`);
                                    })] }, `table_row_${row.id}`);
                        }) })] }), props.pagination &&
                _jsx("div", { className: "vieolo-table__pagination-row", children: _jsx(TablePagination, { pagination: props.pagination, ariaLabel: props.ariaLabel, maxHeight: props.maxHeight }) })] }, screensize);
}
function moveItem(data, from, to) {
    // remove `from` item and store it
    var f = data.splice(from, 1)[0];
    // insert stored item into position `to`
    data.splice(to, 0, f);
    return data;
}
