import React from 'react';

// Vieolo UI
import RadioGroup from '../RadioGroup';

// Types
import { RadioButtonType } from '../RadioGroup';
import { RowHeightType } from '../types/types';

//Private
import SetRowTemplate from '../private/ComponentRowTemplate';

export default function RadioGroupSet(props: {
    title: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
    value: string,
    options: RadioButtonType[],
    disabled?: boolean,
    height?: RowHeightType | "default",
    onOptionChange: (o: string) => void,
    /** Defaults to 10px */
    horizontalButtonPadding?: number
    direction?: 'horizontal' | 'vertical'
}) {
    return <SetRowTemplate
        title={props.title}
        subtitle={props.subtitle}
        handleKeyboardNav={false}
        className="vieolo-radio-group-set"
        height={props.height}
        disabled={props.disabled}
        rightSideComponent={
            <RadioGroup
                value={props.value}
                options={props.options}
                onOptionChange={props.onOptionChange}
                disabled={props.disabled}
                direction={"horizontal"}
                horizontalButtonPadding={props.horizontalButtonPadding}
            />
        }
    />
}