import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Materail UI
import SelectedIcon from '@mui/icons-material/RadioButtonChecked';
import UnSelectedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AllIcon from '@mui/icons-material/TonalityRounded';
// Vieolo UI
import ContextMenu from '../ContextMenu';
import RadioGroup from '../RadioGroup';
// Typography
import Typography from '../Typography';
// Installed Packages
import { toFixed } from '@vieolo/parsers/number_parsers';
export default function GanttChart(props) {
    let [filter, setFilter] = useState(props.initialFilter || "All");
    let [draggedRow, setDraggedRow] = useState(null);
    let [contextMenuItem, setContextMenuItem] = useState(undefined);
    let [contextMenuRow, setContextMenuRow] = useState(undefined);
    let [contextMenuPosition, setContextMenuPosition] = useState(null);
    let [resizeItem, setResizeItem] = useState(null);
    let finalData = [];
    // Checking the overlap of the items
    for (let i = 0; i < props.data.length; i++) {
        const row = props.data[i];
        if (filter === 'Full' && row.items.filter(r => !r.ignoredInFilter).length === 0)
            continue;
        if (filter === 'Empty' && row.items.filter(r => !r.ignoredInFilter).length > 0)
            continue;
        if (doItemsOverlap(row)) {
            finalData.push(...splitData(row));
        }
        else {
            finalData.push(row);
        }
    }
    let chartHeight = (Object.keys(finalData).length + 1) * 45;
    let colWidth = `calc(${100 / props.columnTitles.length}% - ${100 / props.columnTitles.length}px)`;
    if (props.columnGroups)
        chartHeight += 20;
    function handleRowReorderDrop(newValue, position) {
        // Cancelling the drop if the drop was not meant to happen
        if (props.onDragReorder === undefined)
            return;
        if (draggedRow === null)
            return;
        // The data is iterated
        // The row that was dragged is found and simultanously removed the the new data (will be added down below)
        // The rows that have no title (those that have been splitted because they had overlapping items) are also taken out
        let draggedRowData;
        let newData = [];
        for (let i = 0; i < props.data.length; i++) {
            const d = props.data[i];
            if (d.value.split("___")[0] === draggedRow.split("___")[0]) {
                draggedRowData = d;
            }
            else if (d.title.trim()) {
                newData.push(d);
            }
        }
        // If the dragged row is not found (for any reason) the drop is cancelled
        if (draggedRowData === undefined)
            return;
        // Finding the new index of the dropzone
        // The new index is different than the old index since the dragged row is removed, changing the index of items
        let newIndex = newData.findIndex(d => d.value.split("___")[0] === newValue.split("___")[0]);
        newIndex += position === 'top' ? 0 : 1;
        // Adding back the dragged row at the drop index
        newData.splice(Math.max(newIndex, 0), 0, draggedRowData);
        props.onDragReorder(newData);
        setDraggedRow(null);
    }
    function handleItemResizeStart(el, direction, cor, item, row) {
        setResizeItem({ el: el, direction: direction, cor: cor, item: item, row: row });
    }
    async function handleItemResizeEnd() {
        var _a, _b, _c, _d, _e, _f;
        if (!resizeItem)
            return;
        let maxValue = props.columnTitles.length;
        let [l, r, w] = getParentPos(resizeItem.el);
        if ((_a = props.itemResize) === null || _a === void 0 ? void 0 : _a.integerIncrementation) {
            let intChange = 1 / maxValue;
            if (resizeItem.direction === 'right') {
                w = w + ((intChange - (w % intChange)) / 100);
                r = r + (intChange - (r % intChange));
            }
            else {
                w = w - (((w % intChange)) / 100);
                l = l - ((l % intChange));
            }
        }
        let finalPos = {
            left: resizeItem.direction === 'right' ? resizeItem.item.from : +toFixed(maxValue * l, ((_b = props.itemResize) === null || _b === void 0 ? void 0 : _b.integerIncrementation) ? 0 : 6),
            right: resizeItem.direction === 'left' ? resizeItem.item.to : +toFixed(maxValue * r, ((_c = props.itemResize) === null || _c === void 0 ? void 0 : _c.integerIncrementation) ? 0 : 6),
            width: +toFixed(maxValue * w, ((_d = props.itemResize) === null || _d === void 0 ? void 0 : _d.integerIncrementation) ? 0 : 6)
        };
        if (!((_e = props.itemResize) === null || _e === void 0 ? void 0 : _e.allowOverlap)) {
            let hasOverlap = false;
            for (let i = 0; i < resizeItem.row.items.length; i++) {
                const item = resizeItem.row.items[i];
                if (item.id === resizeItem.item.id)
                    continue;
                if (doPeriodsOverlap(item.from, item.to, finalPos.left, finalPos.right)) {
                    hasOverlap = true;
                    break;
                }
            }
            if (hasOverlap) {
                resizeItem.el.style.left = `${resizeItem.cor.leftPerc}%`;
                resizeItem.el.style.right = `${resizeItem.cor.rightPerc}%`;
                resizeItem.el.style.width = `${resizeItem.cor.widthPerc}%`;
                setResizeItem(null);
                return;
            }
        }
        let response = await ((_f = props.itemResize) === null || _f === void 0 ? void 0 : _f.onItemResized({ ...resizeItem.row, value: resizeItem.row.value.split("___")[0] }, { ...resizeItem.item, from: finalPos.left, to: finalPos.right }));
        if (response === true || response === undefined) {
            setResizeItem(null);
        }
        else {
            resizeItem.el.style.left = `${resizeItem.cor.leftPerc}%`;
            resizeItem.el.style.right = `${resizeItem.cor.rightPerc}%`;
            resizeItem.el.style.width = `${resizeItem.cor.widthPerc}%`;
            setResizeItem(null);
        }
    }
    function handleItemResize(e) {
        if (!resizeItem)
            return;
        if (resizeItem.direction === 'right') {
            let newWidth = resizeItem.cor.width + (e.pageX - resizeItem.cor.right);
            let changeInWidth = ((newWidth - resizeItem.cor.width) / resizeItem.cor.width);
            let right = resizeItem.cor.rightPerc + (resizeItem.cor.widthPerc * changeInWidth);
            resizeItem.el.style.right = `${right}%`;
            resizeItem.el.style.width = `${resizeItem.cor.widthPerc + (resizeItem.cor.widthPerc * changeInWidth)}%`;
        }
        else {
            let newWidth = resizeItem.cor.width + (resizeItem.cor.left - (e.pageX));
            let changeInWidth = ((newWidth - resizeItem.cor.width) / resizeItem.cor.width);
            let left = resizeItem.cor.leftPerc - ((resizeItem.cor.widthPerc * changeInWidth));
            resizeItem.el.style.width = `${resizeItem.cor.widthPerc + (resizeItem.cor.widthPerc * changeInWidth)}%`;
            resizeItem.el.style.left = `${left}%`;
        }
    }
    return _jsxs("div", Object.assign({ className: "vieolo-gantt-chart", style: { height: chartHeight + 'px' } }, { children: [_jsxs("div", Object.assign({ className: "vieolo-gantt-chart__base" }, { children: [_jsx("div", Object.assign({ className: "vieolo-gantt-chart__base__item-column" }, { children: _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__base__item-column__item-title", style: { height: props.columnGroups ? '65px' : '45px' } }, { children: [_jsx(Typography, { text: props.dataTitle }, void 0),
                                _jsx(RadioGroup, { horizontalButtonPadding: 7, onOptionChange: v => setFilter(v), options: [
                                        { button: _jsx(AllIcon, {}, void 0), id: 'All' },
                                        { button: _jsx(SelectedIcon, {}, void 0), id: 'Full' },
                                        { button: _jsx(UnSelectedIcon, {}, void 0), id: 'Empty' },
                                    ], value: filter }, void 0)] }), void 0) }), void 0),
                    props.columnTitles.map((t, i) => {
                        return _jsx("div", Object.assign({ className: "vieolo-gantt-chart__base__data-column", style: { width: colWidth } }, { children: _jsxs("div", Object.assign({ className: `vieolo-gantt-chart__base__data-column__title-container${t.onClick ? ' clickable' : ''}`, style: { paddingBottom: props.columnGroups ? '0px' : '0', height: props.columnGroups ? '45px' : '45px', width: "100%" }, onClick: () => {
                                    if (t.onClick)
                                        t.onClick();
                                } }, { children: [_jsx(Typography, { text: t.title }, void 0),
                                    t.subtitle &&
                                        _jsx(Typography, { type: 'caption-medium', text: t.subtitle }, void 0)] }), void 0) }), `${t}_${i}`);
                    })] }), void 0),
            props.columnGroups &&
                _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__group-div" }, { children: [_jsx("div", { className: "vieolo-gantt-chart__group-div__item-column" }, void 0),
                        _jsx("div", Object.assign({ className: "vieolo-gantt-chart__group-div__group-column" }, { children: props.columnGroups.map((g, i) => {
                                let left = (g.start / props.columnTitles.length) * 100;
                                let width = ((g.end - g.start) / props.columnTitles.length) * 100;
                                let right = (g.end / props.columnTitles.length) * 100;
                                let style = { left: `${left}%`, width: `${width}%`, right: `${right}%` };
                                return _jsx("div", Object.assign({ className: 'vieolo-gantt-chart__group-div__group-column__group-bar', style: style }, { children: _jsx(Typography, { text: g.title }, void 0) }), `${g.title}_${i}`);
                            }) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "vieolo-gantt-chart__content-div", style: { top: props.columnGroups ? '65px' : '45px', maxHeight: chartHeight - (props.columnGroups ? 65 : 45) } }, { children: finalData.map((row, rowIndex) => {
                    let dataRow = row.items;
                    let style = {};
                    if (row.colorIndicator) {
                        style.borderLeft = `2px solid ${row.colorIndicator}`;
                        style.marginLeft = '-2px';
                    }
                    return _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__content-div__row", style: style }, { children: [(row.title.trim() && props.onDragReorder && draggedRow) &&
                                _jsx(GanttRowDropZone, { position: 'top', onDrop: e => {
                                        if (draggedRow !== row.value)
                                            handleRowReorderDrop(row.value, 'top');
                                    } }, void 0),
                            _jsxs("div", Object.assign({ className: `vieolo-gantt-chart__content-div__row__item-column ${(row.contextMenuItems && row.contextMenuItems.length > 0) ? " clickable" : ""}`, draggable: (props.onDragReorder && row.title.trim()) ? true : false, onDragStart: e => {
                                    setDraggedRow(row.value);
                                    e.currentTarget.style.backgroundColor = "#f2f2f2";
                                }, onDragEnd: e => {
                                    setDraggedRow(null);
                                    e.currentTarget.style.removeProperty('background-color');
                                }, onClick: e => {
                                    if (row.contextMenuItems && row.contextMenuItems.length > 0) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setContextMenuItem(undefined);
                                        setContextMenuRow(row);
                                        setContextMenuPosition({ x: e.pageX, y: e.pageY });
                                    }
                                } }, { children: [_jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__item-column__title", title: row.title }, { children: row.title }), void 0),
                                    row.subtitle &&
                                        _jsx(Typography, { type: 'paragraph-small', text: row.subtitle, showTitle: true }, void 0)] }), row.value + " col title"),
                            _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column", onDragOver: !resizeItem ? undefined : handleItemResize }, { children: [row.supItems &&
                                        row.supItems.map((s, z) => {
                                            let supLeft = (s.from / props.columnTitles.length) * 100;
                                            let supWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                            let supRight = (s.to / props.columnTitles.length) * 100;
                                            return _jsx("div", { title: s.title, className: "vieolo-gantt-chart__content-div__row__bar-column__sup-item-bar", style: { left: `${supLeft}%`, width: `${supWidth}%`, right: `${supRight}%` }, "aria-label": `${row.title} ${(s.ariaLabel || "sup-item") + ' ' + z.toString()}` }, `${row.value} ${s.id} supitem ${s.from}_${s.to}_${z}`);
                                        }),
                                    dataRow.map((d, i) => {
                                        let finalStart = d.from;
                                        let finalEnd = d.to;
                                        let className = `vieolo-gantt-chart__content-div__row__bar-column__bar`;
                                        if (!d.color)
                                            className += ` vieolo-gantt-chart__content-div__row__bar-column__bar__bar-primary`;
                                        else if (typeof d.color === 'string')
                                            className += ` vieolo-gantt-chart__content-div__row__bar-column__bar--${d.color || 'primary'}`;
                                        if (d.disabled)
                                            className += ' disabled';
                                        if (finalStart < 0) {
                                            finalStart = 0;
                                            className += ' vieolo-gantt-chart__content-div__row__bar-column__bar__bar-start';
                                        }
                                        if (finalEnd > props.columnTitles.length) {
                                            finalEnd = props.columnTitles.length;
                                            className += ' vieolo-gantt-chart__content-div__row__bar-column__bar__bar-end';
                                        }
                                        if (d.subtitle) {
                                            className += ' vieolo-gantt-chart__content-div__row__bar-column__bar-subtitle';
                                        }
                                        let left = (finalStart / props.columnTitles.length) * 100;
                                        let width = ((finalEnd - finalStart) / props.columnTitles.length) * 100;
                                        let right = (finalEnd / props.columnTitles.length) * 100;
                                        let style = { left: `${left}%`, width: `${width}%`, right: `${right}%`, cursor: d.onClick ? 'pointer' : 'normal' };
                                        if (d.color && typeof d.color !== 'string') {
                                            style.borderColor = d.color.border;
                                            style.backgroundColor = d.color.background;
                                            style.color = d.color.text;
                                        }
                                        return _jsxs("div", Object.assign({ "aria-label": `${row.title} ${d.ariaLabel || (d.title || "item") + ' ' + i.toString()}`, className: className, style: style, onClick: (e) => {
                                                let hasContextMenu = d.contextMenuItems && d.contextMenuItems.length > 0;
                                                let isTouchEvent = e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'touch';
                                                let isTouchOnlyDevice = "ontouchstart" in window && window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;
                                                if (hasContextMenu && (isTouchEvent || isTouchOnlyDevice)) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setContextMenuItem(d);
                                                    setContextMenuRow(row);
                                                    setContextMenuPosition({ x: e.pageX, y: e.pageY });
                                                }
                                                else {
                                                    if (d.onClick)
                                                        d.onClick(d);
                                                }
                                            }, onContextMenu: e => {
                                                if (d.contextMenuItems && d.contextMenuItems.length > 0) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setContextMenuItem(d);
                                                    setContextMenuRow(row);
                                                    setContextMenuPosition({ x: e.pageX, y: e.pageY });
                                                }
                                            } }, { children: [props.itemResize &&
                                                    _jsx(GanttItemResizeHandle, { position: 'left', onDragStart: (el, cor) => handleItemResizeStart(el, 'left', cor, d, row), onDragEnd: handleItemResizeEnd }, void 0),
                                                (d.title || d.icon) &&
                                                    _jsxs("div", Object.assign({ className: 'center-by-flex-row' }, { children: [d.icon && d.icon,
                                                            d.title &&
                                                                _jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column__bar__row-title", title: d.title }, { children: d.title }), void 0)] }), void 0),
                                                d.subtitle &&
                                                    _jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column__bar__row-subtitle", title: d.subtitle }, { children: d.subtitle }), void 0),
                                                props.itemResize &&
                                                    _jsx(GanttItemResizeHandle, { position: 'right', onDragStart: (el, cor) => handleItemResizeStart(el, 'right', cor, d, row), onDragEnd: handleItemResizeEnd }, void 0)] }), `${i}__${d.title || "no_title"}_${d.from}_${d.to}`);
                                    }),
                                    row.subItems &&
                                        row.subItems.map((s, z) => {
                                            let subLeft = (s.from / props.columnTitles.length) * 100;
                                            let subWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                            let subRight = (s.to / props.columnTitles.length) * 100;
                                            return _jsx("div", { title: s.title, className: "vieolo-gantt-chart__content-div__row__bar-column__sub-item-bar", style: { left: `${subLeft}%`, width: `${subWidth}%`, right: `${subRight}%` }, "aria-label": `${row.title} ${(s.ariaLabel || "sub-item") + ' ' + z.toString()}` }, `${row.value} ${s.id} subitem ${s.from}_${s.to}_${z}`);
                                        })] }), void 0),
                            (row.title.trim() && props.onDragReorder && draggedRow) &&
                                _jsx(GanttRowDropZone, { position: 'bottom', onDrop: e => {
                                        if (draggedRow !== row.value)
                                            handleRowReorderDrop(row.value, 'bottom');
                                    } }, void 0)] }), row.value);
                }) }), void 0),
            (contextMenuRow && contextMenuPosition) &&
                _jsx(ContextMenu, { position: contextMenuPosition, items: (contextMenuItem || contextMenuRow).contextMenuItems.map(c => {
                        return {
                            title: c.title,
                            icon: c.icon,
                            color: c.color,
                            onClick: v => { c.onClick(contextMenuRow, contextMenuItem); },
                            disabled: c.disabled
                        };
                    }), onClose: () => {
                        setContextMenuRow(undefined);
                        setContextMenuItem(undefined);
                        setContextMenuPosition(null);
                    } }, `${contextMenuPosition.x}_${contextMenuPosition.y}`)] }), void 0);
}
/**
 * Checks whether the items of the data overlap each other not. This function only checks the overlap
 * @param data The data containing the items
 */
