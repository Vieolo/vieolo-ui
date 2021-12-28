// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

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
            subtitle: "item one description",
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
            items: [],
            title: "Item Two",
            value: '2',
            subtitle: "subtitle Two"
        },
        {
            items: [],
            title: "Item Three",
            value: '3',
            subtitle: "subtitle Three"
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
        initialSize='Expanded'
    />
}