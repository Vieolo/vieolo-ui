import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import { TypographyCaptionMedium, TypographyParagraphMedium } from "../typography";
import DatePicker from "./date_picker";
import TimeInput from "./time_input";
// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';
export default function DateTimePicker(props) {
    var _a;
    return _jsxs("div", Object.assign({ className: `vieolo-date-time-picker ${props.disabled ? "disabled" : ''}` }, { children: [_jsx("div", Object.assign({ className: "vieolo-date-time-picker__label-container" }, { children: _jsx("label", { children: props.label }, void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "vieolo-date-time-picker__input-container" }, { children: [_jsx(DatePicker, { onDateSelect: props.onDateSelect, includeWeek: props.includeWeek, onWeekSelect: props.onWeekSelect, selectedDate: props.selectedDate, selectedWeek: props.selectedWeek, showSelectedWeek: props.showSelectedWeek, ariaLabel: `${props.label} Date`, buttonComponent: _jsxs("div", Object.assign({ className: "vieolo-date-time-picker__input-container__date-picker-button" }, { children: [_jsxs("div", { children: [props.selectedDate &&
                                            _jsx(TypographyParagraphMedium, { text: props.selectedDate.formatDate('dd/mm/yyyy') }, void 0),
                                        (props.showSelectedWeek && (props.selectedDate || props.selectedWeek)) &&
                                            _jsx(TypographyCaptionMedium, { text: `Week ${props.selectedDate ? props.selectedDate.getWeek().weekNumber : (_a = props.selectedWeek) === null || _a === void 0 ? void 0 : _a.weekNumber}` }, void 0)] }, void 0),
                                _jsx(CalendarIcon, {}, void 0)] }), void 0) }, void 0),
                    _jsx(TimeInput, { onChange: props.onTimeChange, value: props.timeValue, ariaLabel: `${props.label} Time` }, void 0)] }), void 0)] }), void 0);
}
