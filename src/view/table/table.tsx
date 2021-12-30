// React
import React, { useState } from 'react';

// Component
import Table, { TableSortDirection, TableRow } from '../../lib/table/table';
import IconButton from '../../lib/button/icon_button';

// Material UI
import SampleIcon from '@mui/icons-material/RefreshRounded';

// Types
import { ViewData } from '../main/main';

type TablePropsType = React.ComponentProps<typeof Table>;

export function tableOptions(): ViewData {

    return {
        constants: {
            columnGrid: '50px 90px 1fr 50px',
        } as Partial<TablePropsType>,
        variables: {
            removeHeaders: "boolean",
            disableSort: "boolean",
            isDense: "boolean",
            rowClickable: "boolean",
            stickyHeader: "boolean",
            withPagination: "boolean",
            withMaxHeight: "boolean",
        }
    }    
}


export function TableCreator(props: {p: TablePropsType}) {

    let [sort, setSort] = useState<string>("id");
    let [direction, setDirection] = useState<TableSortDirection>('ascending');

    let normalRows: React.ReactNode[][] = [
        ["1", "2020-10-10", "Some Description", <IconButton size="small" onClick={() => {}} icon={<SampleIcon />} />],
        ["2", "2020-10-11", "Some Description 2", <IconButton size="small" onClick={() => {}} icon={<SampleIcon />} />]
    ];

    let clickableRows: React.ReactNode[][] = [
        ["1", "2020-10-10", "Some Description", 'Done'],
        ["2", "2020-10-11", "Hello World!", 'N/A']
    ];

    let manyRows: React.ReactNode[][] = [
        ...Array(25).fill("").map((z, i) => {
            return [25-i, "2020-10-10", "Some Description", 'Done']
        })
    ]

    let finalRows: TableRow[] = ((props.p as any).rowClickable ? clickableRows : (props.p as any).withMaxHeight ? manyRows : normalRows).map((r, i) => {
        return {
            id: i.toString(),
            items: r,
            onClick: (props.p as any).rowClickable ? () => alert(`Index ${i} is selected`) : undefined
        }
    })
    ;
    let headers = ['id', 'Date', 'Description', ''];

    return <Table
        columnGrid={props.p.columnGrid}
        disableSort={props.p.disableSort}
        headers={(props.p as any).removeHeaders ? null : ['id', 'Date', 'Description', '']}
        onSortChange={(s, d) => {
            setSort(s);
            setDirection(d);
        }}
        rows={props.p.disableSort ? finalRows : [...finalRows].sort((a, b) => {
            let one = a.items[headers.indexOf(sort)];
            let two = b.items[headers.indexOf(sort)];
            if (direction === 'ascending') return one > two ? 1 : -1
            else return one > two ? -1 : 1
        })}
        sortBy={sort}
        sortDirection={direction}
        width={props.p.width}
        stickyHeader={props.p.stickyHeader}
        maxHeight={props.p.stickyHeader ?  "300px" : (props.p as any).withMaxHeight ? "500px" : undefined}
        pagination={(props.p as any).withPagination ? {
            endIndex: 25,
            hasNextPage: false,
            onPageChange: () => {},
            pageItemCount: 25,
            pageNumber: 1,
            startIndex: 1,                
        } : undefined}
        isDense={props.p.isDense}
    />

}

