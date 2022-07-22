// React
import React from 'react';

// Component
import BarChart, { BarChartData } from '../../BarChart';

// Types
import { ViewData } from '../main/main';

// Data
import { populationData, revenueData } from './chart_sample_data';

type BarChartPropsType = React.ComponentProps<typeof BarChart>;

export function barChartOptions(): ViewData {

    return {
        constants: {

        } as Partial<BarChartPropsType>,
        variables: {
            dataType: {
                default: "Population",
                options: ["Population", "Revenue"]
            },
            direction: {
                options: ['horizontal', 'vertical'],
                default: 'vertical'
            },
            dataAxisMin: {
                options: ['smallest value', "zero"],
                default: "zero"
            },
            sorted: {
                options: [false, true],
                default: false
            }
        }
    }
}


export function BarChartCreator(props: { p: BarChartPropsType }) {

    let dataTypes: {[key: string]: BarChartData[]} = {
        "Population": populationData,
        "Revenue": revenueData
    }

    return <BarChart
        height={400}
        direction={props.p.direction}
        sorted={props.p.sorted}
        data={dataTypes[(props.p as any).dataType]}
        dataAxisMin={(props.p as any).dataAxisMin}
    />
}