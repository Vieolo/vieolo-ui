
// React
import React from 'react';

// Material UI
import IconThree from '@mui/icons-material/Cake';

// Vieolo UI
import FloatingActionButton from './floating_action_button';

// Types
import { ViewData } from '../view/main/main';
import Typography from '../Typography';

type FloatingActionButtonPropsType = React.ComponentProps<typeof FloatingActionButton>;

export function floatingActionButtonOptions(): ViewData {

    return {
        constants: {

        } as Partial<FloatingActionButtonPropsType>,
        variables: {
            borderRadius: 'borderRadius'
        }
    }
}


export function FloatingActionButtonCreator(props: { p: FloatingActionButtonPropsType }) {

    return <div>
        <Typography text='To improve the UX of this page in the mobile devices, the FAB is pushed up not to interfere with the menu FAB' />
        <Typography text='In production, the FAB is placed at 2 base unit from the bottom and right' />
        
        <FloatingActionButton
            icon={<IconThree />}
            height='large'
            text='Something'
            borderRadius={props.p.borderRadius}
        />
    </div>
}
