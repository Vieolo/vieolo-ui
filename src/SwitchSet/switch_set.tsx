// React
import React from 'react';

// Vieolo UI
import Switch from '../Switch';

// Types
import { RowHeightType } from '../types/types';

// Private
import SetRowTemplate from '../private/SetRowTemplate';

export default function SwitchSet(props: {
    title: string | React.ReactNode,
    subtitle?: string | React.ReactNode,
    on: boolean,
    onChange: (v: boolean) => void,
    switchID: string,
    disabled?: boolean,
    ariaLabel?: string,
    /**
     * The height of the row
     * To change the default height, override the "vieolo-swith-set--default-height" CSS class
     */
    height?: RowHeightType | "default"
}) {

    function handleChange() {
        props.onChange(!props.on);
    }

    return <SetRowTemplate
        title={props.title}
        subtitle={props.subtitle}
        disabled={props.disabled}
        height={props.height}
        className={"vieolo-switch-set"}
        handleKeyboardNav={true}
        onRowClick={handleChange}
        rightSideComponent={
            <Switch
                on={props.on}
                onChange={handleChange}
                switchID={props.switchID}
                disabled={props.disabled}
                ariaLabel={`${(props.ariaLabel || props.title)} switch`}
            />
        }
    />
}