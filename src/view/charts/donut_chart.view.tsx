// React
import React from 'react';

// Component
import DonutChart from '../../DonutChart';

// Types
import { ViewData } from '../main/main';

type DonutChartPropsType = React.ComponentProps<typeof DonutChart>;

export function donutChartOptions(): ViewData {

  return {
    constants: {      
      innerText: "Donut Chart",
      data : [{
        title: 'Donut 1',
        percent: 0.30,
        displayValue: '4,000'
      },
      {
        title: 'Donut 2',
        percent: 0.25,
        displayValue: '2,500'
      },
      {
        title: 'Donut 3',
        percent: 0.20,
        displayValue: '2,000'
      },
      {
        title: 'Donut 4',
        percent: 0.15,
        displayValue: '1,500'
      }
    ],
    includeLegend: true,

    } as Partial<DonutChartPropsType>,
    variables: {
      disabled: {
        options: [false, true],
        default: false,
    },
    }
  }
}

export function DonutChartCreator(props: { p: DonutChartPropsType}) {
  return <DonutChart
    innerText={props.p.innerText}
    data={props.p.data}
    includeLegend={props.p.includeLegend}
    disabled={props.p.disabled}
    />
}