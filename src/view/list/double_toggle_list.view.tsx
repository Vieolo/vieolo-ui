// React
import React, { useState } from 'react';

// Material UI
// import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import DoubleToggleList, { DoubleToggleListItem } from '../../DoubleToggleList';

// Types
import { ViewData } from '../main/main';

type DoubleToggleListPropsType = React.ComponentProps<typeof DoubleToggleList>;

export function doubleToggleOptions(): ViewData {

    return {
        constants: {

        } as Partial<DoubleToggleListPropsType>,
        variables: {

        }
    }
}


export function DoubleToggleListCreator(props: { p: DoubleToggleListPropsType }) {

    let [items, setItems] = useState<DoubleToggleListItem[]>([
        { id: '1', on: true, title: "One" },
        { id: '2', on: true, title: "Two", disabled: true },
        { id: '3', on: false, title: "Three" },
        { id: '4', on: false, title: "Four" },
    ]);

    return <DoubleToggleList
        items={items}
        description='By clicking on the items, they move from one side to the other. Magical!'
        title='Double Toggle List'
        onItemToggle={(id, newValue) => {
            setItems(items.map(z => {
                if (z.id === id) z.on = newValue
                return z
            }))
        }}
    />
}