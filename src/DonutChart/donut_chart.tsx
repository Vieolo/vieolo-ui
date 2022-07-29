// React
import React, { useState, useEffect, useRef } from 'react';

// Installed Packages
import { toFixed } from '@vieolo/parsers/number_parsers';
import * as d3 from 'd3';

export type DonutChartData = {
    id?: string,
    title: string,
    /** The percent in the data should be ranged between 0 and 1 */
    percent?: number,
    /** The numerical value of data */
    value?: number,
    /** This value is displayed when the legend is selected and is not considered in the calculations */
    displayValue?: string
}

export default function DonutChart(props: {
    innerText?: string,
    data: DonutChartData[],
    includeLegend?: boolean,
    disabled?: boolean,
    height?: number,
    sorted?: boolean,
    selected?: boolean
}) {

    let ref = useRef<HTMLDivElement>(null);
    let [propsRef, setPropsRef] = useState<string>("")    

    useEffect(() => {        

        // If the data is equal to the current state, the function is cancelled
        let stringified = JSON.stringify(props)
        if (propsRef && stringified === propsRef) return        

        setPropsRef(stringified)        

        let finalData = props.data;

        if (props.sorted) {
            finalData = [...props.data].sort((a, b) => {
                return (b.percent || b.value || 0) - (a.percent || a.value || 0)
            })
        }

        // Selecting the HTML div
        d3.select(ref.current).html("");

        // let width = (ref.current ? ref.current.offsetWidth : 200) - finalMargin.left - finalMargin.right;
        // let height = props.height - finalMargin.top - finalMargin.bottom;
        let width = ref.current?.offsetWidth || 400
        let height = props.height || 300

        const N = d3.map(finalData, z => z.title);
        const V = d3.map(finalData, z => z.percent || z.value || 0);
        const I = d3.range(N.length).filter(i => !isNaN(V[i]));

        let names = new d3.InternSet(N);
        let colors = d3.schemeSpectral[names.size % 11];
        const color = d3.scaleOrdinal(names, colors);

        let innerRadius = Math.min(width, height) / 6
        let outerRadius = Math.min(width, height) / 2

        const pie = d3.pie().padAngle(0.02).sort(null).value(i => V[i as any])(I);
        const arc = d3.arc().innerRadius(outerRadius * 0.4).outerRadius(outerRadius * 0.8);
        var outerArc = d3.arc()
            .innerRadius(outerRadius * 0.9)
            .outerRadius(outerRadius * 0.9);        

        const formatValue = d3.format(",");
        let total = finalData.map(z => z.percent || z.value || 0).reduce((a, b) => a + b, 0)
        let title = (i: number) => `${N[i]}\n${formatValue(V[i])}`;
        let percent = (i: number) => `${N[i]} (${toFixed((V[i] / total) * 100, 2)}%)`

        const svg = d3.select(ref.current).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

        svg.append("g")
            .attr("stroke", innerRadius > 0 ? "none" : "white")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .selectAll("path")
            .data(pie)
            .join("path")
            .attr("fill", d => color(N[d.index]))
            .attr("d", arc as any)
            .append("title")
            .text(function (d) {
                if (finalData[0].percent !== undefined) {
                    return percent(d.index);
                } else {
                    return title(d.index)
                }
            })

        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");


        var text = svg.select(".labels").selectAll("text")
            .data(pie);

        text.enter()
            .append("text")
            .attr("class", "typography-paragraph-small")
            .attr("dy", ".35em")
            .text(function (d) {
                return percent(d.index)
            })
            .merge(text as any)
            .transition()
            .duration(1000)
            .attrTween("transform", function (d) {
                (this as any)._current = (this as any)._current || d;
                const interpolate = d3.interpolate((this as any)._current, d);
                (this as any)._current = interpolate(0);
                return function (t) {
                    const d2 = interpolate(t);
                    const pos = outerArc.centroid(d2 as any);
                    pos[0] = outerRadius * (midAngle(d2) < Math.PI ? 1 : -1);
                    return "translate(" + pos + ")";
                };
            })
            .styleTween("text-anchor", function (d) {
                (this as any)._current = (this as any)._current || d;
                const interpolate = d3.interpolate((this as any)._current, d);
                (this as any)._current = interpolate(0);
                return function (t) {
                    const d2 = interpolate(t);
                    return midAngle(d2) < Math.PI ? "start" : "end";
                };
            });

        text.exit()
            .remove();

        function midAngle(d: any) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }

        const polyline = svg
            .select(".lines")
            .selectAll("polyline")
            .data(pie);

        polyline
            .join("polyline")
            .attr("stroke", "black")
            .attr("stroke-width", "1px")
            .attr("fill", "none")
            .transition()
            .duration(1000)
            .attrTween("points", function (d) {
                (this as any)._current = (this as any)._current || d;
                const interpolate = d3.interpolate((this as any)._current, d);
                (this as any)._current = interpolate(0);
                return function (t) {
                    const d2 = interpolate(t);
                    const pos = outerArc.centroid(d2 as any);
                    pos[0] = outerRadius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                    return [arc.centroid(d2 as any), outerArc.centroid(d2 as any), pos] as any;
                };
            });

        polyline.exit().remove();

        
    }, [props, props.data, propsRef, props.height, props.sorted])


    return <div className={`vieolo-donut-chart width--pc-100 height--pc-100 ${props.disabled ? "disabled" : ""}`} ref={ref}></div>
}