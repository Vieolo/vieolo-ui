import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Typography from "../Typography";
import DatePicker from "../DatePicker";
import TimeInput from "../TimeInput";
// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';
export default function DateTimePicker(props) {
    var _a;
    return _jsxs("div", { className: `vieolo-date-time-picker ${props.disabled ? "disabled" : ''}`, children: [_jsx("div", { className: "vieolo-date-time-picker__label-container", children: _jsx("label", { children: props.label }) }), _jsxs("div", { className: "vieolo-date-time-picker__input-container", children: [_jsx(DatePicker, { onDateSelect: props.onDateSelect, includeWeek: props.includeWeek, onWeekSelect: props.onWeekSelect, selectedDate: props.selectedDate, selectedWeek: props.selectedWeek, showSelectedWeek: props.showSelectedWeek, ariaLabel: `${props.ariaLabel || props.label} Date`, buttonComponent: _jsxs("div", { className: "vieolo-date-time-picker__input-container__date-picker-button", children: [_jsxs("div", { children: [props.selectedDate &&
                                            _jsx(Typography, { text: props.selectedDate.formatDate('dd/mm/yyyy') }), (props.showSelectedWeek && (props.selectedDate || props.selectedWeek)) &&
                                            _jsx(Typography, { type: "caption-medium", text: `Week ${props.selectedDate ? props.selectedDate.getWeek().weekNumber : (_a = props.selectedWeek) === null || _a === void 0 ? void 0 : _a.weekNumber}` })] }), _jsx(CalendarIcon, {})] }) }), _jsx(TimeInput, { onChange: props.onTimeChange, value: props.timeValue, ariaLabel: `${props.ariaLabel || props.label} Time` })] })] });
}
