
// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import TablePagination from './table_pagination';

// Types
import { ViewData } from '../view/main/main';

type TablePaginationPropsType = React.ComponentProps<typeof TablePagination>;

export function tablePaginationOptions(): ViewData {

    return {
        constants: {

        } as Partial<TablePaginationPropsType>,
        variables: {

        }
    }
}


export function TablePaginationCreator(props: {p: TablePaginationPropsType}) {

    return <TablePagination

    />
}
