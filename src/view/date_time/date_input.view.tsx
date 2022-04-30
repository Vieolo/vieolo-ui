// React
import React, { useState } from 'react';

// Vieolo UI
import DateInput from '../../lib/date_time/date_input';
import Typography from '../../lib/typography/typography';

// Types
import { ViewData } from '../main/main';

// Installed Packages
import VDate from '@vieolo/date';

type DateInputPropsType = React.ComponentProps<typeof DateInput>;

export function dateInputOptions(): ViewData {

    return {
        constants: {

        } as Partial<DateInputPropsType>,
        variables: {

        }
    }
}


export function DateInputCreator(props: { p: DateInputPropsType }) {

    let [date, setDate] = useState<VDate | null>(null);
    let [text, setText] = useState<string>('');

    return <div>

        <Typography text={`Date: ${!date ? 'null' : date.formatDate('dd/mm/yyyy')}`} />

        <div className="padding--one"></div>

        <DateInput
            dateFormat='DD/MM/YYYY'
            onChange={(v, t) => {
                setDate(v);
                setText(t);
            }}
            value={text}
            label='Date'
        />
    </div>
}