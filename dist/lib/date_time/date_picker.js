import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef } from 'react';
// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';
// Installed Packages
import VDate from '@vieolo/date';
// Vieolo UI
import CalendarStateful from './calendar_stateful';
import Typography from '../typography/typography';
// Hooks
import { useAppearingContainer } from '../../hooks/useAppearingContainer';
export default function DatePicker(props) {
    let [open, setOpen] = useState(false);
    let [openedByKeyboard, setOpenedByKeyboard] = useState(false);
    let container = useRef(null);
    useAppearingContainer(container, open, setOpen, () => {
        setOpenedByKeyboard(false);
    });
    function getStartDate() {
        if (props.selectedDate)
            return props.selectedDate;
        else if (props.selectedWeek)
            return props.selectedWeek.startDate;
        else
            return new VDate().setToDateStart();
    }
    let datePickerButton = props.buttonComponent || _jsxs("div", Object.assign({ className: "vieolo-date-picker__button-container__default-button" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-date-picker__button-container__default-button__text-container" }, { children: [_jsx("div", { children: _jsx(Typography, { type: 'caption-large', text: props.title || "" }, void 0) }, void 0),
                    _jsx("div", { children: _jsx(Typography, { text: props.selectedDate ? props.selectedDate.formatDate('dd/mm/yyyy') : "" }, void 0) }, void 0),
                    _jsx("div", { children: _jsx(Typography, { type: 'caption-large', text: (props.showSelectedWeek && props.selectedDate) ? `Week ${props.selectedDate.getWeek().weekNumber}` : "" }, void 0) }, void 0)] }), void 0),
            _jsx(CalendarIcon, {}, void 0)] }), void 0);
    return _jsxs("div", Object.assign({ className: `vieolo-date-picker ${props.disabled ? 'disabled' : ''}`, ref: container }, { children: [_jsx("div", Object.assign({ className: 'vieolo-date-picker__button-container', onClick: () => setOpen(!open), tabIndex: 0, role: "button", "aria-label": `${props.ariaLabel || props.title || "date picker"} button`, onKeyDown: e => {
                    if (props.disabled)
                        return;
                    if (e.code === "Enter" || e.code === "Space") {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpen(!open);
                        setOpenedByKeyboard(!open);
                    }
                    else if (e.code === "Escape" && open) {
                        setOpen(false);
                        setOpenedByKeyboard(false);
                    }
                    else if (e.code === "Tab" && open) {
                        setOpen(false);
                        setOpenedByKeyboard(false);
                    }
                } }, { children: datePickerButton }), void 0),
            open &&
                _jsx(CalendarStateful, { showSearchInput: openedByKeyboard, onKeyboardExit: () => setOpen(false), onDateSelect: s => {
                        props.onDateSelect(s);
                        setOpen(false);
                        setOpenedByKeyboard(false);
                    }, onWeekSelect: s => {
                        if (props.onWeekSelect) {
                            props.onWeekSelect(s);
                            setOpen(false);
                            setOpenedByKeyboard(false);
                        }
                    }, includeWeek: props.includeWeek, selectedDate: props.selectedDate ? [props.selectedDate.formatDate("yyyy-mm-dd")] : undefined, selectedWeek: props.selectedWeek, startDate: getStartDate(), ariaLabel: `${props.ariaLabel || props.title || "date picker"}`, dateCellAriaLabelSuffix: `${props.ariaLabel || props.title || "date picker"} date cell` }, void 0)] }), void 0);
}
