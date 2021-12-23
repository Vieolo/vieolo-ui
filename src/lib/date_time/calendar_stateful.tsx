// React
import React, { useState, useEffect } from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';

// Material UI
import PreviousIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';


// Installed Packages
import VDate from '@vieolo/date';


// Internal Components
import CalendarStateless from './calendar_stateless';


// External Components
import IconButton from '../button/icon_button';




export default function CalendarStatefull(props: {
    startDate?: VDate,
    selectedDate?: string[],
    selectedWeek?: { weekNumber: number, startDate: VDate },
    includeWeek?: boolean,
    onDateSelect: (selected: VDate) => void,
    onWeekSelect?: (selected: VDate) => void,
    minDate?: VDate,
    maxDate?: VDate
}) {

    let [currentDate, setCurrentDate] = useState<VDate>(new VDate().setToDateStart());

    useEffect(() => {
        if (props.startDate) setCurrentDate(props.startDate);
        else if (props.selectedWeek) setCurrentDate(props.selectedWeek.startDate);
        // eslint-disable-next-line
    }, [])
    
    return <div className="vieolo-calendar-statefull-component">

        <div className="vieolo-calendar-statefull-component__calendar-year">
            <IconButton
                icon={<PreviousIcon />}
                size="small"
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addYear(-1);
                    setCurrentDate(newDate);
                }}
            />
            <TypographyParagraphMedium text={`${currentDate.getFullYear()}`} />
            <IconButton
                icon={<NextIcon />}
                size="small"
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addYear(1);
                    setCurrentDate(newDate);
                }}
            />
        </div>


        <div className="vieolo-calendar-statefull-component__calendar-month">
            <IconButton
                icon={<PreviousIcon />}
                size="small"
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addDay(-1).setToMonthStart();
                    setCurrentDate(newDate);
                }}
            />
            <TypographyParagraphMedium text={`${currentDate.formatMonth().split(' ')[0]}`} />
            <IconButton
                icon={<NextIcon />}
                size="small"
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addDay(33).setToMonthStart();
                    setCurrentDate(newDate);
                }}
            />

        </div>


        <CalendarStateless 
            currentDate={currentDate}
            onDateSelect={props.onDateSelect}
            includeWeek={props.includeWeek}
            onWeekSelect={props.onWeekSelect}
            selectedDate={props.selectedDate}
            selectedWeek={props.selectedWeek ? [props.selectedWeek.weekNumber] : undefined}
            maxDate={props.maxDate}
            minDate={props.minDate}
        />
    </div>
}
