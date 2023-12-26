
// React
import React from 'react';

// // Material UI
// import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import ProgressChip from './progress_chip';

// Types
import { ViewData } from '../view/main/main';

type ProgressChipPropsType = React.ComponentProps<typeof ProgressChip>;

export function progressChipOptions(): ViewData {

    return {
        constants: {

        } as Partial<ProgressChipPropsType>,
        variables: {

        }
    }
}


export function ProgressChipCreator(props: { p: ProgressChipPropsType }) {

    return <div>
        <ProgressChip
            label='6 of 10 tasks'
            progress={0.6}
            size='medium'
        />
    </div>
}
