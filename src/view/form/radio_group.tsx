// React
import React, { useEffect, useState } from 'react';

// Component
import RadioGroup from '../../lib/form/radio_group';
import IconButton from '../../lib/button/icon_button';

// Material UI
import SampleIcon1 from '@material-ui/icons/AccessibleForwardTwoTone';
import SampleIcon2 from '@material-ui/icons/Backspace';
import SampleIcon3 from '@material-ui/icons/Cached';
import SampleIcon4 from '@material-ui/icons/Dashboard';

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
        "Basic": {
            ...baseProps
        },
        "With Custom Padding": {
            ...baseProps,
            horizontalButtonPadding: 30
        },
        "With Long Text": {
            ...baseProps,
            horizontalButtonPadding: 30,
            options: [
                {id: 'One', button: 'A Very Long Text'},
                {id: 'Two', button: 'Two'},
                {id: 'Three', button: 'Three'},
            ]   
        },
        "With Icon": {
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

