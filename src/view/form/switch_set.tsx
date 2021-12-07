// React
import React, { useState } from 'react';

// Component
import SwitchSet from '../../lib/form/switch_set';

// Types
import { ViewData } from '../main/main';

type SwitchSetPropsType = React.ComponentProps<typeof SwitchSet>;

export function switchSetOptions(): ViewData {

    return {
        constants: {
            switchID: 'sample_id',
            title: "Switch Title",
        } as Partial<SwitchSetPropsType>,
        variables: {
            disabled: {
                options: [false, true],
                default: false,
            },
            withSubtitle: {
                options: [true, false],
                default: false
            }
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
        subtitle={(props.p as any).withSubtitle ? "Switching this switch results in a change that no one expects" : null}
    />

}

