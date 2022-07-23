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
    referenceAxis: string,
    referenceAxisNumerical: number,
    dataAxis: { [key: string]: number },
    dataFormatter?: (n: number) => string,
    total?: number
}

export default function BarChart(props: {
    direction: 'horizontal' | 'vertical',
    sorted?: boolean,
    data: (BarChartData | StackedBarChartData)[],
    ignoreNegativeValues?: boolean,
    height: number,
    margin?: { top: number, right: number, bottom: number, left: number },
    showInlineValue?: boolean
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

        let ct: 'bar' | 'stacked' = (props.data[0] && typeof (props.data[0] as StackedBarChartData).dataAxis !== "number") ? 'stacked' : 'bar'
        let isVertical = props.direction === 'vertical'


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

        if (ct === 'stacked') finalData = (finalData as StackedBarChartData[]).map((z: StackedBarChartData) => {
            if (!z.total) z.total = Object.values(z.dataAxis).reduce((a, b) => a + b, 0)
            return z
        })

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

        let values = finalData.map(d => ct === 'bar' ? (d as BarChartData).dataAxis : Object.values((d as StackedBarChartData).dataAxis).reduce((a, b) => a + b, 0))

        let axisMin = getDataAxisMin(values)
        let axisMax = d3.max(values) || axisMin

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

        if (ct === 'bar') {
            // Bar Containers
            svg
                .selectAll("barContainer")
                .data(finalData as BarChartData[])
                .join("rect")
                .attr("x", d => isVertical ? refAxis(d.referenceAxis)! : dataAxis(0))
                .attr("y", d => isVertical ? dataAxis(0) : refAxis(d.referenceAxis)!)
                .attr("width", d => isVertical ? refAxis.bandwidth() : dataAxis(0))
                .attr("height", d => isVertical ? height - dataAxis(0) : refAxis.bandwidth())
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
                .attr(isVertical ? "y" : "x", (d: any) => {
                    if (isVertical) return dataAxis((axisMin < 0 && d.dataAxis < 0) ? 0 : d.dataAxis)!
                    else return dataAxis((axisMin < 0 && d.dataAxis < 0) ? d.dataAxis : 0)!
                })
                .attr(isVertical ? "height" : "width", (d: any) => {
                    if (isVertical) return height - dataAxis((axisMin < 0 && d.dataAxis < 0) ? axisMin - d.dataAxis : d.dataAxis + axisMin)
                    else return dataAxis((axisMin < 0 && d.dataAxis < 0) ? axisMin - d.dataAxis : d.dataAxis + axisMin)
                })
                .delay((d, i) => { return i * 20 })

            if (!isVertical && props.showInlineValue) {
                svg.selectAll(".text")
                    .data(finalData)
                    .enter()
                    .append("text")
                    .attr("class", (d: any) => {
                        let section = getInlineValueSection(d, axisMin, axisMax)
                        let c = "typography-paragraph-small";

                        if (section === 1 || section === -1) {
                            c += ` fill-color--${d.fillColor || 'primary'}-text`
                        }                        
                        return c
                    })
                    .attr("x", (d: any) => {
                        let section = getInlineValueSection(d, axisMin, axisMax)
                        if (section === 2) {
                            return dataAxis(d.dataAxis) + 5
                        } else if (section === -1) {
                            return dataAxis(d.dataAxis) + 5
                        } else if (section === -2) {
                            return 10
                        } else {
                            return dataAxis(0) + 5
                        }
                    })
                    .attr("y", (d: any) => refAxis(d.referenceAxis)!)
                    .attr("dy", refAxis.bandwidth() / 1.5)
                    .text((d: any) => d.dataDisplay);
            }

        } else {

            let s: { [key: string]: number | string }[] = (props.data as StackedBarChartData[]).map((z, i) => {
                return { referenceAxis: z.referenceAxis, ...z.dataAxis }
            })

            const stack = d3.stack()
                .keys(Object.keys((props.data as StackedBarChartData[])[0].dataAxis))


            var sel = svg
                .select('g')
                .selectAll('g.series')
                .data(stack(s as any))
                .join('g')
                .classed('series', true)
                .style('fill', (d) => d3.schemeTableau10[d.index]);

            sel.selectAll('rect')
                .data((d) => d)
                .join('rect')
                .attr('y', (d) => isVertical ? dataAxis(d[1]) : refAxis(d.data.referenceAxis.toString())!)
                .attr('x', (d) => isVertical ? refAxis(d.data.referenceAxis.toString())! : dataAxis(d[0]))
                .attr('width', d => isVertical ? refAxis.bandwidth() : dataAxis(d[1]) - dataAxis(d[0]))
                .attr('height', d => isVertical ? dataAxis(d[0]) - dataAxis(d[1]) : refAxis.bandwidth())
                .on('mouseover', function (d, i) {

                    let rectElement = d.toElement;
                    let title = ''
                    try {
                        title = rectElement.attributes["title"].textContent;
                    } catch (error) {

                    }

                    tooltip
                        .html(
                            getTooltipHTML([{ title: title, value: (i[1] - i[0]).toString() }])
                        )
                        .style('visibility', 'visible')
                        .style('left', (rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2)) + 'px');

                    d3.select(this).transition().attr('class', getHoverClass);
                })
                .on('mouseout', function () {
                    tooltip.html(``).style('visibility', 'hidden');
                    d3.select(this).transition().attr('class', '')
                });
        }



    }, [props.data, props.height, props.showInlineValue, props.margin, props.direction, props.sorted])

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

    if (typeof (data[0] as BarChartData).dataAxis === 'number') {  // BarChartData
        return [...(data as BarChartData[])].sort((a, b) => b.dataAxis - a.dataAxis);
    } else {  // StackedBarChartData
        return [...(data as StackedBarChartData[])].sort((a, b) => {
            return (b.total || 0) - (a.total || 0)
        })
    }
}


function getDataAxisMin(values: number[]): number {
    let sorted = [...values].sort((a, b) => a - b);

    if (sorted[0] >= 0) return 0
    else if (sorted[0] < 0 && sorted[sorted.length - 1] > 0) return sorted[0]
    else return sorted[0]
}


/**
 * This function determines the section of the placement of the inline value.
 * 
 * Values above 0 mean that the text is appearing for a positive value, on the right side of the 0 axis and vice versa
 * 1 (or -1) mean that the text appears inside the bar and 2 (or -2) means that text appears outside of the bar
 * 
 */
function getInlineValueSection(d: BarChartData, axisMin: number, axisMax: number) : number {
    if (d.dataAxis >= 0) {
        if (d.dataAxis < (axisMax / 3)) {
            return 2
        } else {
            return 1
        }
    } else {
        if (Math.abs(d.dataAxis) < (Math.abs(axisMin) / 3)) {
            return -2
        } else {
            return -1
        }
    }   
}