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
    let container = useRef(null);
    useAppearingContainer(container, open, setOpen);
    function getStartDate() {
        if (props.selectedDate)
            return props.selectedDate;
        else if (props.selectedWeek)
            return props.selectedWeek.startDate;
        else
            return new VDate().setToDateStart();
    }
    let datePickerButton = props.buttonComponent || _jsxs("div", Object.assign({ className: "vieolo-date-picker__default-button" }, { children: [_jsxs("div", Object.assign({ className: "default-button__default-button__text-container" }, { children: [_jsx("div", { children: _jsx(TypographyCaptionLarge, { text: props.title || "" }, void 0) }, void 0),
                    _jsx("div", { children: _jsx(TypographyParagraphMedium, { text: props.selectedDate ? props.selectedDate.formatDate('dd/mm/yyyy') : "" }, void 0) }, void 0),
                    _jsx("div", { children: _jsx(TypographyCaptionLarge, { text: (props.showSelectedWeek && props.selectedDate) ? `Week ${props.selectedDate.getWeek().weekNumber}` : "" }, void 0) }, void 0)] }), void 0),
            _jsx(CalendarIcon, {}, void 0)] }), void 0);
    return _jsxs("div", Object.assign({ className: "vieolo-date-picker", ref: container }, { children: [_jsx("div", Object.assign({ onClick: () => setOpen(!open) }, { children: datePickerButton }), void 0),
            open &&
                _jsx(CalendarStateful, { onDateSelect: s => {
                        props.onDateSelect(s);
                        setOpen(false);
                    }, onWeekSelect: s => {
                        if (props.onWeekSelect) {
                            props.onWeekSelect(s);
                            setOpen(false);
                        }
                    }, includeWeek: props.includeWeek, selectedDate: props.selectedDate ? [props.selectedDate.formatDate("yyyy-mm-dd")] : undefined, selectedWeek: props.selectedWeek, startDate: getStartDate() }, void 0)] }), void 0);
}
