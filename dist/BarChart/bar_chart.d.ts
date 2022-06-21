/// <reference types="react" />
declare type BarChartData = {
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
    fillColor?: string;
    dataDisplay: string;
};
export default function BarChart(props: {
    direction: 'horizontal' | 'vertical';
    sorted?: boolean;
    data: BarChartData[];
    dataAxisMin?: 'zero' | 'smallest value';
    height: number;
    margin?: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}): JSX.Element;
export {};
