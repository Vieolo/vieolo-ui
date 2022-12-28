
// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import TabRow from './tab_row';

// Types
import { ViewData } from '../view/main/main';

type TabRowPropsType = React.ComponentProps<typeof TabRow>;

export function tabRowOptions(): ViewData {

    return {
        constants: {

        } as Partial<TabRowPropsType>,
        variables: {
            isLoading: 'boolean'
        }
    }
}


export function TabRowCreator(props: { p: TabRowPropsType }) {

    let [selected, setSelected] = useState<string>("One")

    return <div className='height--pc-100' style={{backgroundColor: '#f2f2f2'}}>
        <TabRow
            onItemSelect={v => setSelected(v)}
            selectedItem={selected}
            isLoading={props.p.isLoading}
            items={[
                { text: "One", value: "One", startIcon: <IconOne /> },
                { text: "Two", value: "Two", startIcon: <IconTwo />, endIcon: <IconThree /> },
                { text: "Three", value: "Three", endIcon: <IconFour /> },
                { text: "Four", value: "Four" },
                { text: "Five", value: "Five" },
                { text: "Six", value: "Six" },
                { text: "Seven", value: "Seven" },
                { text: "Eight", value: "Eight" },
                { text: "Nine", value: "Nine" },
                { text: "Ten", value: "Ten" },
            ]}
        />
    </div>
}
