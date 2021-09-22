// React
import React, { useState } from 'react';

// Component
import SwitchSet from '../../lib/form/switch_set';

type SwitchSetPropsType = React.ComponentProps<typeof SwitchSet>;

export function switchSetOptions(): { [key: string]: SwitchSetPropsType } {
    
    let baseProps: SwitchSetPropsType = {
        on: false,
        onChange: () => {},
        switchID: 'sample_id',
        title: "Switch Title",
    }

    return {
        "Basic": {
            ...baseProps
        },
        "With Subtitle": {
            ...baseProps,
            subtitle: "Switching this switch results in a change that no one expects",
        },
        "Disabled": {
            ...baseProps,
            subtitle: "Switching this switch results in a change that no one expects",
            disabled: true
        }
    }
}


export function SwitchSetCreator(props: {p: SwitchSetPropsType}) {
    let [on, setOn] = useState<boolean>(false);

    return <SwitchSet
        on={on}
        onChange={v => setOn(v)}
        switchID={props.p.switchID}
        title={props.p.title}
        disabled={props.p.disabled}
        subtitle={props.p.subtitle}
    />

}

