// React
import React, { ReactNode, Fragment, useState } from 'react';

// Materail UI
import SelectedIcon from '@mui/icons-material/RadioButtonChecked';
import UnSelectedIcon from '@mui/icons-material/RadioButtonUnchecked';
import AllIcon from '@mui/icons-material/TonalityRounded'

// Vieolo UI
import ContextMenu from '../lib/menu/context_menu';
import RadioGroup from '../lib/form/radio_group';

// Typography
import TypographyParagraphMedium from '../lib/typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../lib/typography/typography_paragraph_small';
import TypographyCaptionMedium from '../lib/typography/typography_caption_medium';
import { ColorOptionType } from '../lib/private/types';


export type GanttChartContextMenuItem = {
    title: string,
    icon?: ReactNode,
    onClick: (r: GanttChartRowType, d?: GanttChartItemType) => void,
    color?: ColorOptionType,
    disabled?: boolean
}


export type GanttChartItemType = {
    id?: number,
    from: number,
    to: number,
    ariaLabel?: string,
    title?: string,
    subtitle?: string,
    icon?: ReactNode,
    disabled?: boolean,
    /**
     * Callback function the item is clicked with a mouse or
     * tapped in a mobile device when no context menu us provided
     * Please note that if context menu items are provided, the `onClick`
     * callback is ignored in the case of a touch event.
     */
    onClick?: (d: GanttChartItemType) => void,
    color?: ColorOptionType | { border: string, background: string, text: string },
    /** 
     * The context menu items to appear when the user right clicks on the item or
     * taps when using a touch device.
     * Note that if you are providing the context menu items AND the `onClick` function,
     * the `onClick` functionality should always be included as one of the context menu options
     */
    contextMenuItems?: GanttChartContextMenuItem[],
    /** 
     * These items are ignored while filtering rows based on the number of items. 
     * so, if a row has only items with this property, it is considered an empty row
     */
    ignoredInFilter?: boolean
}

export type GanttChartAuxiliaryItemType = {
    id: string,
    from: number,
    to: number,
    ariaLabel?: string
}


export type GanttChartRowType = {
    /** The value to identify the row on click */
    value: string,
    /** The title of row which is displayed on the left-most column of the chart */
    title: string,
    subtitle?: string,
    /** The Actual data in the chart */
    items: GanttChartItemType[],
    /** The menu items that appear when the user clicks on the more button on the row's title cell */
    contextMenuItems?: GanttChartContextMenuItem[],
    subItems?: GanttChartAuxiliaryItemType[],
    supItems?: GanttChartAuxiliaryItemType[],
    colorIndicator?: string
}


export type GanttChartColumnTitle = {
    title: string,
    subtitle?: string,
    onClick?: () => void
}

export type GanttChartColumnGroup = {
    start: number,
    end: number,
    title: string
}


