// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import DateTimePicker from '../../lib/date_time/date_time_picker';

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

    let [hour, setHour] = useState<number>(0)
    let [minute, setMinute] = useState<number>(0);
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

            setTimeText(t);
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