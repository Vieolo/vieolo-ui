import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Material UI
import ExpandIcon from '@mui/icons-material/FullscreenRounded';
import CollapseIcon from '@mui/icons-material/FullscreenExitRounded';
// Vieolo UI
import IconButton from '../IconButton';
import Modal from '../Modal';
import Typography from '../Typography';
import Card from '../Card';
// Installed Packages
import VDate from '@vieolo/date';
import { toFixed } from '@vieolo/parsers/number_parsers';
export default function CalendarStatistic(props) {
    // States
    let [expanded, setExpanded] = useState(false);
    let dayCards = {};
    let startDate = new VDate(props.selectedMonth).setToMonthStart().getWeek().start;
    let endDate = new VDate(props.selectedMonth).setToMonthEnd().getWeek().end;
    let contentClass = `vieolo-calendar-statistic__content-${expanded ? "large" : "small"}`;
    for (let i = 0; i < 45; i++) {
        let thisDate = new VDate(startDate).addDay(i);
        let thisDateFormatted = thisDate.formatDate("yyyy-mm-dd");
        if (thisDate.isAfter(endDate))
            break;
        let thisWeek = thisDate.getWeek();
        let defaultValue = props.defaultText;
        let dayData = props.data[thisDateFormatted];
        let cellClass = `${contentClass}__day-container__day-cell`;
        let className = `${cellClass}`;
        let hoverTitle = dayData ? dayData.text : defaultValue;
        if (props.showPercentage) {
            hoverTitle += ` - ${(!dayData || !dayData.percent) ? '0' : toFixed((typeof dayData.percent === 'number' ? dayData.percent : dayData.percent.value) * 100, 2)}%`;
        }
        if (thisDate.getMonth() !== props.selectedMonth.getMonth()) {
            className += " disabled";
            defaultValue = "";
        }
        else if (!dayData || dayData.disabled) {
            className += " disabled";
        }
        (dayCards[`week ${thisWeek.weekNumber}`] = dayCards[`week ${thisWeek.weekNumber}`] || []).push(_jsxs("div", { className: className, title: hoverTitle, children: [_jsx(Typography, { type: 'caption-medium', text: thisDate.getDate().toString(), nonselectable: true }), _jsx(Typography, { type: 'paragraph-small', text: thisDateFormatted in props.data ? props.data[thisDateFormatted].text : defaultValue, nonselectable: true }), (props.showPercentage && dayData && dayData.percent) &&
                    _jsx("div", { className: `${cellClass}__percent background-color--${typeof dayData.percent === 'number' ? 'primary' : dayData.percent.color}-transparent`, style: { height: `${(typeof dayData.percent === 'number' ? dayData.percent : dayData.percent.value) * 100}%` } })] }, thisDateFormatted));
    }
    let sc = _jsx("div", { className: "vieolo-calendar-statistic", children: _jsxs("div", { className: contentClass, children: [_jsxs("div", { className: `${contentClass}__header`, children: [_jsx(Typography, { type: 'paragraph-large', text: props.selectedMonth.formatMonth() }), _jsx(IconButton, { icon: expanded ? _jsx(CollapseIcon, {}) : _jsx(ExpandIcon, {}), onClick: () => setExpanded(!expanded), color: "primary", size: "small" })] }), _jsxs("div", { className: `${contentClass}__day-container`, children: [_jsx("div", { className: `${contentClass}__day-container__weekday-row`, children: ["M", "T", "W", "T", "F", "S", "S"].map((wd, i) => {
                                return _jsx("div", { className: `${contentClass}__day-container__day-cell`, children: _jsx(Typography, { type: 'caption-large', text: wd }) }, `${wd}${i}`);
                            }) }), Object.keys(dayCards).map((w, i) => {
                            return _jsx("div", { className: `${contentClass}__day-container__day-row`, children: dayCards[w] }, `${w[0]}${i}`);
                        })] })] }) });
    if (!expanded)
        return sc;
    return _jsx(Modal, { onClose: () => setExpanded(false), children: _jsx(Card, { children: sc }) });
}
