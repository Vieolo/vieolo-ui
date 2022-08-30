// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import ExpandableCard from '../../ExpandableCard';
import IconButton from '../../IconButton';
import Typography from '../../Typography';

// Types
import { ViewData } from '../main/main';

type ExpandableCardPropsType = React.ComponentProps<typeof ExpandableCard>;

export function expandableCardOptions(): ViewData {

    return {
        constants: {

        } as Partial<ExpandableCardPropsType>,
        variables: {

        }
    }
}


export function ExpandableCardCreator(props: {p: ExpandableCardPropsType}) {

    return <ExpandableCard
        title='Expandable Card'
        collapsedCardStyle={{
            emphasis: 'low-normal'
        }}
        expandedCardStyle={{
            emphasis: 'low-normal'
        }}
        actions={[
            <IconButton 
                icon={<IconOne />}
                onClick={() => {}}
                size='small'
                key={"button 1"}
                emphasis='medium'
            />,
            <IconButton 
                icon={<IconTwo />}
                onClick={() => {}}
                size='small'
                key={"button 2"}
                emphasis='medium'
            />
        ]}
    >
        <Typography text='This is the content!' />
    </ExpandableCard>
}