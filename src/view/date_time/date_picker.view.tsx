// React
import React, { useState } from 'react';

// Installed Packages
import VDate from '@vieolo/vdate';

// Component
import DatePicker from '../../DatePicker';

// Types
import { ViewData } from '../main/main';
import GridContainer from '../../GridContainer';
import Grid from '../../Grid';
import InputSet from '../../InputSet';
import SelectSet from '../../SelectSet/select_set';

type DatePickerPropsType = React.ComponentProps<typeof DatePicker>;

export function datePickerOptions(): ViewData {

    return {
        constants: {

        } as Partial<DatePickerPropsType>,
        variables: {
            includeWeek: 'boolean',
            showSelectedWeek: 'boolean',
            showTitle: 'booleanTrueDefault',
            disabled: 'boolean',
            error: 'boolean',
            width: {
                options: ['small', 'medium', 'full'],
                default: "medium"
            },
            dateFormat: {
                options: ['yyyy-mm-dd', 'dd/mm/yyyy', 'mm/dd/yyyy'],
                default: "dd/mm/yyyy"
            }
        }
    }
}


export function DatePickerCreator(props: { p: DatePickerPropsType }) {

    let [date, setDate] = useState<VDate>(new VDate());

    return <GridContainer columnGap='one'>
        <Grid xl={4} >
            <DatePicker
                onDateSelect={v => setDate(v)}
                includeWeek={props.p.includeWeek}
                error={props.p.error}
                onWeekSelect={v => setDate(v)}
                selectedDate={date}
                title={(props.p as any).showTitle ? "Date" : undefined}
                showSelectedWeek={props.p.showSelectedWeek}
                disabled={props.p.disabled}
                width={props.p.width}
                dateFormat={props.p.dateFormat}
                selectedWeek={{
                    startDate: date.getWeek().start,
                    weekNumber: date.getWeek().weekNumber
                }}
            />
        </Grid>

        <Grid xl={4}>

            <InputSet
                error={false}
                label='For Comparison'
                onChange={v => { }}
                value=''
                size='full'
            />
        </Grid>
        
        <Grid xl={4}>
            <SelectSet 
                error={false}
                label='For Comparison'
                onSelect={v => {}}
                selectedItems={["one"]}
                width='full'
                items={[
                    {title: "One", value: "one"}
                ]}
            />
        </Grid>
    </GridContainer>

}