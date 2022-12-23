
// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import VieoloScaffold from './vieolo_scaffold';

// Types
import { ViewData } from '../view/main/main';

type VieoloScaffoldPropsType = React.ComponentProps<typeof VieoloScaffold>;

export function vieoloScaffoldOptions(): ViewData {

    return {
        constants: {

        } as Partial<VieoloScaffoldPropsType>,
        variables: {

        }
    }
}


export function VieoloScaffoldCreator(props: {p: VieoloScaffoldPropsType}) {

    return <VieoloScaffold

    />
}
