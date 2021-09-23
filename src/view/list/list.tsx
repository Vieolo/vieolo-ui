// React
import React, { useEffect, useState } from 'react';

// Component
import List, { ListItem } from '../../lib/list/list';

type ListPropsType = React.ComponentProps<typeof List>;

export function listOptions(): { [key: string]: ListPropsType } {

    let items: ListItem[] = [
        {
            id: '1',
            onClick: () => alert(`Selected 1`),
            selected: false,
            title: "One",            
        },
        {
            id: '2',
            onClick: () => alert(`Selected 2`),
            selected: true,
            title: "Two",
            subTitle: "This one has a subtitle"            
        },
        {
            id: '3',
            onClick: () => alert(`Selected 3`),
            selected: false,
            title: "Three",            
        }
    ];

    let baseProps: ListPropsType = {
        height: '500px',
        items: items,
        title: "List with Items",        
    }

    return {
        "basic": {
            ...baseProps
        },
        "With Search": {
            ...baseProps,
            enableSearch: true
        },
        "Card Style -- light shadow": {
            ...baseProps,
            enableSearch: true,
            cardStyle: "card-light-shadow"
        },
        "Card Style -- dark shadow": {
            ...baseProps,
            enableSearch: true,
            cardStyle: "card-dark-shadow"
        }
    }
}


export function ListCreator(props: {p: ListPropsType}) {

    return <List
        height={props.p.height}
        items={props.p.items}
        title={props.p.title}
        cardStyle={props.p.cardStyle}
        enableSearch={props.p.enableSearch}
    />

}