function doItemsOverlap(data) {
    let occupancies = [];
    let overlap = false;
    for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        if (overlap)
            break;
        for (let z = 0; z < Object.values(occupancies).length; z++) {
            const oc = Object.values(occupancies)[z];
            if (doPeriodsOverlap(oc.from, oc.to, item.from, item.to)) {
                overlap = true;
                break;
            }
        }
        occupancies.push({ from: item.from, to: item.to });
    }
    return overlap;
}
/**
 * Checks whether the start and end indices of the data intersects with the occupied indices. This function only checks the overlap
 * @param array The array of ranges of occupied slots
 * @param rangeStart The start index of the item
 * @param rangeEnd The end index of the item
 */
function doesIntersect(array, rangeStart, rangeEnd) {
    let intersects = false;
    for (let i = 0; i < array.length; i++) {
        const oc = array[i];
        if (doPeriodsOverlap(oc.from, oc.to, rangeStart, rangeEnd)) {
            intersects = true;
            break;
        }
    }
    return intersects;
}
/**
 * If the items of the data have any overlap (checked before calling this function), the items are splitted and distributed among new lines.
 * Every new line will be represented by a new GanttChartDataType. The new data object is similar to the original, except it does not have any title and subtitle.
 * @param data The original data
 * @returns An array of the GanttChartDataType, with the items splitted between them
 */
