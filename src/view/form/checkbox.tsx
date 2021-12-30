// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import Checkbox from '../../lib/form/checkbox';

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