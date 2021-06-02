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
    }[] = [{title: "One", value: "1"}, {title: "Two", value: "2"}];

    let baseProps: SelectPropsType = {
        error: false,
        items: selectItems,
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
        },
        "With Error": {
            ...baseProps,
            error: true,
            selectedItem: "1",
        },
    }
}


export function SelectCreator(props: {p: SelectPropsType}) {
    let [selected, setSelected] = useState<string>(props.p.selectedItem || "");

    useEffect(() => {
        setSelected(props.p.selectedItem);
    }, [props.p.selectedItem])

    return <Select 
        error={props.p.error}
        items={props.p.items}
        onSelect={o => setSelected(o)}
        selectedItem={selected}
        title={props.p.title}
    />

}

