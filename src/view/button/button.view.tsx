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
import Card from '../../Card';

type ButtonPropsType = React.ComponentProps<typeof Button>;

export function buttonOptions(): ViewData {
    
    return {
        constants: {
            onClick: () => { alert("clicked") },
            text: "Button"
        } as Partial<ButtonPropsType>,
        variables: {
            color: {
                options: ['accessory-blue', 'accessory-green', 'accessory-orange', 'alert', 'error', 'neutral', 'primary', 'secondary', 'success', 'tertiary'] as ColorOptionType[],
                default: 'primary'
            },
            emphasis: 'emphasis',
            height: {
                options: ['large', 'medium', 'small', 'extra-small'],
                default: 'medium'
            },
            width: {
                options: ['content', 'full'],
                default: 'content'
            },
            borderRadius: 'borderRadius',
            icon: {
                options: ['None', 'Start', 'End'],
                default: 'None'
            },
            auxiliaryButton: {
                options: ['None', 'Plain', 'With DropDown'],
                default: 'None'
            },
            isTransparent: 'boolean',
            isLoading: 'boolean',
            isAuxiliaryLoading: 'boolean',
            disabled: 'boolean'
        }
    }
}


export function ButtonCreator(props: { p: ButtonPropsType }) {

    let b = <Button
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
        isTransparent={props.p.isTransparent}
        auxiliary={
            (props.p as any).auxiliaryButton === "None"
                ? undefined
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
        md={{
            height: 'large'
        }}
    />

    if (props.p.isTransparent) {
        return <Card emphasis='high' color={props.p.color === 'primary' ? 'tertiary' : 'primary'}>
            {b}
        </Card>
    }

    return b

}

