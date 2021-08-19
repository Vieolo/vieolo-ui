// React
import React, { useEffect, useState } from 'react';

// Component
import Select from '../../lib/form/select';

type SelectPropsType = React.ComponentProps<typeof Select>;

export function selectOptions(): { [key: string]: SelectPropsType } {

    let selectItems: {
        title: string,
        value: string,
        category?: string
    }[] = [
        {title: "One", value: "1"}, 
        {title: "Two", value: "2"}, 
        {title: "Three", value: "3", category: "Third"},
        {title: "One Two Three Four Five", value: "4"},
    ];

    let baseProps: SelectPropsType = {
        error: false,
        items: selectItems,
        onSelect: () => { },
        selectedItems: [],
        title: "Users"
    }

    return {
        "Empty": {
            ...baseProps
        },
        "Selected": {
            ...baseProps,
            selectedItems: ["1"],            
        },
        "With Error": {
            ...baseProps,
            error: true,
            selectedItems: ["1"],
        },
        "Clearable": {
            ...baseProps,
            error: false,
            selectedItems: ["1"],
            clearable: true
        },
        "Searchable": {
            ...baseProps,
            error: false,
            selectedItems: ["1"],
            searchable: true
        },
        "Multiple Choice": {
            ...baseProps,
            error: false,
            selectedItems: ["1", "2"],
            multipleChoice: true
        },
        "Multiple + Searchable + Clearable": {
            ...baseProps,
            error: false,
            selectedItems: ["1", "2"],
            multipleChoice: true,
            clearable: true,
            searchable: true
        }
    }
}


export function SelectCreator(props: {p: SelectPropsType}) {
    let [selected, setSelected] = useState<string[]>(props.p.selectedItems || []);

    useEffect(() => {
        setSelected(props.p.selectedItems);
    }, [props.p.selectedItems])

    return <Select 
        error={props.p.error}
        items={props.p.items}
        onSelect={o => setSelected(o)}
        selectedItems={selected}
        title={props.p.title}
        clearable={props.p.clearable}
        searchable={props.p.searchable}
        multipleChoice={props.p.multipleChoice}
    />

}

