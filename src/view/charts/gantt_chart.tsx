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
import GanttChart, { GanttChartColumnGroup, GanttChartColumnTitle, GanttChartDataType } from '../../charts/gantt_chart';

// Types
import { ViewData } from '../main/main';

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

    let data: GanttChartDataType[] = [
        {
            items: [],
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

        }
    }
}


export function GanttChartCreator(props: {p: GanttChartPropsType}) {

    return <GanttChart
        columnTitles={props.p.columnTitles}
        columnGroups={props.p.columnGroups}
        data={props.p.data}
        dataTitle='Items'
        initialSize='Expanded'
    />
}