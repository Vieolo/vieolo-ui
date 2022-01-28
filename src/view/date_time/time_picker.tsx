// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import TimePicker from '../../lib/date_time/time_picker';

// Types
import { ViewData } from '../main/main';
import { TypographyParagraphMedium } from '../../lib/typography';

type TimePickerPropsType = React.ComponentProps<typeof TimePicker>;

export function timePickerOptions(): ViewData {

    return {
        constants: {

        } as Partial<TimePickerPropsType>,
        variables: {
            disabled: 'boolean'
        }
    }
}


export function TimePickerCreator(props: {p: TimePickerPropsType}) {

    let [hour, setHour] = useState<number>(0)
    let [minute, setMinute] = useState<number>(0);
    let [timeText, setTimeText] = useState<string>("00:00");

    return <div>

        <TypographyParagraphMedium text={`Hour: ${hour} -- Minute: ${minute}`} />

        <div className="padding-vertical--one"></div>

        <TimePicker
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