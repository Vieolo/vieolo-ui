/// <reference types="react" />
import VDate from '@vieolo/vdate';
export default function CalendarStateless(props: {
    includeWeek?: boolean;
    selectedWeek?: number[];
    currentDate: VDate;
    selectedDate?: string[];
    onDateSelect: (d: VDate) => void;
    onWeekSelect?: (d: VDate) => void;
    minDate?: VDate;
    maxDate?: VDate;
    dateCellAriaLabelSuffix?: string;
    ariaLabel?: string;
    firstDayOfWeek?: 0 | 1;
}): JSX.Element;
