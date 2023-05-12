/// <reference types="react" />
import VDate from '@vieolo/vdate';
export default function CalendarStateful(props: {
    startDate?: VDate;
    selectedDate?: string[];
    selectedWeek?: {
        weekNumber: number;
        startDate: VDate;
    };
    includeWeek?: boolean;
    onDateSelect: (selected: VDate) => void;
    onWeekSelect?: (selected: VDate) => void;
    minDate?: VDate;
    maxDate?: VDate;
    showSearchInput?: boolean;
    onKeyboardExit?: () => void;
    ariaLabel?: string;
    dateCellAriaLabelSuffix?: string;
    title?: string;
}): JSX.Element;
