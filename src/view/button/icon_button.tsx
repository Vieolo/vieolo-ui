// React
import React from 'react';

// Material UI
import IconOne from '@material-ui/icons/Assignment';
// import IconTwo from '@material-ui/icons/Backup';
// import IconThree from '@material-ui/icons/Cake';
// import IconFour from '@material-ui/icons/DataUsage';

// Component
import IconButton from '../../lib/button/icon_button';

type IconButtonPropsType = React.ComponentProps<typeof IconButton>;

export function iconButtonOptions(): { [key: string]: IconButtonPropsType } {

    let baseProps: IconButtonPropsType = {        
        icon: <IconOne />,
        onClick: () => alert("Clicked"),
        color: 'primary',
        size: 'medium',        
    }

    return {
        "Base": {
            ...baseProps
        },
        "Color -- Primary": {
            ...baseProps,
            color: 'primary'
        },
        "Color -- Secondary": {
            ...baseProps,
            color: 'secondary'
        },
        "Color -- Tertiary": {
            ...baseProps,
            color: 'tertiary'
        },
        "Color -- Alert": {
            ...baseProps,
            color: 'alert'
        },
        "Color -- Error": {
            ...baseProps,
            color: 'error'
        },
        "Color -- Success": {
            ...baseProps,
            color: 'success'
        },
        "Color -- Accessory Blue": {
            ...baseProps,
            color: 'accessory-blue'
        },
        "Color -- Accessory Green": {
            ...baseProps,
            color: 'accessory-green'
        },
        "Color -- Accessory Orange": {
            ...baseProps,
            color: 'accessory-orange'
        },
        
    }
}


export function IconButtonCreator(props: {p: IconButtonPropsType}) {

    return <IconButton
        icon={props.p.icon}
        onClick={props.p.onClick}
        className={props.p.className}
        color={props.p.color}
        disabled={props.p.disabled}
        size={props.p.size}
        tooltip={props.p.tooltip}
        tooltipPosition={props.p.tooltipPosition}
    />

}

