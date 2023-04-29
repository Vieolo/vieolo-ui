// Material UI
import LeftArrow from '@mui/icons-material/KeyboardArrowLeft';
import RightArrow from '@mui/icons-material/KeyboardArrowRight';
import DownArrow from '@mui/icons-material/KeyboardArrowDown';


// Vieolo UI
import Typography from '../Typography';
import IconButton from '../IconButton';
import DropDownMenu from '../DropDownMenu/dropdown_menu';


// Installed Packages
import VDate from '@vieolo/vdate';



export enum PeriodOptions {
    day="Day",
    week="Week",
    month="Month",
    quarter="Quarter",
    year="Year"
}


export default function PeriodSelector (props: {
    period: PeriodOptions,
    selectedDate: VDate,
    onDateChange: (d: VDate) => void,
    periodOptions?: PeriodOptions[],
    onPeriodChange: (p: PeriodOptions) => void,
    ariaLabel?: string,
    /** This array can be used for I18N. If ommited, the english week days are used. Sunday should be first day */
    weekdayNames?: string[]
}) {

    let weekdays = props.weekdayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function getSelectedDateRepresentation() : string {
        let sdr = "";
        
        switch (props.period) {
            case PeriodOptions.day:
                sdr = `${weekdays[props.selectedDate.getDay()]}, ${props.selectedDate.formatDate("month dd, yyyy").split(",")[0]}`;
                break;
            case PeriodOptions.week:
                sdr = `Week ${props.selectedDate.getWeek().weekNumber}`;
                break;
            case PeriodOptions.month:
                sdr = props.selectedDate.formatMonth().split(" ")[0];
                break;
            case PeriodOptions.quarter:
                if (props.selectedDate.getMonth() <= 2) sdr = 'Quarter 1';
                else if (props.selectedDate.getMonth() > 2 && props.selectedDate.getMonth() <= 5) sdr = 'Quarter 2';
                else if (props.selectedDate.getMonth() > 5 && props.selectedDate.getMonth() <= 9) sdr = 'Quarter 3';
                else sdr = 'Quarter 4';
                break;
            case PeriodOptions.year:
                sdr = props.selectedDate.getFullYear().toString();
                break;
        }
        return sdr;
    }


    function handleDateChange(change: number) {
        let newDate = new VDate(props.selectedDate);
        let finalDate = new VDate();

        if (props.period === PeriodOptions.day) finalDate = newDate.addDay(change);
        else if (props.period === PeriodOptions.week) finalDate = newDate.addDay(change * 7).getWeek().start;
        else if (props.period === PeriodOptions.month) finalDate = newDate.addMonth(change).setToDateStart();
        else if (props.period === PeriodOptions.quarter) finalDate = newDate.addMonth(change * 3).setToDateStart();
        else finalDate = newDate.addYear(change);

        props.onDateChange(finalDate);
    }

    return <div className="vieolo-period-selector" aria-label={props.ariaLabel}>
        <div className="vieolo-period-selector__carousel-div">
            <IconButton 
                icon={<LeftArrow />}
                onClick={() => handleDateChange(-1)}
                size="small"
                borderWidth={'0'}
                ariaLabel={props.ariaLabel ? `${props.ariaLabel} left button` : undefined}
            />

            <Typography text={getSelectedDateRepresentation()} />

            <IconButton 
                icon={<RightArrow />}
                onClick={() => handleDateChange(1)}
                size="small"
                borderWidth={'0'}
                ariaLabel={props.ariaLabel ? `${props.ariaLabel} right button` : undefined}
            />
        </div>

        <div className="vieolo-period-selector__year-div">
            <Typography text={props.selectedDate.getFullYear().toString()} />
        </div>

        {  
            props.periodOptions &&
            <div className="vieolo-period-selector__dropdown-div">
                <DropDownMenu 
                    buttonComponent={<div className="vieolo-period-selector__dropdown-button" aria-label={props.ariaLabel ? `${props.ariaLabel} period options` : undefined}>
                        <DownArrow />
                    </div>}
                    items={props.periodOptions.map(o => {
                        return {
                            title: o,
                            value: o
                        }
                    })}
                    onItemSelect={o => props.onPeriodChange(o as PeriodOptions)}
                />
            </div>
        }
    </div> 
}