// React
import React, { useEffect, useState } from 'react';

// Component
import Select, { SelectItemType } from '../../Select';

// Material UI
import SampleIcon1 from '@mui/icons-material/AccessibleForwardTwoTone';
import SampleIcon2 from '@mui/icons-material/Backspace';
import SampleIcon3 from '@mui/icons-material/Cached';

// Types
import { ViewData } from '../main/main';

type SelectPropsType = React.ComponentProps<typeof Select>;

export function selectOptions(): ViewData {


    return {
        constants: {
            title: "Item",
            selectedItems: [],
        } as Partial<SelectPropsType>,
        variables: {
            height: {
                options: ["small", "medium"],
                default: "medium"
            },
            width: {
                options: ["small", "medium", "full"],
                default: "medium"
            },
            error: 'boolean',
            clearable: 'boolean',
            searchable: 'boolean',
            multipleChoice: 'boolean',
            disabled: 'boolean',
            removeTitle: 'boolean',
            withIcon: 'boolean'
        }
    }
}


export function SelectCreator(props: {p: SelectPropsType}) {
    let [selected, setSelected] = useState<string[]>(props.p.selectedItems || []);

    let items: SelectItemType[] = [
        {title: "One", value: "1",subTitle: "Some long ass subtitle", icon: (props.p as any).withIcon ? <SampleIcon1 /> : undefined}, 
        {title: "Two", value: "2", icon: (props.p as any).withIcon ? <SampleIcon2 /> : undefined}, 
        {title: "Three", value: "3", category: "Third", icon: (props.p as any).withIcon ? <SampleIcon3 /> : undefined},
        {title: "One Two Three Four Five", value: "4", category: "Third"},
        {title: "Six", value: "6", category: "Third"},
        {title: "Seven", value: "7", category: "Third"} ,
        {title: "Eight", value: "8", category: "Third"},
        {title: "Nine", value: "9", category: "Third"} ,
        {title: "Ten", value: "10", category: "Third"},
        {title: "Eleven", value: "11", category: "Third"} ,
        {title: "Twelve", value: "12", category: "Third", subTitle: "The Substitle"},
        {title: "Thirteen", value: "13", category: "Third"} 
    ]

    useEffect(() => {
        setSelected(props.p.selectedItems);
    }, [props.p.selectedItems])

    return <Select 
        error={props.p.error}
        items={items}
        onSelect={o => setSelected(o)}
        selectedItems={selected}
        title={(props.p as any).removeTitle ? undefined : props.p.title}
        placeHolder={(props.p as any).removeTitle ? "Select" : ""}
        clearable={props.p.clearable}
        searchable={props.p.searchable}
        multipleChoice={props.p.multipleChoice}
        height={props.p.height}
        width={props.p.width}
        disabled={props.p.disabled}
    />

}

