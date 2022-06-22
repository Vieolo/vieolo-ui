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
        title: 'Donut1',
        percent: 0.40,
        displayValue: 'Default'
      },
      {
        title: 'Donut2',
        percent: 0.25,
        displayValue: 'Default'
      },
      {
        title: 'Donut3',
        percent: 0.20,
        displayValue: 'Default'
      },
      {
        title: 'Donut4',
        percent: 0.15,
        displayValue: 'Default'
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