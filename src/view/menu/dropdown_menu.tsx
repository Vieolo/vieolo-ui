// React
import React, { useEffect, useState } from 'react';

// Material UI
import IconOne from '@material-ui/icons/Assignment';
import IconTwo from '@material-ui/icons/Backup';
import IconThree from '@material-ui/icons/Cake';
import IconFour from '@material-ui/icons/DataUsage';

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
    //let [selected, setSelected] = useState<string[]>(props.p.selectedItems || []);

    //useEffect(() => {
    //    setSelected(props.p.selectedItems);
    //}, [props.p.selectedItems])

    return <DropDownMenu
        buttonComponent={props.p.buttonComponent}
        items={props.p.items}
        onItemSelect={props.p.onItemSelect}
        className={props.p.className}
        disabled={props.p.disabled}
        position={props.p.position}
    />

}

