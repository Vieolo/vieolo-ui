import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Installed Packages
import VDate from '@vieolo/date';
export default function CalendarStateless(props) {
    let today = new VDate();
    let startDate = new VDate(props.currentDate).setToMonthStart().getWeek().start;
    let endDate = new VDate(props.currentDate).setToMonthEnd().getWeek().end;
    let dayCards = {};
    for (let i = 0; i < 45; i++) {
        let thisDate = new VDate(startDate).addDay(i);
        if (thisDate.isAfter(endDate))
            break;
        let thisWeek = thisDate.getWeek();
        if (thisDate.getDay() === 1 && props.includeWeek) {
            let weekClass = "vieolo-calendar-stateless-component__week-col";
            if (props.selectedWeek && props.selectedWeek.includes(thisWeek.weekNumber)) {
                weekClass += " vieolo-calendar-stateless-component__selected";
            }
            if (new VDate().getWeek().start.formatDate() === thisWeek.start.formatDate()) {
                weekClass += " vieolo-calendar-stateless-component__today";
            }
            (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(_jsx("div", Object.assign({ className: weekClass, onClick: () => {
                    if (props.onWeekSelect)
                        props.onWeekSelect(thisWeek.start);
                } }, { children: thisWeek.weekNumber }), `week ${thisWeek.weekNumber} ${thisWeek.start.getFullYear()}`));
        }
        let className = "typography-paragraph-small";
        if (thisDate.formatDate() === today.formatDate())
            className += " vieolo-calendar-stateless-component__today";
        if (thisDate.getMonth() !== props.currentDate.getMonth() ||
            (props.minDate && thisDate.isBefore(props.minDate)) ||
            (props.maxDate && thisDate.isAfter(props.maxDate)))
            className += " disabled";
        else if (props.selectedDate && props.selectedDate.includes(thisDate.formatDate('yyyy-mm-dd')))
            className += " vieolo-calendar-stateless-component__selected";
        (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(_jsx("div", Object.assign({ className: className, onClick: e => {
                e.stopPropagation();
                props.onDateSelect(thisDate);
            } }, { children: thisDate.getMonth() === props.currentDate.getMonth() ? thisDate.getDate() : '' }), thisDate.formatDate()));
    }
    return _jsx("div", Object.assign({ className: "vieolo-calendar-stateless-component" }, { children: _jsxs("div", Object.assign({ className: `vieolo-calendar-stateless-component__calendar-content ${props.includeWeek ? 'vieolo-calendar-stateless-component__calendar-content--with-week' : ''}` }, { children: [_jsxs("div", Object.assign({ className: `vieolo-calendar-stateless-component__row-header vieolo-calendar-stateless-component__row-header--${props.includeWeek ? 'with-week' : 'no-week'}` }, { children: [props.includeWeek &&
                            _jsx("div", Object.assign({ className: "vieolo-calendar-stateless-component__week-col" }, { children: "W" }), void 0),
                        _jsx("div", { children: "M" }, void 0),
                        _jsx("div", { children: "T" }, void 0),
                        _jsx("div", { children: "W" }, void 0),
                        _jsx("div", { children: "T" }, void 0),
                        _jsx("div", { children: "F" }, void 0),
                        _jsx("div", { children: "S" }, void 0),
                        _jsx("div", { children: "S" }, void 0)] }), void 0),
                Object.keys(dayCards).map(w => {
                    return _jsx("div", Object.assign({ className: `vieolo-calendar-stateless-component__row vieolo-calendar-stateless-component__row--${props.includeWeek ? "with-week" : 'no-week'}` }, { children: dayCards[w] }), w);
                })] }), void 0) }), void 0);
}