export default function GanttChart(props: {
    data: GanttChartRowType[],
    dataTitle: string,
    columnTitles: GanttChartColumnTitle[],
    columnGroups?: GanttChartColumnGroup[],
    initialFilter?: "All" | "Full" | "Empty",
    onDragReorder?: (newData: GanttChartRowType[]) => void,
    itemResize?: {
        allowOverlap?: boolean,
        onItemResized: (row: GanttChartRowType, item: GanttChartItemType) => void,
    }
}) {

    let [filter, setFilter] = useState<"All" | "Full" | "Empty">(props.initialFilter || "All");

    let [draggedRow, setDraggedRow] = useState<string | null>(null);

    let [contextMenuItem, setContextMenuItem] = useState<GanttChartItemType | undefined>(undefined);
    let [contextMenuRow, setContextMenuRow] = useState<GanttChartRowType | undefined>(undefined);
    let [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null);

    let finalData: GanttChartRowType[] = [];

    // Checking the overlap of the items
    for (let i = 0; i < props.data.length; i++) {
        const row = props.data[i];
        if (filter === 'Full' && row.items.filter(r => !r.ignoredInFilter).length === 0) continue;
        if (filter === 'Empty' && row.items.filter(r => !r.ignoredInFilter).length > 0) continue;

        if (doItemsOverlap(row)) {
            finalData.push(...splitData(row));
        } else {
            finalData.push(row);
        }
    }

    let chartHeight = (Object.keys(finalData).length + 1) * 45;
    let colWidth = `calc(${100 / props.columnTitles.length}% - ${100 / props.columnTitles.length}px)`;

    if (props.columnGroups) chartHeight += 20;


    function handleDrop(newValue: string, position: 'top' | 'bottom') {
        // Cancelling the drop if the drop was not meant to happen
        if (props.onDragReorder === undefined) return;
        if (draggedRow === null) return;

        // The data is iterated
        // The row that was dragged is found and simultanously removed the the new data (will be added down below)
        // The rows that have no title (those that have been splitted because they had overlapping items) are also taken out
        let draggedRowData: GanttChartRowType | undefined;
        let newData: GanttChartRowType[] = [];

        for (let i = 0; i < props.data.length; i++) {
            const d = props.data[i];
            if (d.value.split("___")[0] === draggedRow.split("___")[0]) {
                draggedRowData = d;
            } else if (d.title.trim()) {
                newData.push(d);
            }
        }

        // If the dragged row is not found (for any reason) the drop is cancelled
        if (draggedRowData === undefined) return;

        // Finding the new index of the dropzone
        // The new index is different than the old index since the dragged row is removed, changing the index of items
        let newIndex = newData.findIndex(d => d.value.split("___")[0] === newValue.split("___")[0]);
        newIndex += position === 'top' ? 0 : 1;

        // Adding back the dragged row at the drop index
        newData.splice(Math.max(newIndex, 0), 0, draggedRowData);
        props.onDragReorder(newData);
        setDraggedRow(null);
    }



    return <div className="vieolo-gantt-chart" style={{ height: chartHeight + 'px' }}>
        <div className="vieolo-gantt-chart__base" >
            <div className="vieolo-gantt-chart__base__item-column">
                <div className="vieolo-gantt-chart__base__item-column__item-title" style={{ height: props.columnGroups ? '65px' : '45px' }}>
                    <TypographyParagraphMedium text={props.dataTitle} />
                    <RadioGroup
                        horizontalButtonPadding={7}
                        onOptionChange={v => setFilter(v as any)}
                        options={[
                            { button: <AllIcon />, id: 'All' },
                            { button: <SelectedIcon />, id: 'Full' },
                            { button: <UnSelectedIcon />, id: 'Empty' },
                        ]}
                        value={filter}
                    />
                </div>
            </div>
            {
                props.columnTitles.map((t, i) => {
                    return <div className="vieolo-gantt-chart__base__data-column" style={{ width: colWidth }} key={`${t}_${i}`}>
                        <div
                            className={`vieolo-gantt-chart__base__data-column__title-container${t.onClick ? ' clickable' : ''}`}
                            style={{ paddingBottom: props.columnGroups ? '0px' : '0', height: props.columnGroups ? '45px' : '45px', width: "100%" }}
                            onClick={() => {
                                if (t.onClick) t.onClick();
                            }}
                        >
                            <TypographyParagraphMedium text={t.title} />
                            {
                                t.subtitle &&
                                <TypographyCaptionMedium text={t.subtitle} />
                            }
                        </div>
                    </div>
                })
            }
        </div>

        {
            props.columnGroups &&
            <div className="vieolo-gantt-chart__group-div">
                <div className="vieolo-gantt-chart__group-div__item-column"></div>

                <div className="vieolo-gantt-chart__group-div__group-column">
                    {
                        props.columnGroups.map((g, i) => {
                            let left = (g.start / props.columnTitles.length) * 100;
                            let width = ((g.end - g.start) / props.columnTitles.length) * 100;
                            let right = (g.end / props.columnTitles.length) * 100;

                            let style: React.CSSProperties = { left: `${left}%`, width: `${width}%`, right: `${right}%` };

                            return <div
                                key={`${g.title}_${i}`}
                                className={'vieolo-gantt-chart__group-div__group-column__group-bar'}
                                style={style}
                            >
                                <TypographyParagraphSmall text={g.title} />
                            </div>
                        })
                    }
                </div>
            </div>
        }

        <div className="vieolo-gantt-chart__content-div" style={{ top: props.columnGroups ? '65px' : '45px', maxHeight: chartHeight - (props.columnGroups ? 65 : 45) }}>
            {
                finalData.map((row, rowIndex) => {
                    let dataRow = row.items;

                    let style: React.CSSProperties = {};

                    if (row.colorIndicator) {
                        style.borderLeft = `2px solid ${row.colorIndicator}`
                        style.marginLeft = '-2px'
                    }

                    return <div
                        key={row.value}
                        className="vieolo-gantt-chart__content-div__row"
                        style={style}
                    >

                        {
                            (row.title.trim() && props.onDragReorder && draggedRow) &&
                            <GanttRowDropZone
                                position='top'
                                onDrop={e => {
                                    if (draggedRow !== row.value) handleDrop(row.value, 'top')
                                }}
                            />
                        }

                        <div
                            key={row.value + " col title"}
                            className={`vieolo-gantt-chart__content-div__row__item-column ${(row.contextMenuItems && row.contextMenuItems.length > 0) ? " clickable" : ""}`}
                            draggable={(props.onDragReorder && row.title.trim()) ? true : false}
                            onDragStart={e => {
                                setDraggedRow(row.value);
                                e.currentTarget.style.backgroundColor = "#f2f2f2";
                            }}
                            onDragEnd={e => {
                                setDraggedRow(null)
                                e.currentTarget.style.removeProperty('background-color');
                            }}
                            onClick={e => {
                                if (row.contextMenuItems && row.contextMenuItems.length > 0) {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setContextMenuItem(undefined);
                                    setContextMenuRow(row);
                                    setContextMenuPosition({ x: e.pageX, y: e.pageY })
                                }
                            }}
                        >
                            <p className="vieolo-gantt-chart__content-div__row__item-column__title" title={row.title}>{row.title}</p>
                            {
                                row.subtitle &&
                                <TypographyParagraphSmall text={row.subtitle} showTitle />
                            }
                        </div>
                        <div className="vieolo-gantt-chart__content-div__row__bar-column">
                            {
                                row.supItems &&
                                row.supItems.map((s, z) => {
                                    let supLeft = (s.from / props.columnTitles.length) * 100;
                                    let supWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                    let supRight = (s.to / props.columnTitles.length) * 100;
                                    return <div
                                        key={`${row.value} ${s.id} supitem ${s.from}_${s.to}_${z}`}
                                        className="vieolo-gantt-chart__content-div__row__bar-column__sup-item-bar"
                                        style={{ left: `${supLeft}%`, width: `${supWidth}%`, right: `${supRight}%` }}
                                        aria-label={`${row.title} ${(s.ariaLabel || "sup-item") + ' ' + z.toString()}`}
                                    >
                                    </div>
                                })
                            }

                            {
                                dataRow.map((d, i) => {
                                    let finalStart = d.from;
                                    let finalEnd = d.to;
                                    let className = `vieolo-gantt-chart__content-div__row__bar-column__bar`;

                                    if (!d.color) className += ` vieolo-gantt-chart__content-div__row__bar-column__bar__bar-primary`;
                                    else if (typeof d.color === 'string') className += ` vieolo-gantt-chart__content-div__row__bar-column__bar--${d.color || 'primary'}`;

                                    if (d.disabled) className += ' disabled';

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

                                    let style: React.CSSProperties = { left: `${left}%`, width: `${width}%`, right: `${right}%`, cursor: d.onClick ? 'pointer' : 'normal' };

                                    if (d.color && typeof d.color !== 'string') {
                                        style.borderColor = d.color.border;
                                        style.backgroundColor = d.color.background;
                                        style.color = d.color.text;
                                    }

                                    return <Fragment key={`${i}__${d.title || "no_title"}_fragment`}>

                                        <div
                                            aria-label={`${row.title} ${d.ariaLabel || (d.title || "item") + ' ' + i.toString()}`}
                                            key={`${i}__${d.title || "no_title"}`}
                                            className={className}
                                            style={style}
                                            onClick={(e) => {
                                                let hasContextMenu = d.contextMenuItems && d.contextMenuItems.length > 0;
                                                let isTouchEvent = e.nativeEvent instanceof PointerEvent && e.nativeEvent.pointerType === 'touch';
                                                let isTouchOnlyDevice = "ontouchstart" in window && window.matchMedia("(pointer: coarse)").matches && !window.matchMedia("(pointer: fine)").matches;
                                                if (hasContextMenu && (isTouchEvent || isTouchOnlyDevice)) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setContextMenuItem(d);
                                                    setContextMenuRow(row)
                                                    setContextMenuPosition({ x: e.pageX, y: e.pageY })
                                                } else {
                                                    if (d.onClick) d.onClick(d)
                                                }
                                            }
                                            }
                                            onContextMenu={e => {
                                                if (d.contextMenuItems && d.contextMenuItems.length > 0) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setContextMenuItem(d);
                                                    setContextMenuRow(row)
                                                    setContextMenuPosition({ x: e.pageX, y: e.pageY })
                                                }
                                            }}
                                        >
                                            {
                                                props.itemResize &&
                                                <GanttItemResizeHandle position='left' />
                                            }
                                            {
                                                (d.title || d.icon) &&
                                                <div className='center-by-flex-row'>
                                                    {d.icon && d.icon}
                                                    {
                                                        d.title &&
                                                        <p className="vieolo-gantt-chart__content-div__row__bar-column__bar__row-title" title={d.title}>{d.title}</p>
                                                    }
                                                </div>
                                            }
                                            {
                                                d.subtitle &&
                                                <p className="vieolo-gantt-chart__content-div__row__bar-column__bar__row-subtitle" title={d.subtitle}>{d.subtitle}</p>
                                            }

                                            {
                                                props.itemResize &&
                                                <GanttItemResizeHandle position='right' />
                                            }
                                        </div>
                                    </Fragment>
                                })
                            }

                            {
                                row.subItems &&
                                row.subItems.map((s, z) => {
                                    let subLeft = (s.from / props.columnTitles.length) * 100;
                                    let subWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                    let subRight = (s.to / props.columnTitles.length) * 100;
                                    return <div
                                        key={`${row.value} ${s.id} subitem ${s.from}_${s.to}_${z}`}
                                        className="vieolo-gantt-chart__content-div__row__bar-column__sub-item-bar"
                                        style={{ left: `${subLeft}%`, width: `${subWidth}%`, right: `${subRight}%` }}
                                        aria-label={`${row.title} ${(s.ariaLabel || "sub-item") + ' ' + z.toString()}`}
                                    >
                                    </div>
                                })
                            }
                        </div>

                        {
                            (row.title.trim() && props.onDragReorder && draggedRow) &&
                            <GanttRowDropZone
                                position='bottom'
                                onDrop={e => {
                                    if (draggedRow !== row.value) handleDrop(row.value, 'bottom')
                                }}
                            />
                        }
                    </div>
                })
            }
        </div>

        {
            (contextMenuRow && contextMenuPosition) &&
            <ContextMenu
                key={`${contextMenuPosition.x}_${contextMenuPosition.y}`}
                position={contextMenuPosition}
                items={
                    (contextMenuItem || contextMenuRow)!.contextMenuItems!.map(c => {
                        return {
                            title: c.title,
                            icon: c.icon,
                            color: c.color,
                            onClick: v => { c.onClick(contextMenuRow!, contextMenuItem) },
                            disabled: c.disabled
                        }
                    })
                }
                onClose={() => {
                    setContextMenuRow(undefined);
                    setContextMenuItem(undefined);
                    setContextMenuPosition(null)
                }}
            />
        }

    </div>
}


