// React
import React, { useState } from 'react';

// Component
import Table, { TableSortDirection } from '../../lib/table/table';
import IconButton from '../../lib/button/icon_button';

// Material UI
import SampleIcon from '@mui/icons-material/RefreshRounded';

type TablePropsType = React.ComponentProps<typeof Table>;

export function tableOptions(): { [key: string]: TablePropsType } {
    

    let baseProps: TablePropsType = {        
        columnGrid: '50px 90px 1fr 50px',
        disableSort: false,
        headers: ['id', 'Date', 'Description', ''],
        onSortChange: (s, d) => {},
        rows: [
            ["1", "2020-10-10", "Some Description", <IconButton size="small" onClick={() => {}} icon={<SampleIcon />} />],
            ["2", "2020-10-11", "Some Description", <IconButton size="small" onClick={() => {}} icon={<SampleIcon />} />]
        ],
        sortBy: 'id',
        sortDirection: 'ascending',
    }

    return {
        "Basic": {
            ...baseProps
        },
        "Without Sorting": {
            ...baseProps,
            disableSort: true
        },
        "Row Clickable": {
            ...baseProps,
            rows: [
                ["1", "2020-10-10", "Some Description", 'Done'],
                ["2", "2020-10-11", "Hello World!", 'N/A']
            ],
            onRowClick: i => alert(`Index ${i} is selected`)
        },
        "Without header": {
            ...baseProps,
            removeHeaderRow: true,
            rows: [
                ["1", "2020-10-10", "Some Description", 'Done'],
                ["2", "2020-10-11", "Hello World!", 'N/A']
            ],
            onRowClick: i => alert(`Index ${i} is selected`)
        },
        "With Sticky Header": {
            ...baseProps,   
            stickyHeader: true,
            maxHeight: '300px',         
            rows: [
                ...Array(40).fill("").map((z, i) => {
                    return [i, "2020-10-10", "Some Description", 'Done']
                })
            ],
        }
    }
}


export function TableCreator(props: {p: TablePropsType}) {

    let [sort, setSort] = useState<string>("id");
    let [direction, setDirection] = useState<TableSortDirection>('ascending');

    return <Table
        columnGrid={props.p.columnGrid}
        disableSort={props.p.disableSort}
        headers={props.p.headers}
        onSortChange={(s, d) => {
            setSort(s);
            setDirection(d);
        }}
        rows={props.p.rows}
        sortBy={sort}
        sortDirection={direction}
        width={props.p.width}
        onRowClick={props.p.onRowClick}
        removeHeaderRow={props.p.removeHeaderRow}
        stickyHeader={props.p.stickyHeader}
        maxHeight={props.p.maxHeight}
    />

}

