// React
import { useEffect, useRef } from 'react';

// Intalled Packages
import * as d3 from 'd3';


type BarChartData = {
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
    fillColor?: string
}

export default function BarChart(props: {
    direction: 'horizontal' | 'vertical',
    sorted?: boolean,
    data: BarChartData[],
    dataAxisMin?: 'zero' | 'smallest value',
    height: number,
    margin?: { top: number, right: number, bottom: number, left: number }
}) {

    let ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        d3.select(ref.current).html("");

        let finalMargin = props.margin || { top: 30, right: 30, bottom: 70, left: 60 };
        let width = (ref.current ? ref.current.offsetWidth : 200) - finalMargin.left - finalMargin.right;
        let height = props.height - finalMargin.top - finalMargin.bottom;
        let finalData = props.data;
        let hoverColor = '#eec42d';
        let staticColor = '#437c90';

        if (props.sorted) finalData = props.data.sort((a, b) => b.dataAxis - a.dataAxis);

        const svg = d3.select(ref.current)
            .append("svg")
            .attr("width", width + finalMargin.left + finalMargin.right)
            .attr("height", height + finalMargin.top + finalMargin.bottom)
            .append("g")
            .attr("transform", `translate(${finalMargin.left}, ${finalMargin.top})`);

        let tooltip = d3
            .select(ref.current)
            .append('div')
            .attr('class', 'd3-tooltip')
            .style('position', 'absolute')
            .style('z-index', '10')
            .style('visibility', 'hidden')
            .style('padding', '10px')
            .style('background', 'rgba(0,0,0,0.6)')
            .style('border-radius', '4px')
            .style('color', '#fff')
            .text('a simple tooltip');

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

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([props.dataAxisMin === 'smallest value' ? d3.min(finalData.map(d => d.dataAxis))! : 0, d3.max(finalData.map(d => d.dataAxis))!])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            svg.selectAll("mybar")
                .data(finalData)
                .join("rect")
                .attr("x", d => x(d.referenceAxis)!)
                .attr("y", d => y(0))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(0))
                .attr("fill", finalData[0].fillColor || "#000000")
                .on('mouseover', function (d, i) {
                    console.log(d);
                    tooltip
                      .html(
                        `<div>Country: ${i.dataAxis}</div><div>Value: ${i.referenceAxis}</div>`
                      )
                      .style('visibility', 'visible')
                      .style('top', d.pageY - 10 + 'px')
                        .style('left', d.pageX + 10 + 'px');;

                    d3.select(this).transition().attr('fill', hoverColor);
                })                
                .on('mouseout', function () {
                    tooltip.html(``).style('visibility', 'hidden');
                    d3.select(this).transition().attr('fill', staticColor);
                });

            svg.selectAll("rect")
                .transition()
                .duration(500)
                .attr("y", d => y((d as any).dataAxis)!)
                .attr("height", d => height - y((d as any).dataAxis))
                .delay((d, i) => { return i * 100 })
        } else {
            // Y axis
            const y = d3.scaleBand()
                .range([0, height])
                .domain(finalData.map(d => d.referenceAxis))
                .padding(.1);
            svg.append("g")
                .call(d3.axisLeft(y))

            // Add X axis
            const x = d3.scaleLinear()
                .domain([props.dataAxisMin === 'smallest value' ? d3.min(finalData.map(d => d.dataAxis))! : 0, d3.max(finalData.map(d => d.dataAxis))!])
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
                .attr("fill", finalData[0].fillColor || "#000000");

            svg.selectAll("rect")
                .transition()
                .duration(500)
                .attr("x", d => x(0)!)
                .attr("width", d => x((d as any).dataAxis))
                .delay((d, i) => { return i * 100 })

        }


    }, [props.data, props.dataAxisMin, props.height, props.margin, props.direction, props.sorted])

    return <div ref={ref} className='width--pc-100 height--pc-100'></div>
}