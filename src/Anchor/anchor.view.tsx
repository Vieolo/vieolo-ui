
// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import Anchor from './anchor';

// Types
import { ViewData } from '../view/main/main';

type AnchorPropsType = React.ComponentProps<typeof Anchor>;

export function anchorOptions(): ViewData {

    return {
        constants: {

        } as Partial<AnchorPropsType>,
        variables: {

        }
    }
}


export function AnchorCreator(props: {p: AnchorPropsType}) {

    return <Anchor

    />
}
