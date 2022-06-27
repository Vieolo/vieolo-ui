// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';

// Vieolo UI
import SubNavbarRow from '../../../SubNavbarRow';

// Types
import { ViewData } from '../../main/main';
import Spinner from '../../../Spinner/spinner';
import IconButton from '../../../IconButton';

type SubNavbarRowPropsType = React.ComponentProps<typeof SubNavbarRow>;

export function subNavbarRowOptions(): ViewData {

    return {
        constants: {

        } as Partial<SubNavbarRowPropsType>,
        variables: {

        }
    }
}


export function SubNavbarRowCreator(props: {p: SubNavbarRowPropsType}) {

    return <div className='padding--one' style={{backgroundColor: '#f2f2f2'}}>
        <SubNavbarRow
            center={<Spinner size='small' />}
            actions={[
                <IconButton icon={<IconOne />} onClick={() => {}} />
            ]}
        />
    </div>
}