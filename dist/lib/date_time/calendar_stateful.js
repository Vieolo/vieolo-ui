import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useEffect } from 'react';
// Vieolo UI
import Typography from '../typography/typography';
// Material UI
import PreviousIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';
// Installed Packages
import VDate from '@vieolo/date';
// Internal Components
import CalendarStateless from './calendar_stateless';
// External Components
import IconButton from '../button/icon_button';
import DateInput from './date_input';
export default function CalendarStateful(props) {
    let [currentDate, setCurrentDate] = useState(new VDate().setToDateStart());
    let [searchDate, setSearchDate] = useState(null);
    let [searchText, setSearchText] = useState('');
    useEffect(() => {
        if (props.startDate)
            setCurrentDate(props.startDate);
        else if (props.selectedWeek)
            setCurrentDate(props.selectedWeek.startDate);
        // eslint-disable-next-line
    }, []);
    return _jsxs("div", Object.assign({ className: "vieolo-calendar-statefull-component", "aria-label": props.ariaLabel + " popup" }, { children: [props.showSearchInput &&
                _jsx("div", Object.assign({ className: 'padding-vertical--half center-by-flex-row' }, { children: _jsx("form", Object.assign({ onSubmit: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (searchDate === null)
                                return null;
                            props.onDateSelect(searchDate);
                        } }, { children: _jsx(DateInput, { onChange: (d, t) => {
                                setSearchDate(d);
                                setSearchText(t);
                            }, value: searchText.trim(), onKeyDown: e => {
                                if ((e.code === "Tab" || e.code === "Escape") && props.onKeyboardExit) {
                                    props.onKeyboardExit();
                                }
                            }, autoFocus: true, dateFormat: 'DD/MM/YYYY', ariaLabel: props.ariaLabel + ` Search Date` }, void 0) }), void 0) }), void 0),
            _jsxs("div", Object.assign({ className: "vieolo-calendar-statefull-component__calendar-year" }, { children: [_jsx(IconButton, { icon: _jsx(PreviousIcon, {}, void 0), size: "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " year decrease button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addYear(-1);
                            setCurrentDate(newDate);
                        } }, void 0),
                    _jsx(Typography, { text: `${currentDate.getFullYear()}` }, void 0),
                    _jsx(IconButton, { icon: _jsx(NextIcon, {}, void 0), size: "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " year increase button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addYear(1);
                            setCurrentDate(newDate);
                        } }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "vieolo-calendar-statefull-component__calendar-month" }, { children: [_jsx(IconButton, { icon: _jsx(PreviousIcon, {}, void 0), size: "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " month decrease button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addDay(-1).setToMonthStart();
                            setCurrentDate(newDate);
                        } }, void 0),
                    _jsx(Typography, { text: `${currentDate.formatMonth().split(' ')[0]}` }, void 0),
                    _jsx(IconButton, { icon: _jsx(NextIcon, {}, void 0), size: "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " month increase button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addDay(33).setToMonthStart();
                            setCurrentDate(newDate);
                        } }, void 0)] }), void 0),
            _jsx(CalendarStateless, { currentDate: currentDate, onDateSelect: props.onDateSelect, includeWeek: props.includeWeek, onWeekSelect: props.onWeekSelect, selectedDate: props.selectedDate, selectedWeek: props.selectedWeek ? [props.selectedWeek.weekNumber] : undefined, maxDate: props.maxDate, minDate: props.minDate, ariaLabel: props.ariaLabel + " day container", dateCellAriaLabelSuffix: props.dateCellAriaLabelSuffix }, void 0)] }), void 0);
}
