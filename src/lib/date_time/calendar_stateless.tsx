// React
import React from 'react';

// Installed Packages
import VDate from '@vieolo/date';


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
    ariaLabel?: string
}) {

    let today = new VDate();
    let startDate = new VDate(props.currentDate).setToMonthStart().getWeek().start;
    let endDate = new VDate(props.currentDate).setToMonthEnd().getWeek().end;

    let dayCards: { [weekStart: string]: React.ReactNode[] } = {};

    for (let i = 0; i < 45; i++) {

        let thisDate = new VDate(startDate).addDay(i);
        if (thisDate.isAfter(endDate)) break;
        let thisWeek = thisDate.getWeek();

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
            (props.minDate && thisDate.isBefore(props.minDate)) ||
            (props.maxDate && thisDate.isAfter(props.maxDate))
        ) className += " disabled";
        else if (props.selectedDate && props.selectedDate.includes(thisDate.formatDate('yyyy-mm-dd'))) className += " vieolo-calendar-stateless-component__selected";

        (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(
            <div className={className} aria-label={`${thisDate.formatDate()} ${props.dateCellAriaLabelSuffix || ''}`.trim()} key={thisDate.formatDate()} onClick={e => {
                e.stopPropagation()
                props.onDateSelect(thisDate);
            }}>{thisDate.getMonth() === props.currentDate.getMonth() ? thisDate.getDate() : ''}</div>
        )
    }


    return <div className="vieolo-calendar-stateless-component" aria-label={props.ariaLabel}>
        <div className={`vieolo-calendar-stateless-component__calendar-content ${props.includeWeek ? 'vieolo-calendar-stateless-component__calendar-content--with-week' : ''}`}>
            <div className={`vieolo-calendar-stateless-component__row-header vieolo-calendar-stateless-component__row-header--${props.includeWeek ? 'with-week' : 'no-week'}`}>
                {
                    props.includeWeek &&
                    <div className="vieolo-calendar-stateless-component__week-col">W</div>
                }
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
                <div>S</div>
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