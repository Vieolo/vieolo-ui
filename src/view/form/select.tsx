// React
import React from 'react';

// Component
import Select from '../../lib/form/select';

type SelectPropsType = React.ComponentProps<typeof Select>;

export function selectOptions(): { [key: string]: SelectPropsType } {

    let baseProps: SelectPropsType = {
        error: false,
        items: [],
        onSelect: () => { },
        selectedItem: "",
        title: "Users"
    }

    return {
        "Empty": {
            ...baseProps
        },
        "Selected": {
            ...baseProps,
            selectedItem: "1",
            items: [{title: "Ramtin", value: "1"}]
        },
        "With Error": {
            ...baseProps,
            error: true,
            items: [{ title: "Ramtin", value: "1" }],            
            selectedItem: "1",
        },
    }
}


export function SelectCreator(props: {p: SelectPropsType}) {
    return <Select 
        error={props.p.error}
        items={props.p.items}
        onSelect={props.p.onSelect}
        selectedItem={props.p.selectedItem}
        title={props.p.title}
    />

}

