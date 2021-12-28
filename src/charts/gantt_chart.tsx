// React
import React, { ReactNode, Fragment, useState } from 'react';

// Materail UI
import ExpandIcon from '@mui/icons-material/ExpandMoreRounded';
import CollapseIcon from '@mui/icons-material/ExpandLessRounded';

// Vieolo UI
import IconButton from '../lib/button/icon_button';
import ContextMenu from '../lib/menu/context_menu';

// Typography
import TypographyParagraphMedium from '../lib/typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../lib/typography/typography_paragraph_small';
import TypographyCaptionMedium from '../lib/typography/typography_caption_medium';


export type GanttChartContextMenuItem = {
    title: string,
    icon?: ReactNode,
    onClick: (d: GanttChartItemType) => void,
    color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'alert',
    disabled?: boolean
}


export type GanttChartItemType = {
    id?: number,
    from: number,
    to: number,
    title?: string,
    subtitle?: string,
    icon?: ReactNode,
    disabled?: boolean,
    onClick?: (d: GanttChartItemType) => void,
    color?: 'primary' | 'secondary' | 'tertiary' | 'error' | 'alert' | 'success' | { border: string, background: string, text: string },
    contextMenuItems?: GanttChartContextMenuItem[],
    subItems?: { from: number, to: number }[],
    supItems?: { from: number, to: number }[]
}


export type GanttChartDataType = {
    /** The value to identify the row on click */
    value: string,
    /** The title of row which is displayed on the left-most column of the chart */
    title: string,
    subtitle?: string,
    /** The Actual data in the chart */
    items: GanttChartItemType[]
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
    data: GanttChartDataType[],
    dataTitle: string,
    columnTitles: GanttChartColumnTitle[],
    columnGroups?: GanttChartColumnGroup[],
    initialSize?: "Collapsed" | "Expanded"
}) {

    let [size, setSize] = useState<"Collapsed" | "Expanded">(props.initialSize ? props.initialSize : "Expanded");

    let [contextMenuRow, setContextMenuRow] = useState<GanttChartItemType | null>(null);
    let [contextMenuPosition, setContextMenuPosition] = useState<{ x: number, y: number } | null>(null);

    let finalData = props.data;

    if (size === "Collapsed") {
        finalData = finalData.filter(d => d.items.length > 0);
    }

    let chartHeight = (Object.keys(finalData).length + 1) * 45;
    let colWidth = `calc(${100 / props.columnTitles.length}% - ${100 / props.columnTitles.length}px)`;

    if (props.columnGroups) chartHeight += 20;



    return <div className="vieolo-gantt-chart" style={{ height: chartHeight + 'px' }}>
        <div className="vieolo-gantt-chart__base" >
            <div className="vieolo-gantt-chart__base__item-column">
                <div className="vieolo-gantt-chart__base__item-column__item-title" style={{ height: props.columnGroups ? '65px' : '45px' }}>
                    <TypographyParagraphMedium text={props.dataTitle} />
                    <IconButton
                        icon={size === "Collapsed" ? <ExpandIcon /> : <CollapseIcon />}
                        onClick={() => setSize(size === "Collapsed" ? "Expanded" : "Collapsed")}
                        size={"small"}
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
                finalData.map(row => {
                    let dataRow = row.items;

                    return <div className="vieolo-gantt-chart__content-div__row" key={row.value}>
                        <div className="vieolo-gantt-chart__content-div__row__item-column">
                            <p className="vieolo-gantt-chart__content-div__row__item-column__title" title={row.title}>{row.title}</p>
                            {
                                row.subtitle &&
                                <TypographyParagraphSmall text={row.subtitle} showTitle />
                            }
                        </div>
                        <div className="vieolo-gantt-chart__content-div__row__bar-column">
                            {
                                dataRow.map((d, i) => {
                                    let finalStart = d.from;
                                    let finalEnd = d.to;
                                    let className = `vieolo-gantt-chart__content-div__row__bar-column__bar`;

                                    if (!d.color) className += ` vieolo-gantt-chart__content-div__row__bar-column__bar__bar-primary`;
                                    else if (typeof d.color === 'string') className += ` vieolo-gantt-chart__content-div__row__bar-column__bar__bar-${d.color || 'primary'}`;

                                    if (d.disabled) className += ' disabled';

                                    if (finalStart < 0) {
                                        finalStart = 0;
                                        className += ' vieolo-gantt-chart__content-div__row__bar-column__bar__bar-start';
                                    }

                                    if (finalEnd > props.columnTitles.length) {
                                        finalEnd = props.columnTitles.length;
                                        className += ' vieolo-gantt-chart__content-div__row__bar-column__bar__bar-end';
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
                                        {
                                            d.supItems &&
                                            d.supItems.map((s, z) => {
                                                let supLeft = (s.from / props.columnTitles.length) * 100;
                                                let supWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                                let supRight = (s.to / props.columnTitles.length) * 100;
                                                return <div
                                                    key={`${s.from}_${s.to}_${z}`}
                                                    className="vieolo-gantt-chart__content-div__row__bar-column__bar__sup-item-bar"
                                                    style={{ left: `${supLeft}%`, width: `${supWidth}%`, right: `${supRight}%` }}
                                                >
                                                </div>
                                            })
                                        }


                                        <div
                                            key={`${i}__${d.title || "no_title"}`}
                                            className={className}
                                            style={style}
                                            onClick={() => { if (d.onClick) d.onClick(d) }}
                                            onContextMenu={e => {
                                                if (d.contextMenuItems && d.contextMenuItems.length > 0) {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    setContextMenuRow(d);
                                                    setContextMenuPosition({ x: e.pageX, y: e.pageY })
                                                }
                                            }}
                                        >
                                            {
                                                d.title &&
                                                <p className="vieolo-gantt-chart__content-div__row__bar-column__bar__row-title" title={d.title}>{d.title}</p>
                                            }
                                            {
                                                d.subtitle &&
                                                <p className="vieolo-gantt-chart__content-div__row__bar-column__bar__row-subtitle" title={d.subtitle}>{d.subtitle}</p>
                                            }
                                            {
                                                d.icon &&
                                                <Fragment>
                                                    {d.icon}
                                                </Fragment>
                                            }
                                        </div>

                                        {
                                            d.subItems &&
                                            d.subItems.map((s, z) => {
                                                let subLeft = (s.from / props.columnTitles.length) * 100;
                                                let subWidth = ((s.to - s.from) / props.columnTitles.length) * 100;
                                                let subRight = (s.to / props.columnTitles.length) * 100;
                                                return <div
                                                    key={`${s.from}_${s.to}_${z}`}
                                                    className="vieolo-gantt-chart__content-div__row__bar-column__bar__sub-item-bar"
                                                    style={{ left: `${subLeft}%`, width: `${subWidth}%`, right: `${subRight}%` }}
                                                >
                                                </div>
                                            })
                                        }
                                    </Fragment>
                                })
                            }
                        </div>
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
                    contextMenuRow.contextMenuItems!.map(c => {
                        return {
                            title: c.title,
                            icon: c.icon,
                            color: c.color,
                            onClick: v => { c.onClick(contextMenuRow!) },
                            disabled: c.disabled
                        }
                    })
                }
                onClose={() => {
                    setContextMenuRow(null);
                    setContextMenuPosition(null)
                }}
            />
        }

    </div>
}
