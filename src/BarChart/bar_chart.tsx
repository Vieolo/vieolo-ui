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

export default function BarChart(props: {
    direction: 'horizontal' | 'vertical',
    sorted?: boolean,
    data: BarChartData[],
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

        if (props.sorted) finalData = [...props.data].sort((a, b) => b.dataAxis - a.dataAxis);

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


        // Creating the vertical chart
        if (props.direction === 'vertical') {

            // X axis
            const x = d3.scaleBand()
                .range([0, width])
                .domain(finalData.map(d => d.referenceAxis))
                .padding(0.2);

            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            let yBase = props.dataAxisMin === 'smallest value'
                ? d3.min(finalData.map(d => d.dataAxis))!
                : 0

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([yBase, d3.max(finalData.map(d => d.dataAxis))!]
                ).range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.selectAll("mybar")
                .data(finalData)
                .join("rect")
                .attr("x", d => x(d.referenceAxis)!)
                .attr("y", d => y(0))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(0))
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

            svg.selectAll("rect")
                .transition()
                .duration(200)
                .attr("y", (d: any) => y((yBase < 0 && d.dataAxis < 0) ? 0 : d.dataAxis)!)
                .attr("height", (d: any) => height - y((yBase < 0 && d.dataAxis < 0) ? yBase - d.dataAxis : d.dataAxis + yBase))
                .delay((d, i) => { return i * 20 })
        } else {
            // Y axis
            const y = d3.scaleBand()
                .range([0, height])
                .domain(finalData.map(d => d.referenceAxis))
                .padding(.1);

            svg.append("g")
                .call(d3.axisLeft(y))

            let xBase = props.dataAxisMin === 'smallest value' ? d3.min(finalData.map(d => d.dataAxis))! : 0;

            // Add X axis
            const x = d3.scaleLinear()
                .domain([xBase, d3.max(finalData.map(d => d.dataAxis))!])
                .range([0, width]);

            svg.append("g")
                .attr("transform", `translate(0, ${height})`)
                .call(d3.axisBottom(x))
                .selectAll("text")
                .attr("transform", "translate(-10,0)rotate(-45)")
                .style("text-anchor", "end");

            //Bars
            svg.selectAll("myRect")
                .data(finalData)
                .join("rect")
                .attr("x", d => x(0))
                .attr("y", d => y(d.referenceAxis)!)
                .attr("width", d => x(0))
                .attr("height", y.bandwidth())
                .attr("class", getFillClass)


            svg.selectAll("mybar")
                .data(finalData)
                .join("rect")
                .attr("x", d => x(0))
                .attr("y", d => y(d.referenceAxis)!)
                .attr("width", d => x(0))
                .attr("height", y.bandwidth())
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

            svg.selectAll("rect")
                .transition()
                .duration(200)
                .attr("x", (d: any) => x((xBase < 0 && d.dataAxis < 0) ? d.dataAxis : 0)!)
                .attr("width", (d: any) => x((xBase < 0 && d.dataAxis < 0) ? xBase - d.dataAxis : d.dataAxis + xBase))
                .delay((d, i) => { return i * 20 })

        }


    }, [props.data, props.dataAxisMin, props.height, props.margin, props.direction, props.sorted])

    return <div ref={ref} className='vieolo-bar-chart width--pc-100 height--pc-100'></div>
}


function getFillClass(d: BarChartData | any) : string {
    return `fill-color--${d.fillColor || 'primary'}-normal`
}

function getHoverClass(d: BarChartData | any) : string {
    return `fill-color--${d.fillColor || 'primary'}-light`
}