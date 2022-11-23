// React
import React from 'react';

// Vieolo UI
import Select from '../Select';

// Private
import ComponentRowTemplate from '../private/ComponentRowTemplate';

type SelectPropType = React.ComponentProps<typeof Select>

export default function SelectRow(props: {
    rowTitle: string | React.ReactNode,
    rowSubtitle?: string | React.ReactNode,
} & SelectPropType) {
    return <ComponentRowTemplate
        title={props.rowTitle}
        subtitle={props.rowSubtitle}
        disabled={props.disabled}
        handleKeyboardNav={false}
        className="vieolo-select-set"
        height={props.height}
        rightSideComponent={
            <Select
                {...props}
            />
        }
    />
}
