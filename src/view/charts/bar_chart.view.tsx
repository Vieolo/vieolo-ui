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
            tickCount: {
                options: ["default", "5"],
                default: "default"
            },
            fixedHeight: 'boolean',
            sorted: 'boolean',
            showInlineValue: 'booleanTrueDefault',
            removeSpaceBetweenBars: 'boolean',
            shortenTickText: 'boolean',
            withMaxLentghRef: 'boolean',
            withOnClick: 'booleanTrueDefault',
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
        tickCount={(props.p as any).tickCount === "default" ? undefined : +(props.p as any).tickCount}
        direction={props.p.direction}
        sorted={props.p.sorted}
        data={dataTypes[(props.p as any).dataType]}
        showInlineValue={props.p.showInlineValue}
        title={(props.p as any).dataType}
        groupType={props.p.groupType}
        removeSpaceBetweenBars={props.p.removeSpaceBetweenBars}
        // tickFormat={(props.p as any).customTickFormat ? ((t) => `${t}z`) : undefined}
        shortenTickText={(props.p as any).shortenTickText}
        maxRefLength={(props.p as any).withMaxLentghRef ? 7 : undefined}
        onBarClick={(props.p as any).withOnClick ? (r) => alert(typeof r === 'string' ? r : r.referenceAxis + r.dataDisplay) : undefined}
    />
}