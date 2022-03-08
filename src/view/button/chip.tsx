// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Component
import Chip from '../../lib/button/chip';
import DropDownMenu from '../../lib/menu/dropdown_menu';

// Types
import { ViewData } from '../main/main';
import IconButton from '../../lib/button/icon_button';

type ChipPropsType = React.ComponentProps<typeof Chip>;

export function chipOptions(): ViewData {

    return {
        constants: {

        } as Partial<ChipPropsType>,
        variables: {
            disabled: 'boolean',
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