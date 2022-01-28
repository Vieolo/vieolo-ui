// React
import React from 'react';

// Component
import BarChart from '../../charts/bar_chart';

// Types
import { ViewData } from '../main/main';

type BarChartPropsType = React.ComponentProps<typeof BarChart>;

export function barChartOptions(): ViewData {

    return {
        constants: {

        } as Partial<BarChartPropsType>,
        variables: {
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


export function BarChartCreator(props: {p: BarChartPropsType}) {

    return <BarChart
        height={400}
        direction={props.p.direction}
        sorted={props.p.sorted}
        data={[
            {
                referenceAxis: 'Germany',
                dataAxis: 80_000_000,
                fillColor: "teal",
                dataDisplay: "80,000,000.00"
            },
            {
                referenceAxis: 'Estonia',
                dataAxis: 1_300_000,
                dataDisplay: "1,300,000.00"
            },
            {
                referenceAxis: 'Denmark',
                dataAxis: 5_000_000,
                dataDisplay: "5,000,000.00"
            }
        ]}
    />
}