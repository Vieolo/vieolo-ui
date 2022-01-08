// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';

// Component
import IconButton from '../../lib/button/icon_button';

// Types
import { ColorOptionType } from '../../lib/private/types';
import { ViewData } from '../main/main';

type IconButtonPropsType = React.ComponentProps<typeof IconButton>;

export function iconButtonOptions(): ViewData {

    return {
        constants: {
            onClick: () => alert("Clicked"),
        } as Partial<IconButtonPropsType>,
        variables: {
            color: {
                options: ['primary', 'secondary', 'tertiary', 'error', 'success', 'alert', 'accessory-blue', 'accessory-green', 'accessory-orange'] as ColorOptionType[],
                default: 'primary'
            },
            emphasis: {
                options: ['high', 'medium', 'low', 'none'],
                default: 'none'
            },
            size: {
                options: ['medium', 'small', 'extra-small'],
                default: 'medium'
            },
            borderRadius: {
                options: ['default', 'full', 'normal', 'half', 'none'],
                default: 'default'
            }
        }
    }
}


export function IconButtonCreator(props: { p: IconButtonPropsType }) {    

    return <IconButton
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
    />

}

