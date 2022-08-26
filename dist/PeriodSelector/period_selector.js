import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Material UI
import LeftArrow from '@mui/icons-material/KeyboardArrowLeft';
import RightArrow from '@mui/icons-material/KeyboardArrowRight';
import DownArrow from '@mui/icons-material/KeyboardArrowDown';
// Vieolo UI
import Typography from '../Typography';
import IconButton from '../IconButton';
import DropDownMenu from '../DropDownMenu/dropdown_menu';
// Installed Packages
import VDate from '@vieolo/date';
export var PeriodOptions;
(function (PeriodOptions) {
    PeriodOptions["day"] = "Day";
    PeriodOptions["week"] = "Week";
    PeriodOptions["month"] = "Month";
    PeriodOptions["quarter"] = "Quarter";
    PeriodOptions["year"] = "Year";
})(PeriodOptions || (PeriodOptions = {}));
export default function PeriodSelector(props) {
    let weekdays = props.weekdayNames || ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    function getSelectedDateRepresentation() {
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
                if (props.selectedDate.getMonth() <= 2)
                    sdr = 'Quarter 1';
                else if (props.selectedDate.getMonth() > 2 && props.selectedDate.getMonth() <= 5)
                    sdr = 'Quarter 2';
                else if (props.selectedDate.getMonth() > 5 && props.selectedDate.getMonth() <= 9)
                    sdr = 'Quarter 3';
                else
                    sdr = 'Quarter 4';
                break;
            case PeriodOptions.year:
                sdr = props.selectedDate.getFullYear().toString();
                break;
        }
        return sdr;
    }
    function handleDateChange(change) {
        let newDate = new VDate(props.selectedDate);
        let finalDate = new VDate();
        if (props.period === PeriodOptions.day)
            finalDate = newDate.addDay(change);
        else if (props.period === PeriodOptions.week)
            finalDate = newDate.addDay(change * 7).getWeek().start;
        else if (props.period === PeriodOptions.month)
            finalDate = newDate.addMonth(change).setToDateStart();
        else if (props.period === PeriodOptions.quarter)
            finalDate = newDate.addMonth(change * 3).setToDateStart();
        else
            finalDate = newDate.addYear(change);
        props.onDateChange(finalDate);
    }
    return _jsxs("div", Object.assign({ className: "vieolo-period-selector", "aria-label": props.ariaLabel }, { children: [_jsxs("div", Object.assign({ className: "vieolo-period-selector__carousel-div" }, { children: [_jsx(IconButton, { icon: _jsx(LeftArrow, {}, void 0), onClick: () => handleDateChange(-1), size: "small", borderWidth: '0', ariaLabel: props.ariaLabel ? `${props.ariaLabel} left button` : undefined }, void 0),
                    _jsx(Typography, { text: getSelectedDateRepresentation() }, void 0),
                    _jsx(IconButton, { icon: _jsx(RightArrow, {}, void 0), onClick: () => handleDateChange(1), size: "small", borderWidth: '0', ariaLabel: props.ariaLabel ? `${props.ariaLabel} right button` : undefined }, void 0)] }), void 0),
            _jsx("div", Object.assign({ className: "vieolo-period-selector__year-div" }, { children: _jsx(Typography, { text: props.selectedDate.getFullYear().toString() }, void 0) }), void 0),
            props.periodOptions &&
                _jsx("div", Object.assign({ className: "vieolo-period-selector__dropdown-div" }, { children: _jsx(DropDownMenu, { buttonComponent: _jsx("div", Object.assign({ className: "vieolo-period-selector__dropdown-button" }, { children: _jsx(DownArrow, {}, void 0) }), void 0), items: props.periodOptions.map(o => {
                            return {
                                title: o,
                                value: o
                            };
                        }), onItemSelect: o => props.onPeriodChange(o) }, void 0) }), void 0)] }), void 0);
}
