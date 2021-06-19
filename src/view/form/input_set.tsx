// React
import React, { useEffect, useState } from 'react';

// Materail UI
import LoopIcon from '@material-ui/icons/LoopRounded'

// Component
import InputSet from '../../lib/form/input_set';

type InputSetPropsType = React.ComponentProps<typeof InputSet>;

export function inputSetOptions(): { [key: string]: InputSetPropsType } {    

    let baseProps: InputSetPropsType = {
        error: false,
        label: "Label",
        onChange: v => {},
        value: "Value",
    }

    return {
        "Empty": {
            ...baseProps,
            value: ''
        },
        "With Error": {
            ...baseProps,
            error: true,
        },
        "Disabled": {
            ...baseProps,
            disabled: true
        },
        "With Placeholder": {
            ...baseProps,
            value: "",
            placeholder: "Search..."
        },
        "Size -- Small": {
            ...baseProps,
            size: 'small',
        },
        "Size -- Medium": {
            ...baseProps,
            size: 'medium',
        },
        "Size -- Large": {
            ...baseProps,
            size: 'large',
        },
        "Size -- Full Width": {
            ...baseProps,
            size: 'full',
        },
        "With Tip": {
            ...baseProps,
            tip: "This is a tip displayed to the user"
        },
        "With Action Button": {
            ...baseProps,
            actionButton: {
                description: "This button does something nice!",
                icon: <LoopIcon />,
                onClick: () => {}
            }
        },
        "With Action Button and Tip": {
            ...baseProps,
            actionButton: {
                description: "This button does something nice!",
                icon: <LoopIcon />,
                onClick: () => {}
            },
            tip: "This is a tip displayed to the user"
        },
        "Type -- Number": {
            ...baseProps,
            type: 'number'
        },
        "Type -- Password": {
            ...baseProps,
            type: 'password'
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
        label={props.p.label}
        onChange={v => setValue(v)}
        value={value}
        disabled={props.p.disabled}
        placeholder={props.p.placeholder}
        size={props.p.size}
        tip={props.p.tip}
        type={props.p.type}
        actionButton={props.p.actionButton}
    />

}

