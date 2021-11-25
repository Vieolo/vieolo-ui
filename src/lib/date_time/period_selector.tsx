// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';


// Material UI
import LeftArrow from '@mui/icons-material/KeyboardArrowLeft';
import RightArrow from '@mui/icons-material/KeyboardArrowRight';
import DownArrow from '@mui/icons-material/KeyboardArrowDown';


// Vieolo UI
import IconButton from '../button/icon_button';
import DropDownMenu from '../menu/dropdown_menu';


// Installed Packages
import VDate from '@vieolo/date';



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
    onPeriodChange: (p: PeriodOptions) => void
}) {

    function getSelectedDateRepresentation() : string {
        let sdr = "";
        
        switch (props.period) {
            case PeriodOptions.day:
                sdr = props.selectedDate.formatDate("month dd, yyyy").split(",")[0];
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

    return <div className="vieolo-period-selector">
        <div className="vieolo-period-selector__carousel-div">
            <IconButton 
                icon={<LeftArrow />}
                onClick={() => handleDateChange(-1)}
                size="small"
                borderWidth={'0'}
            />

            <TypographyParagraphMedium text={getSelectedDateRepresentation()} />

            <IconButton 
                icon={<RightArrow />}
                onClick={() => handleDateChange(1)}
                size="small"
                borderWidth={'0'}
            />
        </div>

        <div className="vieolo-period-selector__year-div">
            <TypographyParagraphMedium text={props.selectedDate.getFullYear().toString()} />
        </div>

        {  
            props.periodOptions &&
            <div className="vieolo-period-selector__dropdown-div">
                <DropDownMenu 
                    buttonComponent={<div className="vieolo-period-selector__dropdown-button">
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