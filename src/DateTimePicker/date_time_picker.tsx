// Vieolo UI
import Typography from "../Typography";
import DatePicker from "../DatePicker";
import TimeInput from "../TimeInput";

// Installed Packages
import VDate from "@vieolo/vdate";

// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';

export default function DateTimePicker(props: {
    label: string,
    onTimeChange: (hour: number | null, minute: number | null, text: string | null) => void,
    timeValue: string,
    onDateSelect: (selected: VDate) => void,
    onWeekSelect?: (selected: VDate) => void,
    includeWeek?: boolean,
    selectedDate?: VDate,
    selectedWeek?: { weekNumber: number, startDate: VDate },
    showSelectedWeek?: boolean,
    disabled?: boolean,
    ariaLabel?: string
}): JSX.Element {

    return <div className={`vieolo-date-time-picker ${props.disabled ? "disabled" : ''}`}>

        <div className="vieolo-date-time-picker__label-container">
            <label>{props.label}</label>
        </div>

        <div className="vieolo-date-time-picker__input-container">
            <DatePicker
                onDateSelect={props.onDateSelect}
                includeWeek={props.includeWeek}
                onWeekSelect={props.onWeekSelect}
                selectedDate={props.selectedDate}
                selectedWeek={props.selectedWeek}
                showSelectedWeek={props.showSelectedWeek}
                ariaLabel={`${props.ariaLabel || props.label} Date`}
                buttonComponent={<div className="vieolo-date-time-picker__input-container__date-picker-button">
                    <div>
                        {
                            props.selectedDate &&
                            <Typography text={props.selectedDate.formatDate('dd/mm/yyyy')} />
                        }

                        {
                            (props.showSelectedWeek && (props.selectedDate || props.selectedWeek)) &&
                            <Typography type="caption-medium" text={`Week ${props.selectedDate ? props.selectedDate.getWeek().weekNumber : props.selectedWeek?.weekNumber}`} />
                        }
                    </div>

                    <CalendarIcon />
                </div>}
            />

            <TimeInput
                onChange={props.onTimeChange}
                value={props.timeValue}
                ariaLabel={`${props.ariaLabel || props.label} Time`}
            />
        </div>

    </div>

}