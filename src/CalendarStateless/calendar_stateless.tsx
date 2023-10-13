// React
import React from 'react';

// Installed Packages
import VDate from '@vieolo/vdate';


export default function CalendarStateless(props: {
    includeWeek?: boolean,
    selectedWeek?: number[],
    currentDate: VDate,
    selectedDate?: string[],
    onDateSelect: (d: VDate) => void,
    onWeekSelect?: (d: VDate) => void,
    minDate?: VDate,
    maxDate?: VDate,
    dateCellAriaLabelSuffix?: string,
    ariaLabel?: string,
    firstDayOfWeek?: 0 | 1
}) {

    let today = new VDate();
    let monthStart = props.currentDate.setToMonthStart()
    let monthEnd = props.currentDate.setToMonthEnd()
    let startDate = monthStart.getWeek().start;
    let endDate = monthEnd.getWeek().end;
    
    if (props.firstDayOfWeek === 0) {
        startDate = startDate.addDay(-1)
        endDate = endDate.addDay(6)
    }

    let dayCards: { [weekStart: string]: React.ReactNode[] } = {};

    for (let i = 0; i < 55; i++) {

        let thisDate = new VDate(startDate).addDay(i);
        if (thisDate.isAfter(endDate)) break;
        let thisWeek = thisDate.getWeek();
        
        if (props.firstDayOfWeek === 0) {
            if (thisDate.getDay() === 0) {
                thisWeek.start = thisWeek.start.addDay(6)
                thisWeek.end = thisWeek.end.addDay(6)
            } else {
                thisWeek.start = thisWeek.start.addDay(-1)
                thisWeek.end = thisWeek.end.addDay(-1)
            }
            
            if (thisWeek.start.isAfter(monthEnd) || thisWeek.end.isBefore(monthStart)) continue;
        }

        if (thisDate.getDay() === 1 && props.includeWeek) {
            let weekClass = "vieolo-calendar-stateless-component__week-col";

            if (props.selectedWeek && props.selectedWeek.includes(thisWeek.weekNumber)) {
                weekClass += " vieolo-calendar-stateless-component__selected";
            }
            
            if (new VDate().getWeek().start.formatDate() === thisWeek.start.formatDate()) {
                weekClass += " vieolo-calendar-stateless-component__today";
            }

            (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(
                <div
                    className={weekClass}
                    onClick={e => { 
                        e.stopPropagation();
                        if (props.onWeekSelect) props.onWeekSelect(thisWeek.start) 
                    }}
                    key={`week ${thisWeek.weekNumber} ${thisWeek.start.getFullYear()}`}
                    aria-label={`week ${thisWeek.weekNumber} ${thisWeek.start.getFullYear()} ${props.dateCellAriaLabelSuffix || ''}`.trim()}
                >
                    {thisWeek.weekNumber}
                </div>
            )
        }

        let className = "typography-paragraph-small";

        if (thisDate.formatDate() === today.formatDate()) className += " vieolo-calendar-stateless-component__today";

        if (
            thisDate.getMonth() !== props.currentDate.getMonth() ||
            (props.minDate && thisDate.isBefore(props.minDate) && !thisDate.isOnSameDay(props.minDate)) ||
            (props.maxDate && thisDate.isAfter(props.maxDate) && !thisDate.isOnSameDay(props.maxDate))
        ) className += " disabled";
        else if (props.selectedDate && props.selectedDate.includes(thisDate.formatDate('yyyy-mm-dd'))) className += " vieolo-calendar-stateless-component__selected";

        (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(
            <div 
                className={className} 
                aria-label={`${thisDate.formatDate()} ${props.dateCellAriaLabelSuffix || ''}`.trim()} 
                key={thisDate.formatDate()} 
                onClick={e => {
                    e.stopPropagation()
                    props.onDateSelect(thisDate);
                }
            }>
                {thisDate.getMonth() === props.currentDate.getMonth() ? thisDate.getDate() : ''}
            </div>
        )
    }

    return <div className="vieolo-calendar-stateless-component" aria-label={props.ariaLabel}>
        <div className={`vieolo-calendar-stateless-component__calendar-content ${props.includeWeek ? 'vieolo-calendar-stateless-component__calendar-content--with-week' : ''}`}>
            <div className={`vieolo-calendar-stateless-component__row-header vieolo-calendar-stateless-component__row-header--${props.includeWeek ? 'with-week' : 'no-week'}`}>
                {
                    props.includeWeek &&
                    <div className="vieolo-calendar-stateless-component__week-col">W</div>
                }
                {
                    (props.firstDayOfWeek === 0 ? ["S", "M", "T", "W", "T", "F", "S"] : ["M", "T", "W", "T", "F", "S", "S"]).map((z, i) => {
                        return <div key={i}>{z}</div>
                    })
                }
            </div>
            {
                Object.keys(dayCards).map(w => {
                    return <div className={`vieolo-calendar-stateless-component__row vieolo-calendar-stateless-component__row--${props.includeWeek ? "with-week" : 'no-week'}`} key={w} >
                        {
                            dayCards[w]
                        }
                    </div>
                })
            }
        </div>
    </div>
}