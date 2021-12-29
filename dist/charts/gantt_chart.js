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
    let [contextMenuRow, setContextMenuRow] = useState(null);
    let [contextMenuPosition, setContextMenuPosition] = useState(null);
    let finalData = [];
    // Checking the overlap of the items
    for (let i = 0; i < props.data.length; i++) {
        const row = props.data[i];
        if (filter === 'Full' && row.items.length === 0)
            continue;
        if (filter === 'Empty' && row.items.length > 0)
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
            _jsx("div", Object.assign({ className: "vieolo-gantt-chart__content-div", style: { top: props.columnGroups ? '65px' : '45px', maxHeight: chartHeight - (props.columnGroups ? 65 : 45) } }, { children: finalData.map(row => {
                    let dataRow = row.items;
                    return _jsxs("div", Object.assign({ className: "vieolo-gantt-chart__content-div__row" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-gantt-chart__content-div__row__item-column" }, { children: [_jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__item-column__title", title: row.title }, { children: row.title }), void 0),
                                    row.subtitle &&
                                        _jsx(TypographyParagraphSmall, { text: row.subtitle, showTitle: true }, void 0)] }), void 0),
                            _jsx("div", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column" }, { children: dataRow.map((d, i) => {
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
                                    return _jsxs(Fragment, { children: [d.supItems &&
                                                d.supItems.map((s, z) => {
                                                    let supLeft = (s.from / props.columnTitles.length) * 100;
                                                    let supWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                                    let supRight = (s.to / props.columnTitles.length) * 100;
                                                    return _jsx("div", { className: "vieolo-gantt-chart__content-div__row__bar-column__sup-item-bar", style: { left: `${supLeft}%`, width: `${supWidth}%`, right: `${supRight}%` } }, `${s.from}_${s.to}_${z}`);
                                                }),
                                            _jsxs("div", Object.assign({ className: className, style: style, onClick: () => { if (d.onClick)
                                                    d.onClick(d); }, onContextMenu: e => {
                                                    if (d.contextMenuItems && d.contextMenuItems.length > 0) {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setContextMenuRow(d);
                                                        setContextMenuPosition({ x: e.pageX, y: e.pageY });
                                                    }
                                                } }, { children: [(d.title || d.icon) &&
                                                        _jsxs("div", Object.assign({ className: 'center-by-flex-row' }, { children: [d.icon && d.icon,
                                                                d.title &&
                                                                    _jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column__bar__row-title", title: d.title }, { children: d.title }), void 0)] }), void 0),
                                                    d.subtitle &&
                                                        _jsx("p", Object.assign({ className: "vieolo-gantt-chart__content-div__row__bar-column__bar__row-subtitle", title: d.subtitle }, { children: d.subtitle }), void 0)] }), `${i}__${d.title || "no_title"}`),
                                            d.subItems &&
                                                d.subItems.map((s, z) => {
                                                    let subLeft = (s.from / props.columnTitles.length) * 100;
                                                    let subWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                                    let subRight = (s.to / props.columnTitles.length) * 100;
                                                    return _jsx("div", { className: "vieolo-gantt-chart__content-div__row__bar-column__sub-item-bar", style: { left: `${subLeft}%`, width: `${subWidth}%`, right: `${subRight}%` } }, `${s.from}_${s.to}_${z}`);
                                                })] }, `${i}__${d.title || "no_title"}_fragment`);
                                }) }), void 0)] }), row.value);
                }) }), void 0),
            (contextMenuRow && contextMenuPosition) &&
                _jsx(ContextMenu, { position: contextMenuPosition, items: contextMenuRow.contextMenuItems.map(c => {
                        return {
                            title: c.title,
                            icon: c.icon,
                            color: c.color,
                            onClick: v => { c.onClick(contextMenuRow); },
                            disabled: c.disabled
                        };
                    }), onClose: () => {
                        setContextMenuRow(null);
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
                value: data.value + '_' + i,
                title: i === 0 ? data.title : '',
                subtitle: i === 0 ? data.subtitle : '',
                items: [item]
            });
        }
    }
    return rowData;
}
