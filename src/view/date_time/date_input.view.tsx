// React
import React, { useState } from 'react';

// Component
import DateInput from '../../lib/date_time/date_input';

// Types
import { ViewData } from '../main/main';

// Installed Packages
import VDate from '@vieolo/date';
import { TypographyParagraphMedium } from '../../lib/typography';

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

        <TypographyParagraphMedium text={`Date: ${!date ? 'null' : date.formatDate('dd/mm/yyyy')}`} />

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