/**
 * Checks whether the items of the data overlap each other not. This function only checks the overlap
 * @param data The data containing the items
 */
function doItemsOverlap(data: GanttChartRowType): boolean {
    let cols: number[] = [];
    let overlap = false;

    for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        if (overlap) break;
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
function doesIntersect(array: number[], rangeStart: number, rangeEnd: number): boolean {
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
function splitData(data: GanttChartRowType): GanttChartRowType[] {
    let d = { ...data };

    // The first item is the original row
    let rowsIndices: number[][] = []
    let rowData: GanttChartRowType[] = [];

    for (let i = 0; i < d.items.length; i++) {
        const item = d.items[i];
        let added = false;

        for (let z = 0; z < rowsIndices.length; z++) {
            const rowIndex = rowsIndices[z];

            if (doesIntersect(rowIndex, item.from, item.to - 1)) continue;

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
            })
        }

    }

    return rowData;

}




function GanttRowDropZone(props: {
    position: 'top' | 'bottom',
    onDrop: (e: React.DragEvent<HTMLDivElement>) => void,
}) {
    return <div
        className={`vieolo-gantt-chart__content-div__drop-zone vieolo-gantt-chart__content-div__drop-zone--${props.position}`}
        onDrop={e => {
            props.onDrop(e);
            e.currentTarget.style.backgroundColor = 'transparent';
        }}
        onDragOver={(e) => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = '#777'
        }}
        onDragLeave={e => {
            e.preventDefault();
            e.currentTarget.style.backgroundColor = 'transparent';
        }}
    ></div>
}


