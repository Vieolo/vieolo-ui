// React
import React from 'react';

// Component
import TableInteractive, { TableInteractiveCell } from '../../lib/table/table_interactive';

// Types
import { ViewData } from '../main/main';
import VDate from '@vieolo/date';
import Card from '../../lib/card/card';

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

    let data: {id: number, date: string, price: number, item: string, group?: number}[] = [];

    for (let i = 0; i < 20; i++) {
        data.push({
            id: i,
            date: new VDate().addDay(i).formatDate(),
            item: `item ${i}`,
            price: (i * 12) || 5,
            group: i === 5 ? 4 : undefined
        })
    }

    return <TableInteractive
        columnGrid='100px 100px 1fr 150px 100px'
        headers={['ID', "Date", "Item", "group", "Price"]}
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
                    onClick: () => alert(d.item)
                },
                {
                    value: !d.group 
                        ? ""
                        : <Card 
                            height='100%'
                            emphasis='low'
                        >
                            Group
                        </Card>,
                    span: !d.group ? undefined : {
                        direction: 'bottom',
                        span: d.group
                    }
                },
                {
                    value: d.price,
                    background: d.price > 200 ? 'error' : undefined
                }
            ] as TableInteractiveCell[]
        })}
    />
}