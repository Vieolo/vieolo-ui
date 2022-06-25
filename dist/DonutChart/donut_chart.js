import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
import { toFixed } from '@vieolo/parsers/number_parsers';
export default function DonutChart(props) {
    let [selectedItem, setSelectedItem] = useState(-1);
    let [selectedValue, setSelectedValue] = useState('');
    // The first <g> is meant to show the empty part of the chart
    // The strokeDashoffset marks the distance of the end of the section to the 100% mark
    // The strokeDashoffset has a max number of 440, so 100 is actually 100 of 440
    // The biggest sections should be added first
    // The percent in the data should be ranged between 0 and 1
    const colors = [
        "primary",
        "secondary",
        "alert",
        "error",
        "success",
        "accessoryOrange",
        "accessoryBlue",
        "accessoryGreen",
    ];
    function getColor(index) {
        return `${colors[index]}-normal`;
    }
    let percentTotal = 0;
    props.data.forEach(d => percentTotal += d.percent);
    if (percentTotal > 1)
        percentTotal = 1;
    let soFar = 0;
    let sorted = props.data.filter(d => d.percent > 0).sort((a, b) => b.percent - a.percent);
    let legendContainerWidth = 0;
    if (props.includeLegend) {
        let remaining = sorted.length % 6;
        legendContainerWidth = 80 * (((sorted.length - remaining) / 6) + (remaining === 0 ? 0 : 1));
    }
    return _jsxs("div", Object.assign({ className: `vieolo-donut-chart${props.disabled ? ' disabled' : ''}` }, { children: [_jsxs("div", Object.assign({ className: "vieolo-donut-chart__chart-container" }, { children: [_jsx("h2", { children: selectedValue || props.innerText || '' }, void 0),
                    _jsxs("svg", Object.assign({ width: "160", height: "160" }, { children: [_jsx("g", { children: _jsx("circle", { style: { "strokeDashoffset": 0 }, className: "donut", r: "69.85699", cy: "81", cx: "81", "stroke-width": "8", stroke: "#ddd", fill: "none" }, void 0) }, void 0),
                            sorted.map((d, i) => {
                                soFar += d.percent;
                                return _jsxs("g", { children: [_jsx("title", { children: `${d.title}: ${toFixed(d.percent * 100, 2)}%` }, void 0),
                                        _jsx("circle", { style: { "strokeDashoffset": (1 - percentTotal + soFar - d.percent) * 440 }, className: `vieolo-donut-chart__chart-container__donut vieolo-donut-chart__chart-container__donut--${getColor(i)} ${(selectedItem > -1 && (selectedItem < i || selectedItem > i)) ? '#ddd' : 'gray-normal'}`, r: "69.85699", cy: "81", cx: "81", "stroke-width": "8", fill: "none" }, void 0)] }, void 0);
                            })] }), void 0)] }), void 0),
            props.includeLegend &&
                _jsx("div", Object.assign({ className: "vieolo-donut-chart__legend-container", style: { width: legendContainerWidth + 20 } }, { children: sorted.map((d, i) => {
                        return _jsxs("div", Object.assign({ className: "vieolo-donut-chart__legend-container__legend-item", onClick: () => {
                                setSelectedItem(i === selectedItem ? -1 : i);
                                setSelectedValue(i === selectedItem ? '' : d.displayValue || '');
                            } }, { children: [_jsx("div", { className: `background-color--${getColor(i)}` }, void 0),
                                _jsxs("div", { children: [_jsx("p", Object.assign({ className: "title", title: d.title }, { children: d.title }), void 0),
                                        _jsx("p", Object.assign({ className: "subtitle" }, { children: `${toFixed(d.percent * 100, 2)}%` }), void 0)] }, void 0)] }), void 0);
                    }) }), void 0)] }), void 0);
}
