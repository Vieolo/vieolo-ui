// React
import React, { useState } from 'react';

// Component
import RadioGroup from '../../RadioGroup';

// Material UI
import SampleIcon1 from '@mui/icons-material/AccessibleForwardTwoTone';
import SampleIcon2 from '@mui/icons-material/Backspace';
import SampleIcon3 from '@mui/icons-material/Cached';

// Types
import { ViewData } from '../main/main';

type RadioGroupPropsType = React.ComponentProps<typeof RadioGroup>;

export function radioGroupOptions(): ViewData {

    return {
        constants: {

        } as Partial<RadioGroupPropsType>,
        variables: {
            direction: {
                options: ['horizontal', "vertical"],
                default: "horizontal"
            },
            horizontalButtonPadding: {
                options: ["10", "20", "30"],
                default: 10,
                type: 'number'
            },
            withIcon: {
                options: [false, true],
                default: false
            },
            disabled: {
                options: [false, true],
                default: false,
            }
        }
    }
}


export function RadioGroupCreator(props: { p: RadioGroupPropsType }) {
    let [selected, setSelected] = useState<string>("One");

    let textOptions = [
        {id: 'One', button: 'A Very Long Text'},
        {id: 'Two', button: 'Two'},
        {id: 'Three', button: 'Three'},
    ];

    let iconOptions = [
        { id: 'One', button: <SampleIcon1 /> },
        { id: 'Two', button: <SampleIcon2 /> },
        { id: 'Three', button: <SampleIcon3 /> },
    ];

    return <RadioGroup
        direction={props.p.direction}
        onOptionChange={o => setSelected(o)}
        disabled = {props.p.disabled}
        options={(props.p as any).withIcon ? iconOptions : textOptions}
        value={selected}
        horizontalButtonPadding={props.p.horizontalButtonPadding}
    />

}

