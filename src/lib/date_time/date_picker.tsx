// React
import React, { useState, useRef, useEffect } from 'react';


// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';


// Installed Packages
import VDate from '@vieolo/date';


// Internal Components
import CalendarStateful from './calendar_stateful';

// TypoGraphy
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyCaptionLarge from '../typography/typography_caption_large';
import { useAppearingContainer } from '../../hooks/useAppearingContainer';



export default function DatePicker(props: {
    /**
     * The custom date picker button to be rendered instead of the default button.
     * This component should NOT have a `onClick` event as clicking its parent will lead to opening of the date picker modal
     * Using this custom button will render the display of title, selected date, and week number useless.
     */
    buttonComponent?: React.ReactNode,
    onDateSelect: (selected: VDate) => void,
    /** 
     * The callback used when a week number is selected.
     * The first day of the week is passed in the callback 
     */
    onWeekSelect?: (selected: VDate) => void,
    /** Whether to show week number in the date picker modal */
    includeWeek?: boolean,
    selectedDate?: VDate,
    selectedWeek?: { weekNumber: number, startDate: VDate },
    /** The title to be shown above the selected date in the default button */
    title?: string,
    /** Whether to show the week number of the selected date in the dafault button */
    showSelectedWeek?: boolean
}): JSX.Element {

    let [open, setOpen] = useState<boolean>(false);

    let container = useRef<HTMLDivElement>(null);

    useAppearingContainer(
        container,
        open,
        setOpen
    );

    function getStartDate(): VDate {
        if (props.selectedDate) return props.selectedDate;
        else if (props.selectedWeek) return props.selectedWeek.startDate;
        else return new VDate().setToDateStart();
    }

    let datePickerButton = props.buttonComponent || <div className="vieolo-date-picker__default-button">
        <div className="default-button__default-button__text-container">
            <div>
                <TypographyCaptionLarge text={props.title || ""} />
            </div>
            <div>
                <TypographyParagraphMedium text={props.selectedDate ? props.selectedDate.formatDate('dd/mm/yyyy') : ""} />
            </div>
            <div>
                <TypographyCaptionLarge text={(props.showSelectedWeek && props.selectedDate) ? `Week ${props.selectedDate.getWeek().weekNumber}` : ""} />
            </div>
        </div>
        <CalendarIcon />
    </div>

    return <div className="vieolo-date-picker" ref={container}>
        <div onClick={() => setOpen(!open)}>
            {datePickerButton}
        </div>
        {
            open &&
            <CalendarStateful
                onDateSelect={s => {
                    props.onDateSelect(s);
                    setOpen(false);
                }}
                onWeekSelect={s => {
                    if (props.onWeekSelect) {
                        props.onWeekSelect(s);
                        setOpen(false);
                    }
                    
                }}
                includeWeek={props.includeWeek}
                selectedDate={props.selectedDate ? [props.selectedDate.formatDate("yyyy-mm-dd")] : undefined}
                selectedWeek={props.selectedWeek}
                startDate={getStartDate()}
            />
        }
    </div>


}
