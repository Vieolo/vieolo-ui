// React
import React, { useState } from 'react';

// Component
import Table, { TableSortDirection, TableRow } from '../../Table';
import IconButton from '../../IconButton';

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
            checkable: "boolean",
            reorderable: 'boolean'
        }
    }
}


export function TableCreator(props: { p: TablePropsType }) {

    let [sort, setSort] = useState<string>("id");
    let [direction, setDirection] = useState<TableSortDirection>('ascending');
    let [checkedList, setCheckedList] = useState<string[]>([]);

    let headers = ['id', 'Date', 'Description', ''];

    let [normalRows, setNormalRows] = useState<React.ReactNode[][]>([
        ["1", "2020-10-10", "Some Description", <IconButton size="small" onClick={() => { }} icon={<SampleIcon />} />],
        ["2", "2020-10-11", "Some Description 2", <IconButton size="small" onClick={() => { }} icon={<SampleIcon />} />]
    ]);

    let [clickableRows, setClickableRows] = useState<React.ReactNode[][]>([
        ["1", "2020-10-10", "Some Description", 'Done'],
        ["2", "2020-10-11", "Hello World!", 'N/A']
    ]);

    let [manyRows, setManyRow] = useState<React.ReactNode[][]>([
        ...Array(25).fill("").map((z, i) => {
            return [25 - i, "2020-10-10", "Some Description", 'Done']
        })
    ]);

    let semiFinalRows: TableRow[] = ((props.p as any).rowClickable ? clickableRows : (props.p as any).withMaxHeight ? manyRows : normalRows).map((r, i) => {
        return {
            id: i.toString(),
            items: r,
            onClick: (props.p as any).rowClickable ? () => alert(`Index ${i} is selected`) : undefined
        }
    });

    let finalRows = props.p.disableSort ? semiFinalRows : [...semiFinalRows].sort((a, b) => {
        let one = a.items[headers.indexOf(sort)];
        let two = b.items[headers.indexOf(sort)];
        if (direction === 'ascending') return one > two ? 1 : -1
        else return one > two ? -1 : 1
    }).map(i => {
        return {
            id: i.id,
            items: i.items,
            checked: checkedList.includes(i.id),
            onCheckChange: () => {
                if (checkedList.includes(i.id)) setCheckedList(checkedList.filter(z => z !== i.id));
                else setCheckedList([...checkedList, i.id]);
            },
            onClick: i.onClick
        }
    })

    return <Table
        columnGrid={props.p.columnGrid}
        disableSort={props.p.disableSort}
        headers={(props.p as any).removeHeaders ? null : ['id', 'Date', 'Description', '']}
        onSortChange={(s, d) => {
            setSort(s);
            setDirection(d);
        }}
        rows={finalRows}
        sortBy={sort}
        sortDirection={direction}
        width={props.p.width}
        stickyHeader={props.p.stickyHeader}
        maxHeight={props.p.stickyHeader ? "300px" : (props.p as any).withMaxHeight ? "500px" : undefined}
        pagination={(props.p as any).withPagination ? {
            endIndex: 25,
            hasNextPage: false,
            onPageChange: () => { },
            pageItemCount: 25,
            pageNumber: 1,
            startIndex: 1,
        } : undefined}
        isDense={props.p.isDense}
        isCheckable={(props.p as any).checkable}
        onCheckAll={v => {
            if (!v) setCheckedList([]);
            else {
                setCheckedList(finalRows.map(i => i.id));
            }
        }}
        onReorder={!(props.p as any).reorderable ? undefined : nl => {
            let context = (props.p as any).rowClickable ? "clickableRows" : (props.p as any).withMaxHeight ? "manyRows" : "normalRows";

            if (context === 'clickableRows') setClickableRows(nl.map(z => z.items));
            else if (context === 'manyRows') setManyRow(nl.map(z => z.items));
            else if (context === 'normalRows') setNormalRows(nl.map(z => z.items));
        }}
    />

}

