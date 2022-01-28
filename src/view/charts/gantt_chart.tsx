// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';

// Installed Packages
import VDate from '@vieolo/date';

// Component
import GanttChart, { GanttChartColumnGroup, GanttChartColumnTitle, GanttChartDataType, GanttChartItemType } from '../../charts/gantt_chart';

// Types
import { ViewData } from '../main/main';
import { ColorOptionType } from '../../lib/private/types';

type GanttChartPropsType = React.ComponentProps<typeof GanttChart>;

export function ganttChartOptions(): ViewData {

    let columnTitles: GanttChartColumnTitle[] = [];
    let columnGroups: GanttChartColumnGroup[] = [];

    let monthStart = new VDate().setToMonthStart();

    for (let i = 0; i < 35; i++) {
        const currentDate = new VDate(monthStart.getTime()).addDay(i);

        if (currentDate.getMonth() !== monthStart.getMonth()) {
            columnGroups[columnGroups.length -1].end = i;
            break;
        }

        let weekDays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
        
        columnTitles.push({
            title: currentDate.getDate().toString(),
            onClick: () => alert(`You clicked on ${currentDate.formatDate()}`),
            subtitle: weekDays[currentDate.getDay()]
        })

        if (i === 0 || currentDate.getDay() === 1) {
            let thisWeek = currentDate.getWeek();
            columnGroups.push({
                title: `Week ${thisWeek.weekNumber}`,
                start: i,
                end: i + (8 - (currentDate.getDay() || 7))
            })
        }
    }

    let itemsOne: GanttChartItemType[] = [
        {
            from: 0,
            to: 14,
            color: 'primary',
            id: 1,
            onClick: () => {},
            subItems: [{
                from: 2, 
                to: 3
            }],
            subtitle: "Has Context Menu",
            title: "Item One",
            supItems: [{from: 5, to: 6}],
            contextMenuItems: [
                {
                    title: "Edit",
                    onClick: d => alert("You clicked on edit"),
                    icon: <IconOne />,
                    color: 'primary'
                }
            ]
        },
        {
            from: 20,
            to: 25,
            color: {
                background: '#ddd',
                border: 'coral',
                text: 'magenta',
            },
            title: "Custom Color",
            subtitle: "The color of border, background, and text are given explicitly",
            id: 2,
        }
    ]

    let itemsTwo: GanttChartItemType[] = [
        {
            from: 0,
            to: 14,
            color: 'primary',
            id: 3,
            onClick: () => {},
            subItems: [{
                from: 5, 
                to: 7
            }],
            title: "Item Three",
            disabled: true
        },
        {
            from: 14,
            to: 24,
            color: 'primary',
            id: 4,
            icon: <IconTwo />,
            onClick: () => {}
        },
        {
            from: 25,
            to: 28,
            color: 'primary',
            id: 5,
            icon: <IconTwo />,
            title: "A long title to check for with the icon",
            onClick: () => {}
        }
    ]

    let itemsThree: GanttChartItemType[] = [
        {
            from: 4,
            to: 10,
            id: 12,
            color: 'primary'
        },
        {
            from: 10,
            to: 24,
            color: 'primary',
            id: 6,
            onClick: () => {},
            subItems: [{from: 10,  to: 12 }, {from: 14, to: 15}],
            supItems: [{from: 10,  to: 11 }, {from: 16, to: 18}],
            title: "With Everything",
            icon: <IconThree />,
            subtitle: "This item does not have any context menu",
        },
        {
            from: 20,
            to: 25,
            id: 7,
            color: 'primary',
        },
        {
            from: 6,
            to: 11,
            id: 8,
            color: 'primary'
        },
        {
            from: 12,
            to: 15,
            id: 9,
            color: 'primary'
        },
        {
            from: 5,
            to: 28,
            id: 10,
            color: 'primary'
        },
        {
            from: 26,
            to: 29,
            id: 11,
            color: 'primary'
        },
        {
            from: 0,
            to: 6,
            id: 13,
            color: 'primary'
        },
        {
            from: 0,
            to: 6,
            id: 14,
            color: 'primary'
        },
        {
            from: 6,
            to: 10,
            id: 15,
            color: 'primary'
        }
    ]

    let data: GanttChartDataType[] = [
        {
            items: itemsOne,
            title: "Item One",
            value: '1',
            subtitle: "subtitle One"
        },
        {
            items: itemsTwo,
            title: "Item Two",
            value: '2',
            subtitle: "subtitle Two"
        },
        {
            items: itemsThree,
            title: "Item Three",
            value: '3',
            subtitle: "subtitle Three"
        },
        {
            items: [],
            title: "Item Free",
            value: '4',
            subtitle: "No Items"
        },
        {
            items: itemsOne,
            title: "Item One",
            value: '5',
            subtitle: "subtitle One"
        }
    ]

    return {
        constants: {
            columnTitles: columnTitles,
            columnGroups: columnGroups,
            data: data
        } as Partial<GanttChartPropsType>,
        variables: {
            itemColor: 'colors',
        }
    }
}


export function GanttChartCreator(props: {p: GanttChartPropsType}) {


    function replaceItemColor(color: ColorOptionType, data: GanttChartDataType[]): GanttChartDataType[] {
        let d = [...data];

        d.forEach(row => {
            row.items.forEach(item => {
                if (typeof item.color === 'string') item.color = color;
            })
        })

        return d;
    }


    return <GanttChart
        columnTitles={props.p.columnTitles}
        columnGroups={props.p.columnGroups}
        data={replaceItemColor((props.p as any).itemColor, props.p.data)}
        dataTitle='Items'
        initialFilter='All'
    />
}