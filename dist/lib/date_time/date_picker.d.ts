import React from 'react';
import VDate from '@vieolo/date';
export default function DatePicker(props: {
    /**
     * The custom date picker button to be rendered instead of the default button.
     * This component should NOT have a `onClick` event as clicking its parent will lead to opening of the date picker modal
     * Using this custom button will render the display of title, selected date, and week number useless.
     */
    buttonComponent?: React.ReactNode;
    onDateSelect: (selected: VDate) => void;
    /**
     * The callback used when a week number is selected.
     * The first day of the week is passed in the callback
     */
    onWeekSelect?: (selected: VDate) => void;
    /** Whether to show week number in the date picker modal */
    includeWeek?: boolean;
    selectedDate?: VDate;
    selectedWeek?: {
        weekNumber: number;
        startDate: VDate;
    };
    /** The title to be shown above the selected date in the default button */
    title?: string;
    /** Whether to show the week number of the selected date in the dafault button */
    showSelectedWeek?: boolean;
}): JSX.Element;
