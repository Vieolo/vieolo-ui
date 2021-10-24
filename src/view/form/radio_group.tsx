// React
import React, { useState } from 'react';

// Component
import RadioGroup from '../../lib/form/radio_group';

// Material UI
import SampleIcon1 from '@mui/icons-material/AccessibleForwardTwoTone';
import SampleIcon2 from '@mui/icons-material/Backspace';
import SampleIcon3 from '@mui/icons-material/Cached';
import SampleIcon4 from '@mui/icons-material/Dashboard';

type RadioGroupPropsType = React.ComponentProps<typeof RadioGroup>;

export function radioGroupOptions(): { [key: string]: RadioGroupPropsType } {    

    let baseProps: RadioGroupPropsType = {
        direction: 'horizontal',
        onOptionChange: () => {},
        value: 'One',
        options: [
            {id: 'One', button: 'One'},
            {id: 'Two', button: 'Two'},
            {id: 'Three', button: 'Three'},
        ]
    }

    return {
        "Basic Horizontal": {
            ...baseProps
        },
        "Basic Vertical": {
            ...baseProps,
            direction: 'vertical'
        },
        "Horizontal With Custom Padding": {
            ...baseProps,
            horizontalButtonPadding: 30
        },
        "Vertical With Custom Padding": {
            ...baseProps,
            horizontalButtonPadding: 30,
            direction: 'vertical'
        },
        "Horizontal With Long Text": {
            ...baseProps,
            horizontalButtonPadding: 30,
            options: [
                {id: 'One', button: 'A Very Long Text'},
                {id: 'Two', button: 'Two'},
                {id: 'Three', button: 'Three'},
            ]   
        },
        "Vertical With Long Text": {
            ...baseProps,
            horizontalButtonPadding: 30,
            direction: 'vertical',
            options: [
                {id: 'One', button: 'A Very Long Text'},
                {id: 'Two', button: 'Two'},
                {id: 'Three', button: 'Three'},
            ]   
        },
        "Horizontal With Icon": {
            ...baseProps,
            horizontalButtonPadding: 30,
            options: [
                {
                    id: 'One', 
                    button: <SampleIcon1 />
                },
                {
                    id: 'Two', 
                    button: <SampleIcon2 />
                },
                {
                    id: 'Three', 
                    button: <SampleIcon3 />
                },
                {
                    id: 'Four', 
                    button: <SampleIcon4 />
                },
            ]   
        },
        "Vertical With Icon": {
            ...baseProps,
            horizontalButtonPadding: 30,
            direction: 'vertical',
            options: [
                {
                    id: 'One', 
                    button: <SampleIcon1 />
                },
                {
                    id: 'Two', 
                    button: <SampleIcon2 />
                },
                {
                    id: 'Three', 
                    button: <SampleIcon3 />
                },
                {
                    id: 'Four', 
                    button: <SampleIcon4 />
                },
            ]   
        },
    }
}


export function RadioGroupCreator(props: {p: RadioGroupPropsType}) {
    let [selected, setSelected] = useState<string>("One");

    return <RadioGroup 
        direction={props.p.direction}
        onOptionChange={o => setSelected(o)}
        options={props.p.options}
        value={selected}
        horizontalButtonPadding={props.p.horizontalButtonPadding}
    />

}

