import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef } from 'react';
// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';
// Installed Packages
import VDate from '@vieolo/date';
// Internal Components
import CalendarStateful from './calendar_stateful';
// TypoGraphy
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyCaptionLarge from '../typography/typography_caption_large';
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
    let datePickerButton = props.buttonComponent || _jsxs("div", Object.assign({ className: "vieolo-date-picker__button-container__default-button" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-date-picker__button-container__default-button__text-container" }, { children: [_jsx("div", { children: _jsx(TypographyCaptionLarge, { text: props.title || "" }, void 0) }, void 0),
                    _jsx("div", { children: _jsx(TypographyParagraphMedium, { text: props.selectedDate ? props.selectedDate.formatDate('dd/mm/yyyy') : "" }, void 0) }, void 0),
                    _jsx("div", { children: _jsx(TypographyCaptionLarge, { text: (props.showSelectedWeek && props.selectedDate) ? `Week ${props.selectedDate.getWeek().weekNumber}` : "" }, void 0) }, void 0)] }), void 0),
            _jsx(CalendarIcon, {}, void 0)] }), void 0);
    return _jsxs("div", Object.assign({ className: "vieolo-date-picker", ref: container }, { children: [_jsx("div", Object.assign({ className: 'vieolo-date-picker__button-container', onClick: () => setOpen(!open), tabIndex: 0, role: "button", onKeyDown: e => {
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
                    }, includeWeek: props.includeWeek, selectedDate: props.selectedDate ? [props.selectedDate.formatDate("yyyy-mm-dd")] : undefined, selectedWeek: props.selectedWeek, startDate: getStartDate() }, void 0)] }), void 0);
}
