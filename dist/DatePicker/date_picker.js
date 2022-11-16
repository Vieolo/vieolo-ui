import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef } from 'react';
// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';
// Installed Packages
import VDate from '@vieolo/date';
import Device from '@vieolo/device-js';
// Vieolo UI
import CalendarStateful from '../CalendarStateful';
import Typography from '../Typography';
import Modal from '../Modal';
import Card from '../Card';
// Hooks
import { useAppearingContainer } from '../hooks/useAppearingContainer';
// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';
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
    let datePickerButton = props.buttonComponent || _jsxs("div", { className: "vieolo-date-picker__button-container__default-button", children: [_jsxs("div", { className: "vieolo-date-picker__button-container__default-button__text-container", children: [_jsx("div", { children: _jsx(Typography, { type: 'caption-large', text: props.title || "" }) }), _jsx("div", { children: _jsx(Typography, { text: props.selectedDate ? props.selectedDate.formatDate('dd/mm/yyyy') : "" }) }), _jsx("div", { children: _jsx(Typography, { type: 'caption-large', text: (props.showSelectedWeek && props.selectedDate) ? `Week ${props.selectedDate.getWeek().weekNumber}` : "" }) })] }), _jsx(CalendarIcon, {})] });
    const calendarStatefulCompoment = _jsx(CalendarStateful, { showSearchInput: openedByKeyboard, onKeyboardExit: () => setOpen(false), onDateSelect: s => {
            props.onDateSelect(s);
            setOpen(false);
            setOpenedByKeyboard(false);
        }, onWeekSelect: s => {
            if (props.onWeekSelect) {
                props.onWeekSelect(s);
                setOpen(false);
                setOpenedByKeyboard(false);
            }
        }, includeWeek: props.includeWeek, selectedDate: props.selectedDate ? [props.selectedDate.formatDate("yyyy-mm-dd")] : undefined, selectedWeek: props.selectedWeek, startDate: getStartDate(), ariaLabel: `${props.ariaLabel || props.title || "date picker"}`, dateCellAriaLabelSuffix: `${props.ariaLabel || props.title || "date picker"} date cell` });
    return _jsxs("div", { className: `vieolo-date-picker ${props.disabled ? 'disabled' : ''}`, ref: container, children: [_jsx("div", { className: 'vieolo-date-picker__button-container', onClick: () => setOpen(!open), tabIndex: 0, role: "button", "aria-label": `${props.ariaLabel || props.title || "date picker"} button`, onKeyDown: e => {
                    if (props.disabled)
                        return;
                    handleOnKeyDown(e, {
                        onEnter: () => {
                            e.stopPropagation();
                            e.preventDefault();
                            setOpen(!open);
                            setOpenedByKeyboard(!open);
                        },
                        onEscape: () => {
                            if (open) {
                                setOpen(false);
                                setOpenedByKeyboard(false);
                            }
                        },
                        onTab: () => {
                            if (open) {
                                setOpen(false);
                                setOpenedByKeyboard(false);
                            }
                        }
                    });
                }, children: datePickerButton }), open && (Device.isTouchOnlyDevice ?
                _jsx(Modal, { onClose: () => setOpen(false), children: _jsxs(Card, { children: [_jsx(Typography, { type: 'title-small', text: props.title || '', className: 'vieolo-date-picker__modal-title' }), calendarStatefulCompoment] }) })
                : calendarStatefulCompoment)] });
}
