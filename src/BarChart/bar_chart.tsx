// React
import { useEffect, useRef } from 'react';

// Intalled Packages
import * as d3 from 'd3';

// Types
import { ColorOptionType } from '../types';


export type BarChartData = {
    /** 
     * The X axis in a horizontal bar chart and Y axis in a vertical bar chart.
     * The axis that holds the reference metric
     */
    referenceAxis: string,
    /** 
     * The Y axis in a horizonal bar chart and X axis in a vertical bart chart 
     * The axis that the bars are drawn against
     */
    dataAxis: number,
    fillColor?: ColorOptionType,
    dataDisplay: string
}

export type StackedBarChartData = {
    /** 
     * The X axis in a horizontal bar chart and Y axis in a vertical bar chart.
     * The axis that holds the reference metric
     */
    referenceAxis: string,
    total: number,
    /** 
     * The Y axis in a horizonal bar chart and X axis in a vertical bart chart 
     * 
     * The axis that the bars are drawn against
     * 
     * The keys of the object are group type of stacked data in each bar
     */
    dataAxis: { [key: string]: number },
    dataDisplay?: (value: number) => string
}

export default function BarChart(props: {
    direction: 'horizontal' | 'vertical',
    sorted?: boolean,
    data: BarChartData[],// | StackedBarChartData[],
    dataAxisMin?: 'zero' | 'smallest value',
    ignoreNegativeValues?: boolean,
    height: number,
    margin?: { top: number, right: number, bottom: number, left: number }
}) {

    let ref = useRef<HTMLDivElement>(null);

    useEffect(() => {

        // Creating the Tooltip
        function getTooltipHTML(values: { title: string, value: string }[]) {
            return values.map(v => {
                return `<div>
                    <p class="typography-paragraph-small">${v.title}</p>
                    <p class="typography-paragraph-small font-weight--bold">${v.value}</p>
                </div>`
            }).join("");
        }


        // Selecting the HTML div
        d3.select(ref.current).html("");

        let finalMargin = props.margin || { top: 30, right: 30, bottom: 70, left: 60 };
        let width = (ref.current ? ref.current.offsetWidth : 200) - finalMargin.left - finalMargin.right;
        let height = props.height - finalMargin.top - finalMargin.bottom;
        let finalData = props.data;

        if (props.sorted) finalData = sortData(props.data as any)

        const svg = d3.select(ref.current)
            .append("svg")
            .attr("width", width + finalMargin.left + finalMargin.right)
            .attr("height", height + finalMargin.top + finalMargin.bottom)
            .append("g")
            .attr("transform", `translate(${finalMargin.left}, ${finalMargin.top})`);

        let tooltip = d3
            .select(ref.current)
            .append('div')
            .attr('class', 'vieolo-bar-chart__tooltip')
            .style('visibility', 'hidden');

        let values = finalData.map(d => typeof d.dataAxis === 'number' ? d.dataAxis : (d as any).total)

        let axisMin = props.dataAxisMin === 'smallest value'
            ? d3.min(values)!
            : 0
        let axisMax = d3.max(values)

        let refDomain = new d3.InternSet(finalData.map(d => d.referenceAxis))
        let mainDomain = [axisMin, axisMax]

        let refAxis = d3.scaleBand().range([0, props.direction === 'vertical' ? width : height]).domain(refDomain).padding(0.2)
        let dataAxis = d3.scaleLinear().domain(mainDomain).range(props.direction === 'vertical' ? [height, 0] : [0, width]);

        // Left Axis
        svg.append("g").call(d3.axisLeft(props.direction === 'vertical' ? dataAxis : refAxis as any));

        // Bottom axis
        svg
            .append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(props.direction === 'vertical' ? refAxis : dataAxis as any))
            .selectAll("text")
            .attr("transform", "translate(-10,0)rotate(-45)")
            .style("text-anchor", "end");


        // Bar Containers
        svg
            .selectAll("barContainer")
            .data(finalData)
            .join("rect")
            .attr("x", d => props.direction === 'vertical' ? refAxis(d.referenceAxis)! : dataAxis(0))
            .attr("y", d => props.direction === 'vertical' ? dataAxis(0) : refAxis(d.referenceAxis)!)
            .attr("width", d => props.direction === 'vertical' ? refAxis.bandwidth() : dataAxis(0))
            .attr("height", d => props.direction === 'vertical' ? height - dataAxis(0) : refAxis.bandwidth())
            .attr("class", getFillClass)
            .on('mouseover', function (d, i) {

                let rectElement = d.toElement;

                tooltip
                    .html(
                        getTooltipHTML([{ title: i.referenceAxis, value: i.dataDisplay }])
                    )
                    .style('visibility', 'visible')
                    .style('left', (rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2)) + 'px');

                d3.select(this).transition().attr('class', getHoverClass);
            })
            .on('mouseout', function () {
                tooltip.html(``).style('visibility', 'hidden');
                d3.select(this).transition().attr('class', getFillClass);
            });


        // Each Bar
        svg
            .selectAll("rect")
            .transition()
            .duration(200)
            .attr(props.direction === "vertical" ? "y" : "x", (d: any) => {
                if (props.direction === 'vertical') return dataAxis((axisMin < 0 && d.dataAxis < 0) ? 0 : d.dataAxis)!
                else return dataAxis((axisMin < 0 && d.dataAxis < 0) ? d.dataAxis : 0)!
            })
            .attr(props.direction === "vertical" ? "height" : "width", (d: any) => {
                if (props.direction === 'vertical') return height - dataAxis((axisMin < 0 && d.dataAxis < 0) ? axisMin - d.dataAxis : d.dataAxis + axisMin)
                else return dataAxis((axisMin < 0 && d.dataAxis < 0) ? axisMin - d.dataAxis : d.dataAxis + axisMin)
            })
            .delay((d, i) => { return i * 20 })


    }, [props.data, props.dataAxisMin, props.height, props.margin, props.direction, props.sorted])

    return <div ref={ref} className='vieolo-bar-chart width--pc-100 height--pc-100'></div>
}


function getFillClass(d: BarChartData | any): string {
    return `fill-color--${d.fillColor || 'primary'}-normal`
}

function getHoverClass(d: BarChartData | any): string {
    return `fill-color--${d.fillColor || 'primary'}-light`
}

function sortData(data: BarChartData[]): BarChartData[];
function sortData(data: StackedBarChartData[]): StackedBarChartData[];
function sortData(data: BarChartData[] | StackedBarChartData[]): BarChartData[] | StackedBarChartData[] {
    if (data.length === 0) return data;

    if (typeof data[0].dataAxis === 'number') {  // BarChartData
        return [...(data as BarChartData[])].sort((a, b) => b.dataAxis - a.dataAxis);
    } else {  // StackedBarChartData
        return [...(data as StackedBarChartData[])].sort((a, b) => b.total - a.total);
    }
}