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
    maxDate?: VDate
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
            let weekClass = "week-col";

            if (props.selectedWeek && props.selectedWeek.includes(thisWeek.weekNumber)) weekClass += " selected";
            (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(
                <div
                    className={weekClass}
                    onClick={() => { 
                        if (props.onWeekSelect) props.onWeekSelect(thisWeek.start) 
                    }}
                    key={`week ${thisWeek.weekNumber} ${thisWeek.start.getFullYear()}`}
                >
                    {thisWeek.weekNumber}
                </div>
            )
        }

        let className = "typography-paragraph-small";

        if (thisDate.formatDate() === today.formatDate()) className += " today";

        if (
            thisDate.getMonth() !== props.currentDate.getMonth() ||
            (props.minDate && thisDate.isBefore(props.minDate)) ||
            (props.maxDate && thisDate.isAfter(props.maxDate))
        ) className += " disabled";
        else if (props.selectedDate && props.selectedDate.includes(thisDate.formatDate('yyyy-mm-dd'))) className += " selected";

        (dayCards[`${thisWeek.start.formatDate()}`] = dayCards[`${thisWeek.start.formatDate()}`] || []).push(
            <div className={className} key={thisDate.formatDate()} onClick={e => {
                e.stopPropagation()
                props.onDateSelect(thisDate);
            }}>{thisDate.getMonth() === props.currentDate.getMonth() ? thisDate.getDate() : ''}</div>
        )
    }


    return <div className="calendar-stateless-component">
        <div className={props.includeWeek ? "calendar-content calendar-with-week" : "calendar-content"}>
            <div className={`row-header-${props.includeWeek ? 'week' : 'no-week'}`}>
                {
                    props.includeWeek &&
                    <div className="week-col">W</div>
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
                    return <div className="row" key={w} >
                        {
                            dayCards[w]
                        }
                    </div>
                })
            }
        </div>
    </div>
}