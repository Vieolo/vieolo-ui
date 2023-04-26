// React
import React from 'react';

// Component
import BarChart, { BarChartData, StackedBarChartData } from '../../BarChart';

// Types
import { ViewData } from '../main/main';

// Data
import { cashReserveChangeData, populationData, revenueData, weeklySalesBreakdown } from './chart_sample_data';

type BarChartPropsType = React.ComponentProps<typeof BarChart>;

export function barChartOptions(): ViewData {

    return {
        constants: {

        } as Partial<BarChartPropsType>,
        variables: {
            dataType: {
                default: "Sales Breakdown",
                options: ["Population", "Revenue", "Sales Breakdown", "Cash Reserve Change"]
            },
            direction: {
                options: ['horizontal', 'vertical'],
                default: 'horizontal'
            },
            groupType: {
                options: ["grouped", "stacked"],
                default: "stacked"
            },
            fixedHeight: 'boolean',
            sorted: 'boolean',
            showInlineValue: 'booleanTrueDefault',
            removeSpaceBetweenBars: 'boolean'
        }
    }
}


export function BarChartCreator(props: { p: BarChartPropsType }) {

    let dataTypes: {[key: string]: BarChartData[] | StackedBarChartData[]} = {
        "Population": populationData,
        "Revenue": revenueData,
        "Sales Breakdown": weeklySalesBreakdown,
        "Cash Reserve Change": cashReserveChangeData
    }

    return <BarChart
        height={(props.p as any).fixedHeight ? 400 : undefined}
        // tickCount={5}
        direction={props.p.direction}
        sorted={props.p.sorted}
        data={dataTypes[(props.p as any).dataType]}
        showInlineValue={props.p.showInlineValue}
        title={(props.p as any).dataType}
        groupType={props.p.groupType}
        removeSpaceBetweenBars={props.p.removeSpaceBetweenBars}
    />
}