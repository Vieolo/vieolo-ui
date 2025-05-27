import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef } from 'react';
// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';
// Installed Packages
import VDate from '@vieolo/vdate';
import Device from '@vieolo/device-js';
// Vieolo UI
import CalendarStateful from '../CalendarStateful';
import Typography from '../Typography';
import Modal from '../Modal';
// Hooks
import { useAppearingContainer } from '../hooks/useAppearingContainer';
// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';
import IconButton from '../IconButton';
import { CloseIcon } from '../icons';
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
    let bc = "vieolo-date-picker__button-container__default-button";
    let buttonContainerClass = bc;
    buttonContainerClass += ` ${bc}--${props.width || 'medium'}`;
    if (props.error) {
        buttonContainerClass += ` ${bc}--error`;
    }
    else {
        buttonContainerClass += ` ${bc}--normal`;
    }
    let datePickerButton = props.buttonComponent ||
        _jsxs("div", { className: buttonContainerClass, children: [_jsxs("div", { children: [_jsx(Typography, { text: props.selectedDate ? props.selectedDate.formatDate(props.dateFormat || 'dd/mm/yyyy') : "", fontWeight: 'bold', type: 'paragraph-small' }), _jsx(Typography, { type: 'caption-large', text: (props.showSelectedWeek && props.selectedDate) ? `Week ${props.selectedDate.getWeek().weekNumber}` : "" })] }), (props.onClear && props.selectedDate)
                    ? _jsx(IconButton, { icon: _jsx(CloseIcon, {}), size: 'extra-small', color: 'error', onClick: (e) => {
                            e.stopPropagation();
                            props.onClear();
                        } })
                    : _jsx(CalendarIcon, {})] });
    const calendarStatefulCompoment = _jsx(CalendarStateful, { showSearchInput: openedByKeyboard, minDate: props.minDate, maxDate: props.maxDate, firstDayOfWeek: props.firstDayOfWeek, onKeyboardExit: () => setOpen(false), title: (Device.isTouchOnlyDevice && props.title) ? props.title : undefined, onDateSelect: s => {
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
    return _jsxs("div", { className: `vieolo-date-picker ${props.disabled ? 'disabled' : ''}`, ref: container, children: [props.title &&
                _jsx("div", { className: "label-container", children: _jsx("label", { children: props.title }) }), _jsx("div", { className: 'vieolo-date-picker__button-container', onClick: e => {
                    e.stopPropagation();
                    setOpen(!open);
                }, tabIndex: 0, role: "button", "aria-label": `${props.ariaLabel || props.title || "date picker"} button`, onKeyDown: e => {
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
                _jsx(Modal, { onClose: () => setOpen(false), children: calendarStatefulCompoment })
                : calendarStatefulCompoment)] });
}
