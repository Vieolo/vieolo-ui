/// <reference types="react" />
import VDate from '@vieolo/date';
export declare enum PeriodOptions {
    day = "Day",
    week = "Week",
    month = "Month",
    quarter = "Quarter",
    year = "Year"
}
export default function PeriodSelector(props: {
    period: PeriodOptions;
    selectedDate: VDate;
    onDateChange: (d: VDate) => void;
    periodOptions?: PeriodOptions[];
    onPeriodChange: (p: PeriodOptions) => void;
    ariaLabel?: string;
    /** This array can be used for I18N. If ommited, the english week days are used. Sunday should be first day */
    weekdayNames?: string[];
}): JSX.Element;
