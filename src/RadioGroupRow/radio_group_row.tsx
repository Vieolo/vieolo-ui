import React from 'react';

// Vieolo UI
import RadioGroup from '../RadioGroup';

// Types
import { RowHeightType } from '../types/types';

//Private
import SetRowTemplate from '../private/ComponentRowTemplate';

type RadioGroupPropType = Omit<React.ComponentProps<typeof RadioGroup>, "direction"> 

export default function RadioGroupRow(props: {
    title: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
    height?: RowHeightType | "default",    
} & RadioGroupPropType) {
    return <SetRowTemplate
        title={props.title}
        subtitle={props.subtitle}
        handleKeyboardNav={false}
        className="vieolo-radio-group-row"
        height={props.height}
        disabled={props.disabled}
        rightSideComponent={
            <RadioGroup
                {...props}
                direction={"horizontal"}
            />
        }
    />
}