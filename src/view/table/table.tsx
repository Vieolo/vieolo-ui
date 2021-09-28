// React
import React, { useState } from 'react';

// Component
import Table, { TableSortDirection } from '../../lib/table/table';
import IconButton from '../../lib/button/icon_button';

// Material UI
import SampleIcon from '@material-ui/icons/RefreshRounded';

type TablePropsType = React.ComponentProps<typeof Table>;

export function tableOptions(): { [key: string]: TablePropsType } {
    

    let baseProps: TablePropsType = {        
        columnGrid: '50px 90px 1fr 50px',
        disableSort: false,
        headers: ['id', 'Date', 'Description', ''],
        onSortChange: (s, d) => {},
        rows: [
            ["1", "2020-10-10", "Some Description", <IconButton size="small" onClick={() => {}} icon={<SampleIcon />} />]
        ],
        sortBy: 'id',
        sortDirection: 'ascending',
    }

    return {
        "Basic": {
            ...baseProps
        },
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
    />

}

