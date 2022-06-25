// React
import React, { useState } from 'react';

import { toFixed } from '@vieolo/parsers/number_parsers';

export default function DonutChart(props: {
    innerText?: string,
    data: {
        title: string,
        /** The percent in the data should be ranged between 0 and 1 */
        percent: number,
        /** This value is displayed when the legend is selected and is not considered in the calculations */
        displayValue?: string
    }[],
    includeLegend?: boolean,
    disabled?: boolean,
}) {

    let [selectedItem, setSelectedItem] = useState<number>(-1);
    let [selectedValue, setSelectedValue] = useState<string>('');

    // The first <g> is meant to show the empty part of the chart
    // The strokeDashoffset marks the distance of the end of the section to the 100% mark
    // The strokeDashoffset has a max number of 440, so 100 is actually 100 of 440
    // The biggest sections should be added first
    // The percent in the data should be ranged between 0 and 1

    const colors = [
        "primary",
        "secondary",
        "tertiary",
        "alert",
        "error",
        "success",
        "disable",
        "accessoryOrange",
        "accessoryBlue",
        "accessoryGreen",
    ]

    function getColor(index: number) : string {
        return `${colors[index]}-normal`
    }

    let percentTotal = 0;
    props.data.forEach(d => percentTotal += d.percent)

    if (percentTotal > 1) percentTotal = 1;

    let soFar = 0;    

    let sorted = props.data.filter(d => d.percent > 0).sort((a, b) => b.percent - a.percent);
    
    let legendContainerWidth = 0;

    if (props.includeLegend) {
        let remaining = sorted.length % 6;
        legendContainerWidth = 80 * (((sorted.length - remaining) / 6) + (remaining === 0 ? 0 : 1))
    }

    return <div className={`vieolo-donut-chart${props.disabled ? ' disabled' : ''}`}>
        
        <div className="vieolo-donut-chart__chart-container">
            <h2>{selectedValue || props.innerText || ''}</h2>
            <svg width="160" height="160">
                <g>
                    <circle style={{ "strokeDashoffset": 0 }} className="donut" r="69.85699" cy="81" cx="81" stroke-width="8" stroke="#ddd" fill="none" />
                </g>
                {
                    sorted.map((d, i) => {                    
                        soFar += d.percent;
                        return <g>
                            <title>{`${d.title}: ${toFixed(d.percent * 100, 2)}%`}</title>
                            <circle 
                                style={{ "strokeDashoffset": (1 - percentTotal + soFar - d.percent) * 440 }} 
                                className={`vieolo-donut-chart__chart-container__donut vieolo-donut-chart__chart-container__donut--${getColor(i)} ${(selectedItem > -1 && (selectedItem < i || selectedItem > i)) ? '#ddd' : 'gray-normal'}`} 
                                r="69.85699" 
                                cy="81" 
                                cx="81" 
                                stroke-width="8" 
                                fill="none"
                                />
                        </g>
                    })
                }
            </svg>
        </div>        

        {
            props.includeLegend && 
            <div className="vieolo-donut-chart__legend-container" style={{width: legendContainerWidth + 20}}>
                {
                    sorted.map((d, i) => {
                        return <div className="vieolo-donut-chart__legend-container__legend-item" onClick={() => {
                            setSelectedItem(i === selectedItem ? -1 : i);
                            setSelectedValue(i === selectedItem ? '' : d.displayValue || '')
                        }}>
                            <div className={`background-color--${getColor(i)}`}></div>
                            <div>
                                <p className="title" title={d.title}>{d.title}</p>  
                                <p className="subtitle">{`${toFixed(d.percent * 100, 2)}%`}</p>
                            </div>
                        </div>
                    })
                }
            </div>
        }


    </div>


}