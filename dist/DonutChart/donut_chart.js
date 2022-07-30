import { jsx as _jsx } from "react/jsx-runtime";
// React
import { useState, useEffect, useRef } from 'react';
// Installed Packages
import { toFixed } from '@vieolo/parsers/number_parsers';
import * as d3 from 'd3';
export default function DonutChart(props) {
    let ref = useRef(null);
    let [propsRef, setPropsRef] = useState("");
    useEffect(() => {
        var _a;
        // If the data is equal to the current state, the function is cancelled
        let stringified = JSON.stringify(props);
        if (propsRef && stringified === propsRef)
            return;
        setPropsRef(stringified);
        // Sorting the data if necessary
        // Sorting the data here, instead of the source, allows the parent to maintain the data more easily
        let finalData = props.data;
        if (props.sorted) {
            finalData = [...props.data].sort((a, b) => {
                return (b.percent || b.value || 0) - (a.percent || a.value || 0);
            });
        }
        // If at least of the items are selected
        // This means that the chart is in the selected mode
        let hasSelected = finalData.some(z => z.selected);
        // Selecting the HTML div
        d3.select(ref.current).html("");
        // Calculating the width and height of the chart
        let width = ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.offsetWidth) || 400;
        let height = Math.min(width * 0.4, props.height || 300);
        // List of titles (N), values (V), and the final filtered list of values (I)
        const N = props.data.length === 0 ? [""] : d3.map(finalData, z => z.title);
        const V = props.data.length === 0 ? [1] : d3.map(finalData, z => z.percent || z.value || 0);
        const I = d3.range(N.length).filter(i => !isNaN(V[i]));
        // Names and colors of the chart
        let names = new d3.InternSet(N);
        let colors = d3.schemeSpectral[Math.min(names.size || 1, 11)];
        const color = props.data.length > 0 ? d3.scaleOrdinal(names, colors) : (i) => "#ddd";
        // Calculating the radius and arcs of the chart
        let innerRadius = Math.min(width, height) / 6;
        let outerRadius = Math.min(width, height) / 2;
        const pie = d3.pie().padAngle(0.02).sort(null).value(i => V[i])(I);
        const arc = d3.arc().innerRadius(outerRadius * 0.4).outerRadius(outerRadius * 0.8);
        var outerArc = d3.arc().innerRadius(outerRadius * 0.9).outerRadius(outerRadius * 0.9);
        // The total values of the chart
        // This is used to calculate the percentage of each slice
        let total = finalData.map(z => z.percent || z.value || 0).reduce((a, b) => a + b, 0);
        // The title and value of the 
        const formatValue = d3.format(",");
        let title = (i) => `${N[i]}\n${formatValue(V[i])}`;
        let percent = (i) => `${N[i]} (${toFixed((V[i] / total) * 100, 2)}%)`;
        // Creating the SVG element
        const svg = d3.select(ref.current).append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height])
            .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
        // Creating the slices with possible onClick method
        svg.append("g")
            .attr("stroke", innerRadius > 0 ? "none" : "white")
            .attr("stroke-width", 1)
            .attr("stroke-linejoin", "round")
            .selectAll("path")
            .data(pie)
            .join("path")
            .attr("fill", d => {
            if (hasSelected && !finalData[d.index].selected)
                return "#ddd";
            return color(N[d.index]);
        })
            .attr("d", arc)
            .on("click", (e, d) => {
            if (props.onClick) {
                props.onClick(finalData[d.index]);
            }
        })
            .append("title")
            .text(function (d) {
            if (finalData.length === 0) {
                return "";
            }
            else if (finalData[0].percent !== undefined) {
                return percent(d.index);
            }
            else {
                return title(d.index);
            }
        });
        if (props.data.length === 0)
            return;
        // Creating the groups for lables and lines
        svg.append("g")
            .attr("class", "labels");
        svg.append("g")
            .attr("class", "lines");
        // Creating the texts
        var text = svg.select(".labels").selectAll("text")
            .data(pie);
        text.enter()
            .append("text")
            .attr("class", "typography-paragraph-small")
            .attr("dy", ".35em")
            .text(function (d) {
            if (hasSelected && !finalData[d.index].selected)
                return "";
            return percent(d.index);
        })
            .merge(text)
            .transition()
            .duration(1000)
            .attrTween("transform", function (d) {
            this._current = this._current || d;
            const interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                const d2 = interpolate(t);
                const pos = outerArc.centroid(d2);
                pos[0] = outerRadius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate(" + pos + ")";
            };
        })
            .styleTween("text-anchor", function (d) {
            this._current = this._current || d;
            const interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                const d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start" : "end";
            };
        });
        text.exit()
            .remove();
        function midAngle(d) {
            return d.startAngle + (d.endAngle - d.startAngle) / 2;
        }
        // Creating the lines connecting the lables to the slices
        const polyline = svg
            .select(".lines")
            .selectAll("polyline")
            .data(pie);
        polyline
            .join("polyline")
            .attr("stroke", "black")
            .attr("stroke-width", d => {
            if (hasSelected && !finalData[d.index].selected)
                return "0px";
            return "1px";
        })
            .attr("fill", "none")
            .transition()
            .duration(1000)
            .attrTween("points", function (d) {
            this._current = this._current || d;
            const interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                const d2 = interpolate(t);
                const pos = outerArc.centroid(d2);
                pos[0] = outerRadius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
            };
        });
        polyline.exit().remove();
    }, [props, props.data, propsRef, props.height, props.sorted]);
    return _jsx("div", { className: `vieolo-donut-chart width--pc-100 height--pc-100 ${props.disabled ? "disabled" : ""}`, ref: ref }, void 0);
}
