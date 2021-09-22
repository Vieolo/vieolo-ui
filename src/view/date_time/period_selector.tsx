// React
import VDate from '@vieolo/date';
import React, { useState } from 'react';

// Component
import PeriodSelector, { PeriodOptions } from '../../lib/date_time/period_selector';

type PeriodSelectorPropsType = React.ComponentProps<typeof PeriodSelector>;

export function periodSelectorOptions(): { [key: string]: PeriodSelectorPropsType } {
    
    let baseProps: PeriodSelectorPropsType = {
        onDateChange: () => {},
        onPeriodChange: () => {},
        period: PeriodOptions.month,
        selectedDate: new VDate(),
    }

    return {
        "Monthly, Basic": {
            ...baseProps
        },
        "Monthly, with other period options": {
            ...baseProps,
            periodOptions: [
                PeriodOptions.day,
                PeriodOptions.week,
                PeriodOptions.month,
                PeriodOptions.quarter,
                PeriodOptions.year
            ]
        }
    }
}


export function PeriodSelectorCreator(props: {p: PeriodSelectorPropsType}) {
    let [selectedDate, setSelectedDate] = useState<VDate>(new VDate());
    let [selectedPeriod, setSelectedPeriod] = useState<PeriodOptions>(PeriodOptions.month);

    return <PeriodSelector
        onDateChange={d => setSelectedDate(d)}
        onPeriodChange={p => setSelectedPeriod(p)}
        period={selectedPeriod}
        selectedDate={selectedDate}
        periodOptions={props.p.periodOptions}
    />

}

