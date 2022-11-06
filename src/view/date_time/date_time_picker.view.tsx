// React
import React, { useState } from 'react';

// Component
import DateTimePicker from '../../DateTimePicker';

// Installed Packages
import VDate from '@vieolo/date';

// Types
import { ViewData } from '../main/main';

type DateTimePickerPropsType = React.ComponentProps<typeof DateTimePicker>;

export function dateTimePickerOptions(): ViewData {

    return {
        constants: {

        } as Partial<DateTimePickerPropsType>,
        variables: {
            includeWeek: {
                options: [false, true],
                default: false
            },
            showSelectedWeek: {
                options: [false, true],
                default: false,
            },
            disabled: 'boolean'
        }
    }
}


export function DateTimePickerCreator(props: {p: DateTimePickerPropsType}) {

    let [, setHour] = useState<number>(0)
    let [, setMinute] = useState<number>(0);
    let [timeText, setTimeText] = useState<string>("00:00");
    let [date, setDate] = useState<VDate>(new VDate());

    return <DateTimePicker
        timeValue={timeText}
        label="Date and Time"
        disabled={props.p.disabled}
        onTimeChange={(h, m, t) => {
            if (h !== null && m !== null) {
                setHour(h);
                setMinute(m);
            }

            setTimeText(t || '');
        }}
        onDateSelect={v => setDate(v)}
        includeWeek={props.p.includeWeek}
        onWeekSelect={v => setDate(v)}
        selectedDate={date}
        showSelectedWeek={props.p.showSelectedWeek}
        selectedWeek={{
            startDate: date.getWeek().start,
            weekNumber: date.getWeek().weekNumber
        }}
    />
}