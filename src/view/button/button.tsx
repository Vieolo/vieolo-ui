// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

// Component
import Button from '../../lib/button/button';

type ButtonPropsType = React.ComponentProps<typeof Button>;

export function buttonOptions(): { [key: string]: ButtonPropsType } {

    let baseProps: ButtonPropsType = {        
        onClick: () => alert("Clicked"),
        color: 'primary',
        text: "Button"
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


export function ButtonCreator(props: {p: ButtonPropsType}) {

    return <Button
        onClick={props.p.onClick}
        className={props.p.className}
        color={props.p.color}
        disabled={props.p.disabled}
        size={props.p.size}
        text={props.p.text}
    />

}

