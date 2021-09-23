// React
import React from 'react';

// Material UI
import SampleIcon1 from '@material-ui/icons/FaceRounded';
import SampleIcon2 from '@material-ui/icons/FlipCameraAndroid';

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
            onButtonClick: () => alert(`Selected 3`),
            selected: false,
            title: "Three",
            buttonColor: 'primary',
            buttonIcon: <SampleIcon1 />,
            buttonSize: 'small',
        },
        {
            id: '4',
            onClick: () => alert(`Selected 4`),
            selected: false,
            title: "Four",
            leadingIcon: <SampleIcon2 />,
            subTitle: "This one has a subtitle"
        },
        {
            id: '5',
            onButtonClick: () => alert(`Selected 5`),
            selected: false,
            title: "Four",
            leadingIcon: <SampleIcon2 />,
            subTitle: "This one has a subtitle",
            buttonColor: 'error',
            buttonIcon: <SampleIcon1 />,
            buttonSize: 'medium',
        }
    ];

    let baseProps: ListPropsType = {
        height: '500px',
        items: items,
        title: "List with Items",        
        enableSearch: false
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