function GanttItemResizeHandle(props: {
    position: 'left' | 'right',
}) {
    let [pos, setPos] = useState<{ left: number, right: number, width: number, widthPerc: number, leftPerc: number, rightPerc: number } | null>(null);

    function getInitialPos(e: React.DragEvent<HTMLDivElement>) {
        return {
            leftPerc: +e.currentTarget.parentElement!.style.left.replace("%", ""),
            rightPerc: +e.currentTarget.parentElement!.style.right.replace("%", ""),
            width: e.currentTarget.parentElement!.offsetWidth,
            widthPerc: +e.currentTarget.parentElement!.style.width.replace("%", ""),
            left: props.position === 'right'
                ? (e.pageX + e.currentTarget.offsetWidth) - e.currentTarget.parentElement!.offsetWidth
                : e.pageX,
            right: props.position === 'right'
                ? (e.pageX + e.currentTarget.offsetWidth)
                : e.pageX + e.currentTarget.parentElement!.offsetWidth
        }
    }

    function handleResize(e: React.DragEvent<HTMLDivElement>) {
        if (!pos) return;        

        if (props.position === 'right') {
            let newWidth = pos.width + (e.pageX - pos.right);
            let changeInWidth = ((newWidth - pos.width) / pos.width);
            let right = pos.rightPerc + (pos.widthPerc * changeInWidth);
            e.currentTarget.parentElement!.style.right = `${right}%`;
            e.currentTarget.parentElement!.style.width = `${pos.widthPerc + (pos.widthPerc * changeInWidth)}%`;
        } else {
            let newWidth = pos.width + (pos.left - (e.pageX));
            let changeInWidth = ((newWidth - pos.width) / pos.width);
            let left = pos.leftPerc - ((pos.widthPerc * changeInWidth));
            e.currentTarget.parentElement!.style.width = `${pos.widthPerc + (pos.widthPerc * changeInWidth)}%`;
            e.currentTarget.parentElement!.style.left = `${left}%`;
        }
    }

    return <div
        className={`vieolo-gantt-chart__content-div__row__bar-column__bar__resize vieolo-gantt-chart__content-div__row__bar-column__bar__resize--${props.position}`}
        draggable
        onDragStart={e => {
            setPos(getInitialPos(e));
        }}
        onDragEnd={e => {
            setPos(null);
        }}
        onDrag={e => {
            if (!pos) return;
            handleResize(e);
        }}
    >
    </div>
}
