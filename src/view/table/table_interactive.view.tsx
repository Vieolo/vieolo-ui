// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import TableInteractive, { TableInteractiveCell } from '../../lib/table/table_interactive';

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

    let data: {id: number, date: string, price: number, item: string}[] = [];

    for (let i = 0; i < 20; i++) {
        data.push({
            id: i,
            date: new VDate().addDay(i).formatDate(),
            item: `item ${i}`,
            price: (i * 12) || 5
        })
    }

    return <TableInteractive
        columnGrid='100px 100px 1fr 100px'
        headers={['ID', "Date", "Item", "Price"]}
        rows={data.map(d => {
            return [
                {
                    value: d.id
                },
                {
                    value: d.date,
                    background: d.date === new VDate().formatDate() ? 'success' : undefined
                },
                {
                    value: d.item,
                },
                {
                    value: d.price,
                    background: d.price > 200 ? 'error' : undefined
                }
            ] as TableInteractiveCell[]
        })}
    />
}