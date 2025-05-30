/// <reference types="react" />
import { ColorOptionType } from '../types/types';
export type DonutChartData = {
    id?: string;
    title: string;
    /** The percent in the data should be ranged between 0 and 1. If this field is ommited, the `value` field is used instead */
    percent?: number;
    /** The numerical value of data. The `percent` value takes precedent over this value. If both values are ommited, `0` is used instead. */
    value?: number;
    /** This value is displayed when the legend is selected and is not considered in the calculations */
    displayValue?: string;
    selected?: boolean;
    color?: ColorOptionType;
};
export default function DonutChart(props: {
    innerText?: string;
    data: DonutChartData[];
    includeLegend?: boolean;
    disabled?: boolean;
    /** if ommited, The default value of 300px is used instead */
    height?: number;
    /** default: 400px */
    width?: number;
    /** The viewbox of the SVG */
    viewbox?: string;
    sorted?: boolean;
    removeLabels?: boolean;
    onClick?: (d: DonutChartData) => void;
}): JSX.Element;
