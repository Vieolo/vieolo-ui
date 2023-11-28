
// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';

// Vieolo UI
import TimeoutChip from './timeout_chip';

// Types
import { ViewData } from '../view/main/main';

type TimeoutChipPropsType = React.ComponentProps<typeof TimeoutChip>;

export function timeoutChipOptions(): ViewData {

    return {
        constants: {

        } as Partial<TimeoutChipPropsType>,
        variables: {

        }
    }
}


export function TimeoutChipCreator(props: {p: TimeoutChipPropsType}) {

    return <TimeoutChip
        label='Click to copy'

        normalIcon={<IconOne />}
        normalColor='neutral'
        normalEmphasis='low'
        
        timeoutIcon={<IconTwo />}
        timeoutColor='primary'
        timeoutEmphasis='high'
        
    />
}
