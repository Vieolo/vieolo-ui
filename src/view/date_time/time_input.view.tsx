// React
import React, { useState } from 'react';

// Component
import TimeInput from '../../lib/date_time/time_input';

// Types
import { ViewData } from '../main/main';
import { TypographyParagraphMedium } from '../../lib/typography';

type TimeInputPropsType = React.ComponentProps<typeof TimeInput>;

export function timeInputOptions(): ViewData {

    return {
        constants: {

        } as Partial<TimeInputPropsType>,
        variables: {
            disabled: 'boolean'
        }
    }
}


export function TimeInputCreator(props: {p: TimeInputPropsType}) {

    let [hour, setHour] = useState<number>(0)
    let [minute, setMinute] = useState<number>(0);
    let [timeText, setTimeText] = useState<string>("00:00");

    return <div>

        <TypographyParagraphMedium text={`Hour: ${hour} -- Minute: ${minute}`} />

        <div className="padding-vertical--one"></div>

        <TimeInput
            value={timeText}
            label="Time"
            disabled={props.p.disabled}
            onChange={(h, m, t) => {
                if (h !== null && m !== null) {
                    setHour(h);
                    setMinute(m);
                }

                setTimeText(t);
            }}
        />

    </div>
}