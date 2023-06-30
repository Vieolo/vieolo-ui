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
            elevation: {
                options: ['default', '0', '1', '2'],
                default: 'default'
            }
        }
    }
}


export function SubNavbarRowCreator(props: {p: SubNavbarRowPropsType}) {

    return <div className='padding--one' style={{backgroundColor: '#f2f2f2'}}>
        <SubNavbarRow
            elevation={(props.p as any).elevation === 'default' ? undefined : props.p.elevation}
            center={<Spinner size='small' />}
            actions={[
                <IconButton icon={<IconOne />} onClick={() => {}} />
            ]}
        />
    </div>
}