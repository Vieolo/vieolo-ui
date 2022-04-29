// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import DropDownMenu from '../../lib/menu/dropdown_menu';
import Button from '../../lib/button/button';

// Types
import { ViewData } from '../main/main';

type DropDownMenuPropsType = React.ComponentProps<typeof DropDownMenu>;

export function dropDownMenuOptions(): ViewData {

    return {
        constants: {
            items: [
                {title: "One", icon: <IconOne />, value: "One"},
                {title: "Two", icon: <IconTwo />, value: "Two", color: 'secondary'}, 
                {title: "Three", icon: <IconThree />, value: "Three", color: 'success'},
                {title: "One Two Three Four Five", icon: <IconFour />, value: "Four", color: 'error'}
            ]
        } as Partial<DropDownMenuPropsType>,
        variables: {
            icon: {
                options: ['with', 'without'],
                default: 'without'
            },
            disabled: {
                options: [false, true],
                default: false
            },
        }
    }
}


export function DropDownMenuCreator(props: {p: DropDownMenuPropsType}) {

    return <DropDownMenu
        buttonComponent={<Button color={"primary"} text="Menu" />}        
        items={(props.p as any).icon === 'without' ? props.p.items.map(i => {
            return {...i, icon: null}
        }) :  props.p.items}
        onItemSelect={() => {}}
        disabled={props.p.disabled}
        position={props.p.position}
    />

}

