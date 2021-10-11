// React
import React, { useEffect, useState } from 'react';

// Component
import RadioGroup from '../../lib/form/radio_group';

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
        }        
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

