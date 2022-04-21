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
            isDense: 'boolean',
            headerSticky: 'boolean'
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
        isDense={props.p.isDense}
        headerSticky={props.p.headerSticky}
        columnGrid='100px 100px 1fr 150px 100px'
        headers={['ID', "Date", "Item", "group", {name: 'Price', formatter: (s) => `€ ${s}`}]}
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
                    id: `id: ${d.id}`,
                    value: d.item,
                    onClick: (id) => alert(`${d.item} - ${id}`)
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
                    value: d.price.toString(),
                    background: d.price > 200 ? 'error' : undefined,
                    numericalValue: d.price
                }
            ] as TableInteractiveCell[]
        })}
    />
}