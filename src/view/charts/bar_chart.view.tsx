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
                default: 'vertical'
            },
            sorted: {
                options: [false, true],
                default: false
            }
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
        height={300}
        direction={props.p.direction}
        sorted={props.p.sorted}
        data={dataTypes[(props.p as any).dataType]}
    />
}