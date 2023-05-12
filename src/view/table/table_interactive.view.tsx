// React
import React, { useEffect, useState } from 'react';

// Component
import TableInteractive, { TableInteractiveCell } from '../../TableInteractive';

// Types
import { ViewData } from '../main/main';
import VDate from '@vieolo/vdate';
import Card from '../../Card';

type TableInteractivePropsType = React.ComponentProps<typeof TableInteractive>;

export function tableInteractiveOptions(): ViewData {

    return {
        constants: {

        } as Partial<TableInteractivePropsType>,
        variables: {
            selectedColor: 'colors',
            isDense: 'boolean',
            headerSticky: 'boolean',
            showBottomRow: 'booleanTrueDefault'
        }
    }
}


export function TableInteractiveCreator(props: {p: TableInteractivePropsType}) {

    type td = {id: number, date: string, price: number, item: string, group?: number};

    let [data, setData] = useState<td[]>([]);


    useEffect(() => {
        let x: td[] = [];
        for (let i = 0; i < 40; i++) {
            x.push({
                id: i,
                date: new VDate().addDay(i).formatDate(),
                item: `item ${i}`,
                price: (i * 12) || 5,
                group: i === 5 ? 14 : undefined
            })
        }
        setData(x);
    }, [])

    

    return <TableInteractive
        isDense={props.p.isDense}
        headerSticky={props.p.headerSticky}
        selectedColor={props.p.selectedColor}
        showBottomRow={props.p.showBottomRow}
        columnGrid='100px 100px 1fr 150px 100px'
        headers={['ID', "Date", "Item", "group", {name: 'Price', formatter: (s) => `€ ${s}`}]}
        rows={data.map(d => {
            return [
                {
                    value: d.id,
                    selectable: true,
                    numericalValue: d.id
                },
                {
                    value: d.date,
                    background: d.date === new VDate().formatDate() ? 'success' : undefined,
                    onClick: (id) => alert(`${d.item} - ${d.id}`)
                },
                {
                    id: `id: ${d.id}`,
                    value: d.item,
                    onTextEdit: v => {
                        setData(data.map(z => {
                            if (z.id === d.id) {
                                z.item = v;
                            }
                            return z;
                        }))
                    }
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
                    numericalValue: d.price,
                    selectable: true
                }
            ] as TableInteractiveCell[]
        })}
    />
}