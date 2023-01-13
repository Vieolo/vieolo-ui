// React
import React, { useState } from 'react';

// Component
import RadioGroup, { RadioButtonType } from '../../RadioGroup';
import Card from '../../Card';

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
            color: 'colors',
            direction: {
                options: ['horizontal', "vertical"],
                default: "horizontal"
            },
            horizontalButtonPadding: {
                options: ["none", "half", "one", "two"],
                default: "half",
            },
            verticalButtonPadding: {
                options: ["none", "half", "one", "two"],
                default: "half",
            },
            gap: {
                options: ["none", "half", "one", "two"],
                default: "none"
            },
            withIcon: {
                options: [false, true],
                default: false
            },
            withSubtitle: {
                options: [false, true],
                default: false
            },
            removeTitle: {
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

    let textOptions: RadioButtonType[] = [
        { id: 'One', title: 'A Very Long Text', icon: <SampleIcon1 />, subTitle: "Some long sub title explaning the option" },
        { id: 'Two', title: 'Two', icon: <SampleIcon2 />, subTitle: "Some long sub title explaning the option" },
        { id: 'Three', title: 'Three', icon: <SampleIcon3 />, subTitle: "Some long sub title explaning the option" },
    ];

    if (!(props.p as any).withIcon) {
        textOptions = textOptions.map(z => { return { ...z, icon: undefined } })
    }
    
    if (!(props.p as any).withSubtitle) {
        textOptions = textOptions.map(z => { return { ...z, subTitle: undefined } })
    }
    
    if ((props.p as any).removeTitle) {
        textOptions = textOptions.map(z => { return { ...z, title: undefined } })
    }

    return <Card emphasis='medium' color='accessory-orange' className={props.p.direction === 'vertical' ? 'width--px-300' : undefined}>
        <RadioGroup
            direction={props.p.direction}
            onOptionChange={o => setSelected(o)}
            disabled={props.p.disabled}
            options={textOptions}
            value={selected}
            horizontalButtonPadding={props.p.horizontalButtonPadding}
            verticalButtonPadding={props.p.verticalButtonPadding}
            color={props.p.color}
            gap={props.p.gap}
        />
    </Card>

}

