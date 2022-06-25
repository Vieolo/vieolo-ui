/// <reference types="react" />
export default function DonutChart(props: {
    innerText?: string;
    data: {
        title: string;
        /** The percent in the data should be ranged between 0 and 1 */
        percent: number;
        /** This value is displayed when the legend is selected and is not considered in the calculations */
        displayValue?: string;
    }[];
    includeLegend?: boolean;
    disabled?: boolean;
}): JSX.Element;
