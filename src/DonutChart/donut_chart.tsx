// React
import React, { useState } from 'react';

export function toFixed(original: number, n: number) : string { // internal
	return (+(Math.round(+(original + 'e' + n)) + 'e' + -n)).toFixed(n);
}

class ColorPallet {
	static background = "#FFFFFB";
	
	static primary = "rgb(26, 15, 46)";
	static secondary = "#3E88C2";
	static tertiary = "rgb(207, 219, 242)";
	
	static alert = "#FFB627";
	static error = "#FF6B6C";
	static success = "#69A297";
	
	static disable = "#b0bec5";	

	static accessoryOrange = "wheat";
	static accessoryBlue = "rgb(25, 118, 210)";
	static accessoryGreen = "rgb(152, 227, 214)";

	static getColorByString(name: string) : string {
		let colors: any = {
			"primary": ColorPallet.primary,
			"secondary": ColorPallet.secondary,
			"tertiary": ColorPallet.tertiary,
			"background": ColorPallet.background,
			"alert": ColorPallet.alert,
			"error": ColorPallet.error,
			"success": ColorPallet.success,
			"disable": ColorPallet.disable,
			"accessoryOrange": ColorPallet.accessoryOrange,
			"accessoryBlue": ColorPallet.accessoryBlue,
			"accessoryGreen": ColorPallet.accessoryGreen
		}

		return colors[name as any];
	}
}

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

    let colors = [
        ColorPallet.primary, 
        ColorPallet.secondary, 
        ColorPallet.alert, 
        ColorPallet.success, 
        ColorPallet.error, 
        ColorPallet.accessoryBlue,
        ColorPallet.accessoryGreen,
        ColorPallet.accessoryOrange,
        "chocolate",
        "darkblue",
        "darkgreen",
        "crimson",
        "deeppink",
        "dimgray",
        "greenyellow"
    ]

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

    return <div className={`donut-chart${props.disabled ? ' disabled' : ''}`}>
        
        <div className="chart-container">
            <h2>{selectedValue || props.innerText || ''}</h2>
            <svg width="160" height="160">
                <g>
                    <circle style={{ "strokeDashoffset": 0 }} className="donut" r="69.85699" cy="81" cx="81" stroke-width="8" stroke="#ddd" fill="none" />
                </g>
                {
                    sorted.map((d, i) => {                    
                        let color = colors[i % colors.length]
                        soFar += d.percent;
                        return <g>
                            <title>{`${d.title}: ${toFixed(d.percent * 100, 2)}%`}</title>
                            <circle 
                                style={{ "strokeDashoffset": (1 - percentTotal + soFar - d.percent) * 440 }} 
                                className={`donut`} 
                                r="69.85699" 
                                cy="81" 
                                cx="81" 
                                stroke-width="8" 
                                stroke={(selectedItem > -1 && (selectedItem < i || selectedItem > i)) ? '#ddd' : color}
                                fill="none"
                                />
                        </g>
                    })
                }
            </svg>
        </div>

        {
            props.includeLegend && 
            <div className="legend-container" style={{width: legendContainerWidth + 20}}>
                {
                    sorted.map((d, i) => {
                        return <div className="legend-item" onClick={() => {
                            setSelectedItem(i === selectedItem ? -1 : i);
                            setSelectedValue(i === selectedItem ? '' : d.displayValue || '')
                        }}>
                            <div style={{backgroundColor: colors[i % colors.length]}}></div>
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