function splitData(data) {
    let d = { ...data };
    // The first item is the original row
    let rowData = [];
    // The ranges that every row occupy
    // If the new item overlaps with an existing range, it has to be tried with the new row
    let rowsRanges = [];
    for (let i = 0; i < d.items.length; i++) {
        const item = d.items[i];
        let added = false;
        for (let z = 0; z < Object.values(rowsRanges).length; z++) {
            // The ranges already occupied in this row
            const thisRowRange = Object.values(rowsRanges)[z];
            if (doesIntersect(thisRowRange, item.from, item.to))
                continue;
            thisRowRange.push({ from: item.from, to: item.to });
            rowData[z].items.push(item);
            added = true;
            break;
        }
        if (!added) {
            rowsRanges.push([{ from: item.from, to: item.to }]);
            rowData.push({
                ...data,
                value: data.value + '___' + i,
                title: i === 0 ? data.title : '',
                subtitle: i === 0 ? data.subtitle : '',
                items: [item],
                contextMenuItems: i === 0 ? data.contextMenuItems : undefined,
                supItems: i === 0 ? data.supItems : undefined,
                subItems: i === 0 ? data.subItems : undefined,
            });
        }
    }
    return rowData;
}
function GanttRowDropZone(props) {
    return _jsx("div", { className: `vieolo-gantt-chart__content-div__drop-zone vieolo-gantt-chart__content-div__drop-zone--${props.position}`, onDrop: e => {
            props.onDrop(e);
            e.currentTarget.style.backgroundColor = 'transparent';
        }, onDragOver: (e) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = '#777';
        }, onDragLeave: e => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = 'transparent';
        } }, void 0);
}
function GanttItemResizeHandle(props) {
    function getInitialPos(e) {
        return {
            leftPerc: +e.currentTarget.parentElement.style.left.replace("%", ""),
            rightPerc: +e.currentTarget.parentElement.style.right.replace("%", ""),
            width: e.currentTarget.parentElement.offsetWidth,
            widthPerc: +e.currentTarget.parentElement.style.width.replace("%", ""),
            pageX: e.pageX,
            left: props.position === 'right'
                ? (e.pageX + e.currentTarget.offsetWidth) - e.currentTarget.parentElement.offsetWidth
                : e.pageX,
            right: props.position === 'right'
                ? (e.pageX + e.currentTarget.offsetWidth)
                : e.pageX + e.currentTarget.parentElement.offsetWidth
        };
    }
    return _jsx("div", { className: `vieolo-gantt-chart__content-div__row__bar-column__bar__resize vieolo-gantt-chart__content-div__row__bar-column__bar__resize--${props.position}`, draggable: true, onDragStart: e => {
            props.onDragStart(e.currentTarget.parentElement, getInitialPos(e));
        }, onDragEnd: e => {
            props.onDragEnd();
        } }, void 0);
}
function doPeriodsOverlap(oneStart, oneEnd, twoStart, twoEnd) {
    return (oneStart === twoStart ||
        oneEnd === twoEnd ||
        (oneStart > twoStart && oneStart < twoEnd) ||
        (oneEnd < twoEnd && oneEnd > twoStart) ||
        (oneStart < twoStart && oneEnd > twoEnd));
}
function getParentPos(parent) {
    return [
        parent.style.left, parent.style.right, parent.style.width
    ].map(z => +z.replace("%", "") / 100);
}
