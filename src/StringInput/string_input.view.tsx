
// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import StringInput from './string_input';

// Types
import { ViewData } from '../view/main/main';

type StringInputPropsType = React.ComponentProps<typeof StringInput>;

export function stringInputOptions(): ViewData {

    return {
        constants: {

        } as Partial<StringInputPropsType>,
        variables: {

        }
    }
}


export function StringInputCreator(props: {p: StringInputPropsType}) {

    return <StringInput

    />
}
