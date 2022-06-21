import { jsx as _jsx } from "react/jsx-runtime";
// React
import { useEffect, useRef } from 'react';
// Intalled Packages
import * as d3 from 'd3';
export default function BarChart(props) {
    let ref = useRef(null);
    useEffect(() => {
        function getTooltipHTML(values) {
            return values.map(v => {
                return `<p class="typography-paragraph-medium">${v.title}: ${v.value}</p>`;
            }).join("");
        }
        d3.select(ref.current).html("");
        let finalMargin = props.margin || { top: 30, right: 30, bottom: 70, left: 60 };
        let width = (ref.current ? ref.current.offsetWidth : 200) - finalMargin.left - finalMargin.right;
        let height = props.height - finalMargin.top - finalMargin.bottom;
        let finalData = props.data;
        let hoverColor = '#eec42d';
        let staticColor = '#437c90';
        if (props.sorted)
            finalData = props.data.sort((a, b) => b.dataAxis - a.dataAxis);
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
                .domain([props.dataAxisMin === 'smallest value' ? d3.min(finalData.map(d => d.dataAxis)) : 0, d3.max(finalData.map(d => d.dataAxis))])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));
            svg.selectAll("mybar")
                .data(finalData)
                .join("rect")
                .attr("x", d => x(d.referenceAxis))
                .attr("y", d => y(0))
                .attr("width", x.bandwidth())
                .attr("height", d => height - y(0))
                .attr("fill", finalData[0].fillColor || "#000000")
                .on('mouseover', function (d, i) {
                let rectElement = d.toElement;
                tooltip
                    .html(getTooltipHTML([{ title: i.referenceAxis, value: i.dataDisplay }]))
                    .style('visibility', 'visible')
                    .style('left', (rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2)) + 'px');
                d3.select(this).transition().attr('fill', hoverColor);
            })
                .on('mouseout', function () {
                tooltip.html(``).style('visibility', 'hidden');
                d3.select(this).transition().attr('fill', staticColor);
            });
            svg.selectAll("rect")
                .transition()
                .duration(500)
                .attr("y", d => y(d.dataAxis))
                .attr("height", d => height - y(d.dataAxis))
                .delay((d, i) => { return i * 100; });
        }
        else {
            // Y axis
            const y = d3.scaleBand()
                .range([0, height])
                .domain(finalData.map(d => d.referenceAxis))
                .padding(.1);
            svg.append("g")
                .call(d3.axisLeft(y));
            // Add X axis
            const x = d3.scaleLinear()
                .domain([props.dataAxisMin === 'smallest value' ? d3.min(finalData.map(d => d.dataAxis)) : 0, d3.max(finalData.map(d => d.dataAxis))])
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
                .attr("y", d => y(d.referenceAxis))
                .attr("width", d => x(0))
                .attr("height", y.bandwidth())
                .attr("fill", finalData[0].fillColor || "#000000");
            svg.selectAll("mybar")
                .data(finalData)
                .join("rect")
                .attr("x", d => x(0))
                .attr("y", d => y(d.referenceAxis))
                .attr("width", d => x(0))
                .attr("height", y.bandwidth())
                .attr("fill", finalData[0].fillColor || "#000000")
                .on('mouseover', function (d, i) {
                let rectElement = d.toElement;
                tooltip
                    .html(getTooltipHTML([{ title: i.referenceAxis, value: i.dataDisplay }]))
                    .style('visibility', 'visible')
                    .style('left', (rectElement.x.baseVal.value + (rectElement.width.baseVal.value / 2)) + 'px');
                d3.select(this).transition().attr('fill', hoverColor);
            })
                .on('mouseout', function () {
                tooltip.html(``).style('visibility', 'hidden');
                d3.select(this).transition().attr('fill', staticColor);
            });
            svg.selectAll("rect")
                .transition()
                .duration(500)
                .attr("x", d => x(0))
                .attr("width", d => x(d.dataAxis))
                .delay((d, i) => { return i * 100; });
        }
    }, [props.data, props.dataAxisMin, props.height, props.margin, props.direction, props.sorted]);
    return _jsx("div", { ref: ref, className: 'vieolo-bar-chart width--pc-100 height--pc-100' }, void 0);
}
