// React
import VDate from '@vieolo/vdate';
import React, { useState } from 'react';

// Component
import PeriodSelector, { PeriodOptions } from '../../PeriodSelector';

// Types
import { ViewData } from '../main/main';

type PeriodSelectorPropsType = React.ComponentProps<typeof PeriodSelector>;

export function periodSelectorOptions(): ViewData {

    return {
        constants: {            
        } as Partial<PeriodSelectorPropsType>,
        variables: {
            otherPeriodOptions: {
                options: [false, true],
                default: false,
            }
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
        periodOptions={(props.p as any).otherPeriodOptions ? [
            PeriodOptions.day,
            PeriodOptions.week,
            PeriodOptions.month,
            PeriodOptions.quarter,
            PeriodOptions.year
        ] : undefined}
    />

}

