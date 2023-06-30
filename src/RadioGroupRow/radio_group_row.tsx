import React from 'react';

// Vieolo UI
import RadioGroup from '../RadioGroup';

// Types
import { RowHeightType } from '../types/types';

//Private
import ComponentRowTemplate, {ComponentRowTemplateResponsive} from '../private/ComponentRowTemplate';

type RadioGroupPropType = Omit<React.ComponentProps<typeof RadioGroup>, "direction"> 

export default function RadioGroupRow(props: {
    /** The label of the row, appearing on the left side */
    title: string | React.ReactNode,
    /** The subtitle appears below the title */
    subtitle?: string | React.ReactNode,
    height?: RowHeightType | "default",    
    /**
     * Whether the title column should be positioned on the top of RadioGroup to accomodate for smaller screens.
     * 
     * You can explicitly determine the breakpoint from which the row is responsive. If a boolean is given, the breakpoint will be considered to the mobile layout
     */
    responsive?: ComponentRowTemplateResponsive
} & RadioGroupPropType) {
    return <ComponentRowTemplate
        title={props.title}
        responsive={props.responsive}
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