// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import TableInteractive from '../../lib/table/table_interactive';

// Types
import { ViewData } from '../main/main';
import VDate from '@vieolo/date';

type TableInteractivePropsType = React.ComponentProps<typeof TableInteractive>;

export function tableInteractiveOptions(): ViewData {

    return {
        constants: {

        } as Partial<TableInteractivePropsType>,
        variables: {

        }
    }
}


export function TableInteractiveCreator(props: {p: TableInteractivePropsType}) {

    return <TableInteractive
        columnGrid='100px 100px 1fr'
        headers={['ID', "Date", "Description"]}
        rows={[
            [
                {
                    value: "12",                
                },
                {
                    value: new VDate().formatDate(),
                },
                {
                    value: "items added"
                }
            ]
        ]}
    />
}