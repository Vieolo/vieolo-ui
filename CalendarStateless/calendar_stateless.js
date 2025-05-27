import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Installed Packages
import VDate from '@vieolo/vdate';
export default function CalendarStateless(props) {
    let today = new VDate();
    let monthStart = props.currentDate.setToMonthStart();
    let monthEnd = props.currentDate.setToMonthEnd();
    let startDate = monthStart.getWeek().start;
    let endDate = monthEnd.getWeek().end;
    if (props.firstDayOfWeek === 0) {
        startDate = startDate.addDay(-1);
        endDate = endDate.addDay(6);
    }
    let dayCards = {};
    for (let i = 0; i < 55; i++) {
        let thisDate = new VDate(startDate).addDay(i);
        if (thisDate.isAfter(endDate))
            break;
        let thisWeek = thisDate.getWeek();
        if (props.firstDayOfWeek === 0) {
            if (thisDate.getDay() === 0) {
                thisWeek.start = thisWeek.start.addDay(6);
                thisWeek.end = thisWeek.end.addDay(6);
            }
            else {
                thisWeek.start = thisWeek.start.addDay(-1);
                thisWeek.end = thisWeek.end.addDay(-1);
            }
            if (thisWeek.start.isAfter(monthEnd) || thisWeek.end.isBefore(monthStart))
                continue;
        }
        if (thisDate.getDay() === 1 && props.includeWeek) {
            let weekClass = "vieolo-calendar-stateless-component__week-col";
            if (props.selectedWeek && props.selectedWeek.includes(thisWeek.weekNumber)) {
                weekClass += " vieolo-calendar-stateless-component__selected";
            }
            if (new VDate().getWeek().start.formatDate() === thisWeek.start.formatDate()) {
                weekClass += " vieolo-calendar-stateless-component__today";
            }
            (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(_jsx("div", { className: weekClass, onClick: e => {
                    e.stopPropagation();
                    if (props.onWeekSelect)
                        props.onWeekSelect(thisWeek.start);
                }, "aria-label": `week ${thisWeek.weekNumber} ${thisWeek.start.getFullYear()} ${props.dateCellAriaLabelSuffix || ''}`.trim(), children: thisWeek.weekNumber }, `week ${thisWeek.weekNumber} ${thisWeek.start.getFullYear()}`));
        }
        let className = "typography-paragraph-small";
        if (thisDate.formatDate() === today.formatDate())
            className += " vieolo-calendar-stateless-component__today";
        if (thisDate.getMonth() !== props.currentDate.getMonth() ||
            (props.minDate && thisDate.isBefore(props.minDate) && !thisDate.isOnSameDay(props.minDate)) ||
            (props.maxDate && thisDate.isAfter(props.maxDate) && !thisDate.isOnSameDay(props.maxDate)))
            className += " disabled";
        else if (props.selectedDate && props.selectedDate.includes(thisDate.formatDate('yyyy-mm-dd')))
            className += " vieolo-calendar-stateless-component__selected";
        (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(_jsx("div", { className: className, "aria-label": `${thisDate.formatDate()} ${props.dateCellAriaLabelSuffix || ''}`.trim(), onClick: e => {
                e.stopPropagation();
                props.onDateSelect(thisDate);
            }, children: thisDate.getMonth() === props.currentDate.getMonth() ? thisDate.getDate() : '' }, thisDate.formatDate()));
    }
    return _jsx("div", { className: "vieolo-calendar-stateless-component", "aria-label": props.ariaLabel, children: _jsxs("div", { className: `vieolo-calendar-stateless-component__calendar-content ${props.includeWeek ? 'vieolo-calendar-stateless-component__calendar-content--with-week' : ''}`, children: [_jsxs("div", { className: `vieolo-calendar-stateless-component__row-header vieolo-calendar-stateless-component__row-header--${props.includeWeek ? 'with-week' : 'no-week'}`, children: [props.includeWeek &&
                            _jsx("div", { className: "vieolo-calendar-stateless-component__week-col", children: "W" }), (props.firstDayOfWeek === 0 ? ["S", "M", "T", "W", "T", "F", "S"] : ["M", "T", "W", "T", "F", "S", "S"]).map((z, i) => {
                            return _jsx("div", { children: z }, i);
                        })] }), Object.keys(dayCards).map(w => {
                    return _jsx("div", { className: `vieolo-calendar-stateless-component__row vieolo-calendar-stateless-component__row--${props.includeWeek ? "with-week" : 'no-week'}`, children: dayCards[w] }, w);
                })] }) });
}
