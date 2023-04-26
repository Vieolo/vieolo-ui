/// <reference types="react" />
import { ColorOptionType } from '../types';
export type BarChartData = {
    /**
     * The X axis in a horizontal bar chart and Y axis in a vertical bar chart.
     * The axis that holds the reference metric
     */
    referenceAxis: string;
    /**
     * The Y axis in a horizonal bar chart and X axis in a vertical bart chart
     * The axis that the bars are drawn against
     */
    dataAxis: number;
    fillColor?: ColorOptionType;
    dataDisplay: string;
};
export type StackedBarChartData = {
    referenceAxis: string;
    referenceAxisNumerical: number;
    dataAxis: {
        [key: string]: number;
    };
    dataFormatter?: (n: number) => string;
    total?: number;
};
export default function BarChart(props: {
    title?: string;
    direction: 'horizontal' | 'vertical';
    sorted?: boolean;
    data: (BarChartData | StackedBarChartData)[];
    ignoreNegativeValues?: boolean;
    height?: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    showInlineValue?: boolean;
    tickCount?: number;
    groupType?: 'stacked' | 'grouped';
    removeSpaceBetweenBars?: boolean;
    shortenTickText?: boolean;
    tickFormat?: (t: string) => string;
    maxRefLength?: number;
}): JSX.Element;
