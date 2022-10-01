// React
import React, { useEffect, useState } from 'react';

// Materail UI
import LoopIcon from '@mui/icons-material/LoopRounded'

// Component
import InputSet from '../../InputSet';

// Types
import { ViewData } from '../main/main';

type InputSetPropsType = React.ComponentProps<typeof InputSet>;

export function inputSetOptions(): ViewData {

    return {
        constants: {            
        } as Partial<InputSetPropsType>,
        variables: {
            error: {
                options: [false, true],
                default: false,
            },
            disabled: {
                options: [false, true],
                default: false,
            },
            withPlaceholder: {
                options: [false, true],
                default: false,
            },
            size: {
                options: ["small", "medium", "large", "full"],
                default: 'medium'
            },
            withTip: {
                options: [false, true],
                default: false,
            },
            withActionButton: {
                options: [false, true],
                default: false,
            },
            type: {
                options: ['text', 'number', 'password'],
                default: "text"
            },
            inputType: {
                options: ['input', 'textarea'],
                default: "input"
            }
        }
    }    
}


export function InputSetCreator(props: {p: InputSetPropsType}) {
    let [value, setValue] = useState<string>(props.p.value);

    useEffect(() => {
        setValue(props.p.value);
    }, [props.p.value])

    return <InputSet 
        error={props.p.error}
        label={"Label"}
        onChange={v => setValue(v)}
        value={value}
        disabled={props.p.disabled}
        placeholder={(props.p as any).withPlaceholder ? 'Placeholder...' : undefined}
        size={props.p.size}
        tip={(props.p as any).withTip ? "This is a tip to the user" : undefined}
        type={props.p.type}
        inputType={props.p.inputType}
        actionButton={(props.p as any).withActionButton ? {
            description: "This button does something nice!",
            icon: <LoopIcon />,
            onClick: () => {}
        } : undefined}
    />

}

