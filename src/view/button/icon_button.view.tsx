// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';

// Component
import IconButton from '../../IconButton';

// Types
import { ViewData } from '../main/main';
import Card from '../../Card';

type IconButtonPropsType = React.ComponentProps<typeof IconButton>;

export function iconButtonOptions(): ViewData {

    return {
        constants: {
            onClick: () => alert("Clicked"),
        } as Partial<IconButtonPropsType>,
        variables: {
            color: 'colors',
            emphasis: 'emphasis',
            size: {
                options: ['large', 'medium', 'small', 'extra-small'],
                default: 'medium'
            },
            borderRadius: 'borderRadius',
            isTransparent: 'boolean',
            isLoading: 'boolean',
            borderWidth: {
                default: '2',
                options: ['2', '1', '0'],
                type: 'number'
            }
        }
    }
}


export function IconButtonCreator(props: { p: IconButtonPropsType }) {    

    let b = <IconButton
        icon={<IconOne />}
        onClick={props.p.onClick}
        className={props.p.className}
        color={props.p.color}
        disabled={props.p.disabled}
        size={props.p.size}
        borderRadius={props.p.borderRadius}
        emphasis={props.p.emphasis}
        tooltip={props.p.tooltip}
        tooltipPosition={props.p.tooltipPosition}
        borderWidth={props.p.borderWidth}
        isLoading={props.p.isLoading}
        isTransparent={props.p.isTransparent}
    />

    if (props.p.isTransparent) {
        return <Card emphasis='high' color={props.p.color === 'primary' ? 'tertiary' : 'primary'}>
            {b}
        </Card>
    }

    return b
}

