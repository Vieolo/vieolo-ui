import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useEffect, useRef, useState } from 'react';
// Vieolo UI
import Flex from '../Flex';
import Typography from '../Typography';
import GridContainer from '../GridContainer';
import Grid from '../Grid';
// Intalled Packages
import * as d3 from 'd3';
export default function BarChart(props) {
    let ref = useRef(null);
    let [propsRef, setPropsRef] = useState("");
    useEffect(() => {
        // If the props is equal to the current state, the function is cancelled
        let stringified = JSON.stringify(props);
        if (propsRef && stringified === propsRef)
            return;
        setPropsRef(stringified);
        // Creating the Tooltip
        function getTooltipHTML(values) {
            return values.map(v => {
                return `<div>
                    <p class="typography-paragraph-small">${v.title}</p>
                    <p class="typography-paragraph-small font-weight--bold">${v.value}</p>
                </div>`;
            }).join("");
        }
        function displayTooltip(parent, e, title, value) {
            let rectElement = e.toElement;
            let t = title;
            try {
                if (t === undefined) {
                    t = rectElement.parentNode.attributes["title"].textContent;
                }
            }
            catch (error) { }
            tooltip.html(getTooltipHTML([{ title: t || "", value: value }]))
                .style('visibility', 'visible')
                .style('left', (rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2)) + 'px');
            d3.select(parent).transition().attr('class', getHoverClass);
        }
        function removeTooltip(parent, emptyClass) {
            tooltip.html(``).style('visibility', 'hidden');
            d3.select(parent).transition().attr('class', d => emptyClass ? "" : getFillClass(d));
        }
        let ct = (props.data[0] && typeof props.data[0].dataAxis !== "number") ? props.groupType || 'stacked' : 'bar';
        let isVertical = props.direction === 'vertical';
        let animationDuration = 200;
        // For rendering the chart:
        // 1. HTML div is selected
        // 2. Width and height and final structure of data is calculated
        // 3. A SVG element is created
        // 4. Left axis of the chart is created (a `g` element)
        // 5. Bottom axis of the chart is created (a `g` element)
        // 6. Bar containers are added
        // 7. Bar sized are adjusted
        // Selecting the HTML div
        d3.select(ref.current).html("");
        let finalMargin = props.margin || { top: 30, right: 30, bottom: 70, left: 60 };
        let width = (ref.current ? ref.current.offsetWidth : 200) - finalMargin.left - finalMargin.right;
        let height = props.height - finalMargin.top - finalMargin.bottom;
        let finalData = props.data;
        // If the bar uses a `StackedBarChartData`, the total of each item is added to it manually
        if (ct === 'stacked')
            finalData = finalData.map((z) => {
                if (!z.total)
                    z.total = Object.values(z.dataAxis).reduce((a, b) => a + b, 0);
                return z;
            });
        // Sorting the data of needed
        if (props.sorted)
            finalData = sortData(props.data);
        // Creating the basic SVG element
        const svg = d3.select(ref.current)
            .append("svg")
            .attr("width", width + finalMargin.left + finalMargin.right)
            .attr("height", height + finalMargin.top + finalMargin.bottom)
            .append("g")
            .attr("transform", `translate(${finalMargin.left}, ${finalMargin.top})`);
        // The tooltip that appears when user hovers over one of the items
        let tooltip = d3
            .select(ref.current)
            .append('div')
            .attr('class', 'vieolo-bar-chart__tooltip')
            .style('visibility', 'hidden');
        // The numerical value of data that to be appear in the data axis of the chart
        // This array is used to measure the min and max range of the chart
        let values = finalData.map(d => ct === 'bar'
            ? d.dataAxis
            : ct === 'stacked'
                ? Object.values(d.dataAxis).reduce((a, b) => a + b, 0)
                : Object.values(d.dataAxis).sort((a, b) => b - a)[0]);
        // The min and max range of the chart
        let axisMin = getDataAxisMin(values);
        let axisMax = d3.max(values) || axisMin;
        // The domains
        let refDomain = new d3.InternSet(finalData.map(d => d.referenceAxis));
        let dataDomain = [axisMin, axisMax];
        // Ref axis is the axis the holds the user readable references. In a vertical bar chart, this is the X axis
        // Data axis is the axis that holds the values. In a vertical bar chart, this is the Y axis
        // These two are functions.
        /**
         * `refAxis` is a function that receives a string and returns the position of the given string in the ref axis as a number
         * calling `refAxis.bandWidth()` will return the width of each single ref bar
         */
        let refAxis = d3.scaleBand().range([0, isVertical ? width : height]).domain(refDomain).padding(props.removeSpaceBetweenBars ? 0 : 0.2);
        /**
         * `dataAxis` is a function that receives a numerical value and returns the position of the given number in the data axis as a number
         */
        let dataAxis = d3.scaleLinear().domain(dataDomain).range(isVertical ? [height, 0] : [0, width]);
        // Left Axis
        // In a vertical chart, this is the data axis
        let leftAxis = d3.axisLeft(props.direction === 'vertical' ? dataAxis : refAxis);
        // If the chart is very small and the values of the data are large, the ticks of the data axis can get cramped together
        // So, the implementor can set a maximum number of ticks to be displayed
        if (props.tickCount) {
            leftAxis.ticks(props.tickCount);
        }
        svg.append("g").call(leftAxis);
        // Bottom axis
        // In a vertical chart, this is the ref axis
        svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(props.direction === 'vertical' ? refAxis : dataAxis))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)") // The text displayed in the ref axis is rotated to avoid overlap of long texts
            .style("text-anchor", "end");
        // Rendering the normal bar chart
        if (ct === 'bar') {
            // Bar Containers
            svg
                .selectAll("barContainer")
                .data(finalData)
                .join("rect")
                .attr("x", d => isVertical ? refAxis(d.referenceAxis) : dataAxis(0))
                .attr("y", d => isVertical ? dataAxis(0) : refAxis(d.referenceAxis))
                .attr("width", d => isVertical ? refAxis.bandwidth() : dataAxis(0))
                .attr("height", d => isVertical ? height - dataAxis(0) : refAxis.bandwidth())
                .attr("class", getFillClass)
                .on('mouseover', function (d, i) { displayTooltip(this, d, i.referenceAxis, i.dataDisplay); }) // Using `function` keyword is necessary to access `this`
                .on('mouseout', function () { removeTooltip(this, false); });
            // Each Bar
            svg
                .selectAll("rect")
                .transition()
                .duration(animationDuration)
                .attr(isVertical ? "y" : "x", (d) => {
                if (isVertical)
                    return dataAxis((axisMin < 0 && d.dataAxis < 0) ? 0 : d.dataAxis);
                else
                    return dataAxis((axisMin < 0 && d.dataAxis < 0) ? d.dataAxis : 0);
            })
                .attr(isVertical ? "height" : "width", (d) => {
                if (isVertical)
                    return height - dataAxis((axisMin < 0 && d.dataAxis < 0) ? axisMin - d.dataAxis : d.dataAxis + axisMin);
                else
                    return dataAxis((axisMin < 0 && d.dataAxis < 0) ? axisMin - d.dataAxis : d.dataAxis + axisMin);
            });
            // .delay((d, i) => { return i * 20 })            
        }
        else {
            /**
             * Refactoring the data to be used by stacked/grouped chart
             * The final data will be
             * {referenceAxis: string, ...{[keys: string]: number}}
             * The keys (except referenceAxis) will be stacked together
             */
            let s = props.data.map((z, i) => {
                return { referenceAxis: z.referenceAxis, ...z.dataAxis };
            });
            if (props.groupType === 'stacked') {
                // In the stacked bar, the data should be passed to the stack object of `d3`
                let keys = Object.keys(props.data[0].dataAxis);
                const stack = d3.stack().keys(keys);
                var sel = svg
                    // .select('g')
                    .selectAll('g.series')
                    .data(stack(s))
                    .join('g')
                    .classed('series', true)
                    .style('fill', (d) => d3.schemeTableau10[d.index])
                    .attr("title", (d, i) => keys[d.index]);
                sel.selectAll('rect')
                    .data((d, i, z) => d)
                    .join('rect')
                    .attr('x', (d) => isVertical ? refAxis(d.data.referenceAxis.toString()) : dataAxis(d[0]))
                    .attr('y', (d) => isVertical ? dataAxis(d[1]) : refAxis(d.data.referenceAxis.toString()))
                    .attr('width', d => isVertical ? refAxis.bandwidth() : dataAxis(d[1]) - dataAxis(d[0]))
                    .attr('height', d => isVertical ? dataAxis(d[0]) - dataAxis(d[1]) : refAxis.bandwidth())
                    .on('mouseover', function (d, i) { displayTooltip(this, d, undefined, (i[1] - i[0]).toString()); })
                    .on('mouseout', function () { removeTooltip(this, true); });
            }
            else {
                // Rendering the grouped chart
                // Here, the data is shaped into an array of objects: {referenceAxis: string, groupName: string, groupValue: number}[]
                let flatData = props.data.flatMap(z => {
                    return Object.keys(z.dataAxis).map(x => {
                        return { referenceAxis: z.referenceAxis, groupName: x, groupValue: z.dataAxis[x] };
                    });
                });
                // const refs = d3.map(flatData, q => q.referenceAxis);
                const groups = [...new Set(d3.map(flatData, q => q.groupName))];
                // const groupValues = d3.map(flatData, q => q.groupValue);                
                // The position of each bar in a group
                // If a each group of bars have, let's say, 5 bars, using this function we can get the correct position of each bar in the group
                // This is a function that receives the name of the group and returns the position of the group
                const xzScale = d3.scaleBand(Object.keys(props.data[0].dataAxis), [0, refAxis.bandwidth()]).padding(0);
                svg.append('g')
                    .selectAll('rect')
                    .data(flatData)
                    .join('rect')
                    .attr('y', (d) => isVertical ? dataAxis(d.groupValue) : refAxis(d.referenceAxis.toString()) + xzScale(d.groupName))
                    .attr('x', (d) => isVertical ? refAxis(d.referenceAxis.toString()) + xzScale(d.groupName) : dataAxis(0))
                    .attr('width', d => isVertical ? refAxis.bandwidth() / groups.length : dataAxis(d.groupValue) - dataAxis(0))
                    .attr('height', d => isVertical ? dataAxis(0) - dataAxis(d.groupValue) : refAxis.bandwidth() / groups.length)
                    .attr("fill", d => d3.schemeTableau10[groups.indexOf(d.groupName) % 10])
                    .on('mouseover', function (d, i) { displayTooltip(this, d, i.groupName, (i.groupValue || 0).toString()); })
                    .on('mouseout', function () { removeTooltip(this, true); });
            }
        }
        if (!isVertical && props.showInlineValue) {
            // Adding the value of the bars in the cahrt
            svg.selectAll(".text")
                .data(finalData)
                .enter()
                .append("text")
                .attr("class", (d) => {
                let c = "typography-paragraph-small";
                if (ct !== 'bar')
                    return c;
                let section = getInlineValueSection(d, axisMin, axisMax);
                if (section === 1 || section === -1) {
                    c += ` fill-color--${d.fillColor || 'primary'}-text`;
                }
                return c;
            })
                .attr("x", (d) => {
                let section = getInlineValueSection(d, axisMin, axisMax);
                if (section === 2) {
                    return dataAxis(d.total || d.dataAxis) + 5;
                }
                else if (section === -1) {
                    return dataAxis(d.total || d.dataAxis) + 5;
                }
                else if (section === -2) {
                    return 10;
                }
                else {
                    return dataAxis(0) + 5;
                }
            })
                .attr("y", (d) => refAxis(d.referenceAxis))
                .attr("dy", refAxis.bandwidth() / 1.5)
                .text((d) => {
                if (d.dataDisplay !== undefined)
                    return d.dataDisplay;
                else {
                    let t = d.total || 0;
                    if (d.dataFormatter)
                        return d.dataFormatter(t);
                    else
                        return t.toString();
                }
            });
        }
    }, [props, props.data, propsRef, props.height, props.showInlineValue, props.margin, props.direction, props.sorted, props.tickCount, props.groupType, props.removeSpaceBetweenBars]);
    return _jsxs("div", { className: 'vieolo-bar-chart width--pc-100 height--pc-100', children: [(props.title || (props.data.length > 0 && typeof props.data[0].dataAxis !== 'number')) &&
                _jsxs(GridContainer, { children: [_jsx(Grid, { xl: 6, children: _jsx(Typography, { text: props.title || '', type: 'title-medium' }) }), _jsx(Grid, { xl: 6, children: (props.data.length > 0 && typeof props.data[0].dataAxis !== 'number') &&
                                _jsx(Flex, { columnGap: 'one', wrap: 'wrap', justifyContent: 'end', children: Object.keys(props.data[0].dataAxis).map((c, i) => {
                                        return _jsxs(Flex, { alignItems: 'center', columnGap: 'half', children: [_jsx("div", { style: { backgroundColor: d3.schemeTableau10[i], height: 15, width: 15, borderRadius: '50%' } }), _jsx(Typography, { text: c, type: 'paragraph-small' })] }, c + i);
                                    }) }) })] }), _jsx("div", { ref: ref, className: "width--pc-100 height--pc-100" })] });
}
function getFillClass(d) {
    return `fill-color--${d.fillColor || 'primary'}-normal`;
}
function getHoverClass(d) {
    return `fill-color--${d.fillColor || 'primary'}-light`;
}
function sortData(data) {
    if (data.length === 0)
        return data;
    if (typeof data[0].dataAxis === 'number') { // BarChartData
        return [...data].sort((a, b) => b.dataAxis - a.dataAxis);
    }
    else { // StackedBarChartData
        return [...data].sort((a, b) => {
            return (b.total || 0) - (a.total || 0);
        });
    }
}
function getDataAxisMin(values) {
    let sorted = [...values].sort((a, b) => a - b);
    if (sorted[0] >= 0)
        return 0;
    else if (sorted[0] < 0 && sorted[sorted.length - 1] > 0)
        return sorted[0];
    else
        return sorted[0];
}
/**
 * This function determines the section of the placement of the inline value.
 *
 * Values above 0 mean that the text is appearing for a positive value, on the right side of the 0 axis and vice versa
 * 1 (or -1) mean that the text appears inside the bar and 2 (or -2) means that text appears outside of the bar
 *
 */
function getInlineValueSection(d, axisMin, axisMax) {
    let t = typeof d.dataAxis === 'number' ? d.dataAxis : d.total;
    if (t >= 0) {
        if (t < (axisMax / 3)) {
            return 2;
        }
        else {
            return 1;
        }
    }
    else {
        if (Math.abs(t) < (Math.abs(axisMin) / 3)) {
            return -2;
        }
        else {
            return -1;
        }
    }
}
