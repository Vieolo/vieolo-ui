import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useEffect } from 'react';
// Vieolo UI
import Typography from '../Typography';
// Material UI
import PreviousIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';
// Installed Packages
import VDate from '@vieolo/date';
// Internal Components
import CalendarStateless from '../CalendarStateless';
import Device from '@vieolo/device-js';
// External Components
import IconButton from '../IconButton';
import DateInput from '../DateInput';
// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';
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
    let isTouchDevice = Device.isTouchOnlyDevice;
    let className = "vieolo-calendar-statefull-component";
    return _jsxs("div", { className: className, "aria-label": props.ariaLabel + " popup", children: [props.title &&
                _jsx(Typography, { text: props.title, type: 'title-medium', textAlign: 'center', className: 'padding-bottom--two padding-top--one' }), props.showSearchInput &&
                _jsx("div", { className: 'padding-vertical--half center-by-flex-row', children: _jsx("form", { onSubmit: e => {
                            e.preventDefault();
                            e.stopPropagation();
                            if (searchDate === null)
                                return null;
                            props.onDateSelect(searchDate);
                        }, children: _jsx(DateInput, { onChange: (d, t) => {
                                setSearchDate(d);
                                setSearchText(t);
                            }, value: searchText.trim(), onKeyDown: e => {
                                handleOnKeyDown(e, {
                                    onTab: () => {
                                        if (props.onKeyboardExit)
                                            props.onKeyboardExit();
                                    },
                                    onEscape: () => {
                                        if (props.onKeyboardExit)
                                            props.onKeyboardExit();
                                    }
                                });
                            }, autoFocus: true, dateFormat: 'DD/MM/YYYY', ariaLabel: props.ariaLabel + ` Search Date` }) }) }), _jsxs("div", { className: "vieolo-calendar-statefull-component__calendar-year", children: [_jsx(IconButton, { icon: _jsx(PreviousIcon, {}), size: isTouchDevice ? "small" : "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " year decrease button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addYear(-1);
                            setCurrentDate(newDate);
                        } }), _jsx(Typography, { text: `${currentDate.getFullYear()}` }), _jsx(IconButton, { icon: _jsx(NextIcon, {}), size: isTouchDevice ? "small" : "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " year increase button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addYear(1);
                            setCurrentDate(newDate);
                        } })] }), _jsxs("div", { className: "vieolo-calendar-statefull-component__calendar-month", children: [_jsx(IconButton, { icon: _jsx(PreviousIcon, {}), size: isTouchDevice ? "small" : "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " month decrease button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addDay(-1).setToMonthStart();
                            setCurrentDate(newDate);
                        } }), _jsx(Typography, { text: `${currentDate.formatMonth().split(' ')[0]}` }), _jsx(IconButton, { icon: _jsx(NextIcon, {}), size: isTouchDevice ? "small" : "extra-small", borderRadius: 'normal', ariaLabel: props.ariaLabel + " month increase button", onClick: e => {
                            e.stopPropagation();
                            let newDate = new VDate(currentDate).setToMonthStart().addDay(33).setToMonthStart();
                            setCurrentDate(newDate);
                        } })] }), _jsx(CalendarStateless, { currentDate: currentDate, onDateSelect: props.onDateSelect, includeWeek: props.includeWeek, onWeekSelect: props.onWeekSelect, selectedDate: props.selectedDate, selectedWeek: props.selectedWeek ? [props.selectedWeek.weekNumber] : undefined, maxDate: props.maxDate, minDate: props.minDate, ariaLabel: props.ariaLabel + " day container", dateCellAriaLabelSuffix: props.dateCellAriaLabelSuffix })] });
}
