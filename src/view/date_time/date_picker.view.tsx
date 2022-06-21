// React
import React, { useState } from 'react';

// Installed Packages
import VDate from '@vieolo/date';

// Component
import DatePicker from '../../DatePicker';

// Types
import { ViewData } from '../main/main';

type DatePickerPropsType = React.ComponentProps<typeof DatePicker>;

export function datePickerOptions(): ViewData {

    return {
        constants: {

        } as Partial<DatePickerPropsType>,
        variables: {
            includeWeek: {
                options: [false, true],
                default: false
            },
            showSelectedWeek: {
                options: [false, true],
                default: false
            },
            showTitle: {
                options: [false, true],
                default: false
            },
            disabled: 'boolean'
        }
    }
}


export function DatePickerCreator(props: {p: DatePickerPropsType}) {

    let [date, setDate] = useState<VDate>(new VDate());

    return <DatePicker
        onDateSelect={v => setDate(v)}
        includeWeek={props.p.includeWeek}
        onWeekSelect={v => setDate(v)}
        selectedDate={date}
        title={(props.p as any).showTitle ? "Date" : undefined}
        showSelectedWeek={props.p.showSelectedWeek}
        disabled={props.p.disabled}
        selectedWeek={{
            startDate: date.getWeek().start,
            weekNumber: date.getWeek().weekNumber
        }}
    />
}