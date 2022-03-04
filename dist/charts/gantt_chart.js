import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { Fragment, useState } from 'react';
// Materail UI
import SelectedIcon from '@mui/icons-material/RadioButtonChecked';
import UnSelectedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AllIcon from '@mui/icons-material/TonalityRounded';
// Vieolo UI
import ContextMenu from '../lib/menu/context_menu';
import RadioGroup from '../lib/form/radio_group';
// Typography
import TypographyParagraphMedium from '../lib/typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../lib/typography/typography_paragraph_small';
import TypographyCaptionMedium from '../lib/typography/typography_caption_medium';
export default function GanttChart(props) {
    let [filter, setFilter] = useState(props.initialFilter || "All");
    let [draggedRow, setDraggedRow] = useState(null);
    let [contextMenuItem, setContextMenuItem] = useState(undefined);
    let [contextMenuRow, setContextMenuRow] = useState(undefined);
    let [contextMenuPosition, setContextMenuPosition] = useState(null);
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
    function handleDrop(newValue, position) {
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
    return _jsxs("div", Object.assign({ className: "vieolo-gantt-chart", style: { height: chartHeight + 'px' } }, { children: [_jsxs("div", Object.assign({ className: "vieolo-gantt-chart__base" }, { children: [_jsx("div", Object.assign({ className: "vieolo-gantt-chart__base__item-column" }, { children: _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__base__item-column__item-title", style: { height: props.columnGroups ? '65px' : '45px' } }, { children: [_jsx(TypographyParagraphMedium, { text: props.dataTitle }, void 0),
                                _jsx(RadioGroup, { horizontalButtonPadding: 7, onOptionChange: v => setFilter(v), options: [
                                        { button: _jsx(AllIcon, {}, void 0), id: 'All' },
                                        { button: _jsx(SelectedIcon, {}, void 0), id: 'Full' },
                                        { button: _jsx(UnSelectedIcon, {}, void 0), id: 'Empty' },
                                    ], value: filter }, void 0)] }), void 0) }), void 0),
                    props.columnTitles.map((t, i) => {
                        return _jsx("div", Object.assign({ className: "vieolo-gantt-chart__base__data-column", style: { width: colWidth } }, { children: _jsxs("div", Object.assign({ className: `vieolo-gantt-chart__base__data-column__title-container${t.onClick ? ' clickable' : ''}`, style: { paddingBottom: props.columnGroups ? '0px' : '0', height: props.columnGroups ? '45px' : '45px', width: "100%" }, onClick: () => {
                                    if (t.onClick)
                                        t.onClick();
                                } }, { children: [_jsx(TypographyParagraphMedium, { text: t.title }, void 0),
                                    t.subtitle &&
                                        _jsx(TypographyCaptionMedium, { text: t.subtitle }, void 0)] }), void 0) }), `${t}_${i}`);
                    })] }), void 0),
            props.columnGroups &&
                _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__group-div" }, { children: [_jsx("div", { className: "vieolo-gantt-chart__group-div__item-column" }, void 0),
                        _jsx("div", Object.assign({ className: "vieolo-gantt-chart__group-div__group-column" }, { children: props.columnGroups.map((g, i) => {
                                let left = (g.start / props.columnTitles.length) * 100;
                                let width = ((g.end - g.start) / props.columnTitles.length) * 100;
                                let right = (g.end / props.columnTitles.length) * 100;
                                let style = { left: `${left}%`, width: `${width}%`, right: `${right}%` };
                                return _jsx("div", Object.assign({ className: 'vieolo-gantt-chart__group-div__group-column__group-bar', style: style }, { children: _jsx(TypographyParagraphSmall, { text: g.title }, void 0) }), `${g.title}_${i}`);
                            }) }), void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "vieolo-gantt-chart__content-div", style: { top: props.columnGroups ? '65px' : '45px', maxHeight: chartHeight - (props.columnGroups ? 65 : 45) } }, { children: finalData.map((row, rowIndex) => {
                    let dataRow = row.items;
                    let style = {};
                    if (row.colorIndicator) {
                        style.borderLeft = `2px solid ${row.colorIndicator}`;
                        style.marginLeft = '-2px';
                    }
                    return _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__content-div__row", draggable: (props.onDragReorder && row.title.trim()) ? true : false, onDragStart: e => setDraggedRow(row.value), onDragEnd: e => setDraggedRow(null), style: style }, { children: [(row.title.trim() && props.onDragReorder) &&
                                _jsx(GanttRowDropZone, { position: 'top', onDrop: e => {
                                        if (draggedRow !== row.value)
                                            handleDrop(row.value, 'top');
                                    } }, void 0),
                            _jsxs("div", Object.assign({ className: `vieolo-gantt-chart__content-div__row__item-column ${(row.contextMenuItems && row.contextMenuItems.length > 0) ? " clickable" : ""}`, onClick: e => {
                                    if (row.contextMenuItems && row.contextMenuItems.length > 0) {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setContextMenuItem(undefined);
                                        setContextMenuRow(row);
                                        setContextMenuPosition({ x: e.pageX, y: e.pageY });
                                    }
                                } }, { children: [_jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__item-column__title", title: row.title }, { children: row.title }), void 0),
                                    row.subtitle &&
                                        _jsx(TypographyParagraphSmall, { text: row.subtitle, showTitle: true }, void 0)] }), void 0),
                            _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column" }, { children: [row.supItems &&
                                        row.supItems.map((s, z) => {
                                            let supLeft = (s.from / props.columnTitles.length) * 100;
                                            let supWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                            let supRight = (s.to / props.columnTitles.length) * 100;
                                            return _jsx("div", { className: "vieolo-gantt-chart__content-div__row__bar-column__sup-item-bar", style: { left: `${supLeft}%`, width: `${supWidth}%`, right: `${supRight}%` }, "aria-label": `${row.title} ${(s.ariaLabel || "sup-item") + ' ' + z.toString()}` }, `${row.value} ${s.id} supitem ${s.from}_${s.to}_${z}`);
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
                                        return _jsx(Fragment, { children: _jsxs("div", Object.assign({ "aria-label": `${row.title} ${d.ariaLabel || (d.title || "item") + ' ' + i.toString()}`, className: className, style: style, onClick: (e) => {
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
                                                } }, { children: [(d.title || d.icon) &&
                                                        _jsxs("div", Object.assign({ className: 'center-by-flex-row' }, { children: [d.icon && d.icon,
                                                                d.title &&
                                                                    _jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column__bar__row-title", title: d.title }, { children: d.title }), void 0)] }), void 0),
                                                    d.subtitle &&
                                                        _jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column__bar__row-subtitle", title: d.subtitle }, { children: d.subtitle }), void 0)] }), `${i}__${d.title || "no_title"}`) }, `${i}__${d.title || "no_title"}_fragment`);
                                    }),
                                    row.subItems &&
                                        row.subItems.map((s, z) => {
                                            let subLeft = (s.from / props.columnTitles.length) * 100;
                                            let subWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                            let subRight = (s.to / props.columnTitles.length) * 100;
                                            return _jsx("div", { className: "vieolo-gantt-chart__content-div__row__bar-column__sub-item-bar", style: { left: `${subLeft}%`, width: `${subWidth}%`, right: `${subRight}%` }, "aria-label": `${row.title} ${(s.ariaLabel || "sub-item") + ' ' + z.toString()}` }, `${row.value} ${s.id} subitem ${s.from}_${s.to}_${z}`);
                                        })] }), void 0),
                            (row.title.trim() && props.onDragReorder) &&
                                _jsx(GanttRowDropZone, { position: 'bottom', onDrop: e => {
                                        if (draggedRow !== row.value)
                                            handleDrop(row.value, 'bottom');
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
    let cols = [];
    let overlap = false;
    for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        if (overlap)
            break;
        for (let z = item.from; z < item.to; z++) {
            if (cols.includes(z)) {
                overlap = true;
                break;
            }
            cols.push(z);
        }
    }
    return overlap;
}
/**
 * Checks whether the start and end indices of the data intersects with the occupied indices. This function only checks the overlap
 * @param array The array of indices of occupied slots
 * @param rangeStart The start index of the item
 * @param rangeEnd The end index of the item
 */
function doesIntersect(array, rangeStart, rangeEnd) {
    let intersects = false;
    for (let i = 0; i < array.length; i++) {
        const item = array[i];
        if (rangeStart === item || rangeEnd === item || (item > rangeStart && item < rangeEnd)) {
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
    let rowsIndices = [];
    let rowData = [];
    for (let i = 0; i < d.items.length; i++) {
        const item = d.items[i];
        let added = false;
        for (let z = 0; z < rowsIndices.length; z++) {
            const rowIndex = rowsIndices[z];
            if (doesIntersect(rowIndex, item.from, item.to - 1))
                continue;
            let indices = [];
            for (let k = item.from; k < item.to; k++) {
                indices.push(k);
            }
            rowIndex.push(...indices);
            rowData[z].items.push(item);
            added = true;
            break;
        }
        if (!added) {
            let indices = [];
            for (let k = item.from; k < item.to; k++) {
                indices.push(k);
            }
            rowsIndices.push(indices);
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
