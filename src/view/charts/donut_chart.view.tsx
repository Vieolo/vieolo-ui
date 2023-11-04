// React
import { toFixed } from '@vieolo/parsers/number_parsers';
import React, { useState } from 'react';

// Component
import DonutChart from '../../DonutChart';
import { DonutChartData } from '../../DonutChart/donut_chart';

// Types
import { ViewData } from '../main/main';

type DonutChartPropsType = React.ComponentProps<typeof DonutChart>;

export function donutChartOptions(): ViewData {

    return {
        constants: {
            includeLegend: true,

        } as Partial<DonutChartPropsType>,
        variables: {
            dataType: {
                default: "Percentage - Long",
                options: [
                    "Empty Data",
                    "Percentage - Long",
                    "Percentage - Short",
                    "Percentage - Single",
                    "Value - Long",
                    "Value - Short",
                    "Value - Single"
                ]
            },
            disabled: 'boolean',
            sorted: 'boolean',
        }
    }
}

export function DonutChartCreator(props: { p: DonutChartPropsType }) {

    let [selected, setSelected] = useState<DonutChartData | undefined>(undefined)

    let values = [
        4000,
        2500,
        2000,
        1500,
        1500,
        1500,
        1500,
        1500,
        1500,
        3500,
        500,
        1500,
        2500,
        3500,
        100
    ]        

    let total = values.reduce((a, b) => a + b, 0);
    
    let data: DonutChartData[] = values.map((z, i) => {
        let f: DonutChartData = {
            title: `Donut ${i + 1}`,
            id: i.toString(),            
            selected: selected && selected.id === i.toString()
        }

        if ((props.p as any).dataType.includes("Percentage")) {
            f.percent = z / total
            f.displayValue = `${toFixed((z / total) * 100, 2)}%`
        } else {
            f.value = z
            f.displayValue = z.toString()
        }

        return f
    })

    return <DonutChart
        innerText={props.p.innerText}
        data={(props.p as any).dataType === "Empty Data" 
            ? [] 
            : (props.p as any).dataType.includes("Long") 
                ? data 
                : (props.p as any).dataType.includes("Short")
                    ? data.slice(0, 3)
                    : data.slice(0, 1)
        }
        includeLegend={props.p.includeLegend}
        disabled={props.p.disabled}
        height={300}
        sorted={props.p.sorted}
        onClick={(d) => {
            if (selected && d.id === selected.id) setSelected(undefined)            
            else setSelected(d)
        }}
    />
}