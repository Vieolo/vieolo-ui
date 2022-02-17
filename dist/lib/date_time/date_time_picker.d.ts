/// <reference types="react" />
import VDate from "@vieolo/date";
export default function DateTimePicker(props: {
    label: string;
    onTimeChange: (hour: number | null, minute: number | null, text: string | null) => void;
    timeValue: string;
    onDateSelect: (selected: VDate) => void;
    onWeekSelect?: (selected: VDate) => void;
    includeWeek?: boolean;
    selectedDate?: VDate;
    selectedWeek?: {
        weekNumber: number;
        startDate: VDate;
    };
    showSelectedWeek?: boolean;
    disabled?: boolean;
    ariaLabel?: string;
}): JSX.Element;
