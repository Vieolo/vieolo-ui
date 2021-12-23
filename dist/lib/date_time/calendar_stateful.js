import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useEffect } from 'react';
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
// Material UI
import PreviousIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';
// Installed Packages
import VDate from '@vieolo/date';
// Internal Components
import CalendarStateless from './calendar_stateless';
// External Components
import IconButton from '../button/icon_button';
export default function CalendarStateful(props) {
    let [currentDate, setCurrentDate] = useState(new VDate().setToDateStart());
    useEffect(() => {
        if (props.startDate)
            setCurrentDate(props.startDate);
        else if (props.selectedWeek)
            setCurrentDate(props.selectedWeek.startDate);
        // eslint-disable-next-line
    }, []);
    return _jsxs("div", Object.assign({ className: "vieolo-calendar-statefull-component" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-calendar-statefull-component__calendar-year" }, { children: [_jsx(IconButton, { icon: _jsx(PreviousIcon, {}, void 0), size: "small", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addYear(-1);
                            setCurrentDate(newDate);
                        } }, void 0),
                    _jsx(TypographyParagraphMedium, { text: `${currentDate.getFullYear()}` }, void 0),
                    _jsx(IconButton, { icon: _jsx(NextIcon, {}, void 0), size: "small", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addYear(1);
                            setCurrentDate(newDate);
                        } }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "vieolo-calendar-statefull-component__calendar-month" }, { children: [_jsx(IconButton, { icon: _jsx(PreviousIcon, {}, void 0), size: "small", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addDay(-1).setToMonthStart();
                            setCurrentDate(newDate);
                        } }, void 0),
                    _jsx(TypographyParagraphMedium, { text: `${currentDate.formatMonth().split(' ')[0]}` }, void 0),
                    _jsx(IconButton, { icon: _jsx(NextIcon, {}, void 0), size: "small", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addDay(33).setToMonthStart();
                            setCurrentDate(newDate);
                        } }, void 0)] }), void 0),
            _jsx(CalendarStateless, { currentDate: currentDate, onDateSelect: props.onDateSelect, includeWeek: props.includeWeek, onWeekSelect: props.onWeekSelect, selectedDate: props.selectedDate, selectedWeek: props.selectedWeek ? [props.selectedWeek.weekNumber] : undefined, maxDate: props.maxDate, minDate: props.minDate }, void 0)] }), void 0);
}
