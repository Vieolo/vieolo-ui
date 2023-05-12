
// React
import React from 'react';

// Vieolo UI
import CalendarStatistic from './calendar_statistic';

// Types
import { ViewData } from '../view/main/main';
import VDate from '@vieolo/vdate';
import Card from '../Card';

type CalendarStatisticPropsType = React.ComponentProps<typeof CalendarStatistic>;

export function calendarStatisticOptions(): ViewData {

    return {
        constants: {

        } as Partial<CalendarStatisticPropsType>,
        variables: {
            showPercentage: 'booleanTrueDefault'
        }
    }
}


export function CalendarStatisticCreator(props: { p: CalendarStatisticPropsType }) {

    return <Card className='width--px-300' emphasis='low'>
        <CalendarStatistic
            showPercentage={props.p.showPercentage}
            selectedMonth={new VDate()}
            defaultText="€0"
            data={{
                [new VDate().addDay(-1).formatDate()]: {
                    text: "€20",
                    percent: 0.16
                },
                [new VDate().formatDate()]: {
                    text: "€120",
                    disabled: true,
                    percent: {
                        value: 0.8,
                        color: 'alert'
                    }
                },
                [new VDate().addDay(1).formatDate()]: {
                    text: "€150",
                    percent: {
                        value: 1,
                        color: 'success'
                    }
                },
            }}
        />
    </Card>
}
