// React
import React, { useState } from 'react';

// Component
import Checkbox from '../../CheckBox';

// Types
import { ViewData } from '../main/main';

type CheckboxPropsType = React.ComponentProps<typeof Checkbox>;

export function checkboxOptions(): ViewData {

    return {
        constants: {

        } as Partial<CheckboxPropsType>,
        variables: {
            disabled: 'boolean',
        }
    }
}


export function CheckboxCreator(props: {p: CheckboxPropsType}) {

    let [value, setValue] = useState<boolean>(false);

    return <Checkbox
        value={value}
        onChange={v => setValue(v)}
        disabled={props.p.disabled}
    />
}