// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import DropDownMenu, { DropDownMenuItemType } from '../../lib/menu/dropdown_menu';
import Button from '../../lib/button/button';

type DropDownMenuPropsType = React.ComponentProps<typeof DropDownMenu>;

export function dropDownMenuOptions(): { [key: string]: DropDownMenuPropsType } {

    let itemsWithoutIcon: DropDownMenuItemType[] = [
        {title: "One", value: "One"},
        {title: "Two", value: "Two"}, 
        {title: "Three", value: "Three"},
        {title: "One Two Three Four Five", value: "Four"}
    ];

    let itemsWithIcon: DropDownMenuItemType[] = [
        {title: "One", icon: <IconOne />, value: "One"},
        {title: "Two", icon: <IconTwo />, value: "Two"}, 
        {title: "Three", icon: <IconThree />, value: "Three"},
        {title: "One Two Three Four Five", icon: <IconFour />, value: "Four"}
    ];

    let baseProps: DropDownMenuPropsType = {        
        items: itemsWithoutIcon,
        buttonComponent: <Button color={"primary"} text="Menu" />,
        onItemSelect: () => {},
        position: 'right'
    }

    return {
        "Without Icon": {
            ...baseProps
        },
        "With Icon": {
            ...baseProps,
            items: itemsWithIcon
        },
        "Disabled": {
            ...baseProps,
            disabled: true
        },
    }
}


export function DropDownMenuCreator(props: {p: DropDownMenuPropsType}) {

    return <DropDownMenu
        buttonComponent={props.p.buttonComponent}
        items={props.p.items}
        onItemSelect={props.p.onItemSelect}
        className={props.p.className}
        disabled={props.p.disabled}
        position={props.p.position}
    />

}

