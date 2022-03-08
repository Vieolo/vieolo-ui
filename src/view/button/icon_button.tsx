// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';

// Component
import IconButton from '../../lib/button/icon_button';

// Types
import { ViewData } from '../main/main';

type IconButtonPropsType = React.ComponentProps<typeof IconButton>;

export function iconButtonOptions(): ViewData {

    return {
        constants: {
            onClick: () => alert("Clicked"),
        } as Partial<IconButtonPropsType>,
        variables: {
            color: 'colors',
            emphasis: {
                options: ['high', 'medium', 'low', 'none'],
                default: 'none'
            },
            size: {
                options: ['medium', 'small', 'extra-small'],
                default: 'medium'
            },
            borderRadius: 'borderRadius',
            borderWidth: {
                default: '2',
                options: ['2', '1', '0'],
                type: 'number'
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
        borderWidth={props.p.borderWidth}
    />

}

