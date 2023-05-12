/// <reference types="react" />
import VDate from '@vieolo/vdate';
import { ColorOptionType } from '../types';
export type CalendarStatisticData = {
    [day: string]: {
        text: string;
        disabled?: boolean;
        percent?: number | {
            value: number;
            color: ColorOptionType;
        };
    };
};
export default function CalendarStatistic(props: {
    selectedMonth: VDate;
    /** A map of data to be displayed for each day of the month */
    data: CalendarStatisticData;
    /** The text to be displayed for the days that have no data */
    defaultText: string;
    showPercentage?: boolean;
}): JSX.Element;
