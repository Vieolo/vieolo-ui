// React
import React from 'react';

// Private Components
import TipIcon from '../private/tip_icon';


// Public Components
import Select from '../Select';

type SelectPropType = React.ComponentProps<typeof Select>


export default function SelectSet(props: {
    label: string,
    tip?: string,
} & SelectPropType) {

    let actionComponent;

    if (props.tip) {
        actionComponent = <div className="tip-div vieolo-tooltip">
            <TipIcon />
            <div className="tooltip-text-small tooltip-text-down-left">{props.tip}</div>
        </div>
    }

    let className = `vieolo-select-set vieolo-select-set--${props.width || 'medium'}`
    if (props.disabled) {
        className += "disabled";
    }

    return <div
        className={className} >
        <div className="label-container">
            <label>
                {props.label}
            </label>
            {actionComponent && actionComponent}
        </div>

        <Select
            {...props}
        />
    </div>
}