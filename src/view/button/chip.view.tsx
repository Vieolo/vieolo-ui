// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/CheckBox';

// Component
import Chip from '../../Chip';
import DropDownMenu from '../../DropDownMenu';

// Types
import { ViewData } from '../main/main';
import IconButton from '../../IconButton';

type ChipPropsType = React.ComponentProps<typeof Chip>;

export function chipOptions(): ViewData {

    return {
        constants: {

        } as Partial<ChipPropsType>,
        variables: {
            color: 'colors',
            emphasis: {
                default: 'low',
                options: ["low", "medium"]
            },
            size: {
                default: 'medium',
                options: ["small", "medium"]
            },
            borderRadius: 'borderRadius',
            disabled: 'boolean',
            selectable: 'booleanTrueDefault',
            selected: 'boolean',
            withIcon: 'boolean',
            withButton: 'boolean',
            withDropDown: 'boolean'
        }
    }
}


export function ChipCreator(props: {p: ChipPropsType}) {

    return <Chip
        label='Assignment'
        disabled={props.p.disabled}
        selected={props.p.selected}
        icon={(props.p as any).withIcon ? <IconThree /> : undefined}
        buttonIcon={(props.p as any).withButton ? <IconTwo /> : undefined}
        onButtonClick={(props.p as any).withButton ? () => {} : undefined}     
        color={props.p.color}   
        onChipSelect={(props.p as any).selectable ? () => {} : undefined}
        emphasis={props.p.emphasis}
        borderRadius={props.p.borderRadius}
        size={props.p.size}
        buttonComponent={
            !(props.p as any).withDropDown
                ? undefined
                : <DropDownMenu 
                    buttonComponent={<IconButton icon={<IconOne />} onClick={() => {}} size="extra-small" borderRadius='full' />}
                    items={[
                        {title: "One", value: "One"},
                        {title: "Two", value: "Two"},
                    ]}
                    onItemSelect={i => {}}
                />
        }
    />
}