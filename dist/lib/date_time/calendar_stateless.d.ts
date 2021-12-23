/// <reference types="react" />
import VDate from '@vieolo/date';
export default function CalendarStateless(props: {
    includeWeek?: boolean;
    selectedWeek?: number[];
    currentDate: VDate;
    selectedDate?: string[];
    onDateSelect: (d: VDate) => void;
    onWeekSelect?: (d: VDate) => void;
    minDate?: VDate;
    maxDate?: VDate;
}): JSX.Element;
