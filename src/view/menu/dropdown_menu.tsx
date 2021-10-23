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

type DropDownMenuPropsType = React.ComponentProps<typeof DropDownMenu>;

export function dropDownMenuOptions(): { [key: string]: DropDownMenuPropsType } {

    let itemsWithoutIcon: {title: string, icon?: React.ReactNode}[] = [
        {title: "One"},
        {title: "Two"}, 
        {title: "Three"},
        {title: "One Two Three Four Five"}
    ];

    let itemsWithIcon: {title: string, icon?: React.ReactNode}[] = [
        {title: "One", icon: <IconOne />},
        {title: "Two", icon: <IconTwo />}, 
        {title: "Three", icon: <IconThree />},
        {title: "One Two Three Four Five", icon: <IconFour />}
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

