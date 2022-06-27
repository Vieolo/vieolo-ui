// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Restore';

// Component
import Button from '../../Button';

// Types
import { ColorOptionType } from '../../types/types';
import { ViewData } from '../main/main';

type ButtonPropsType = React.ComponentProps<typeof Button>;

export function buttonOptions(): ViewData {
    
    return {
        constants: {
            onClick: () => { },
            text: "Button"
        } as Partial<ButtonPropsType>,
        variables: {
            color: {
                options: ['accessory-blue', 'accessory-green', 'accessory-orange', 'alert', 'error', 'primary', 'secondary', 'success', 'tertiary'] as ColorOptionType[],
                default: 'primary'
            },
            emphasis: 'emphasis',
            height: {
                options: ['large', 'medium', 'small'],
                default: 'medium'
            },
            width: {
                options: ['content', 'full'],
                default: 'content'
            },
            borderRadius: {
                options: ['default', 'full', 'normal', 'half', 'none'],
                default: 'default'
            },
            icon: {
                options: ['None', 'Start', 'End'],
                default: 'None'
            },
            auxiliaryButton: {
                options: ['None', 'Plain', 'With DropDown'],
                default: 'None'
            },
            isLoading: 'boolean',
            isAuxiliaryLoading: 'boolean'
        }
    }
}


export function ButtonCreator(props: { p: ButtonPropsType }) {

    return <Button
        onClick={props.p.onClick}
        className={props.p.className}
        color={props.p.color}
        disabled={props.p.disabled}
        text={props.p.text}
        borderRadius={props.p.borderRadius as any}
        emphasis={props.p.emphasis as any}
        endIcon={(props.p as any).icon === 'End' ? <IconTwo /> : null}
        fontSize={props.p.fontSize}
        height={props.p.height as any}
        startIcon={(props.p as any).icon === "Start" ? <IconTwo /> : null}
        style={props.p.style}
        toLowerCase={props.p.toLowerCase}
        type={props.p.type}
        width={props.p.width as any}
        isLoading={props.p.isLoading}
        auxiliary={
            (props.p as any).auxiliaryButton === "None"
                ? null
                : (props.p as any).auxiliaryButton === "Plain"
                    ? {
                        icon: <IconOne />, onClick: () => { },
                        isLoading: (props.p as any).isAuxiliaryLoading
                    } : {
                        icon: <IconOne />, onClick: v => alert(v), dropDownMenuItems: [
                            { title: "One", value: "One" },
                            { title: "Two", value: "Two" },
                        ],
                        isLoading: (props.p as any).isAuxiliaryLoading
                    }
        }
    />

}

