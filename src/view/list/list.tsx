// React
import React from 'react';

// Material UI
import SampleIcon1 from '@mui/icons-material/FaceRounded';
import SampleIcon2 from '@mui/icons-material/FlipCameraAndroid';

// Component
import List, { ListItem } from '../../lib/list/list';

// Types
import { ViewData } from '../main/main';

type ListPropsType = React.ComponentProps<typeof List>;

export function listOptions(): ViewData {

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
        },
        {
            id: '6',
            onButtonClick: () => alert(`Selected 6`),
            selected: false,
            title: "Disabled",
            leadingIcon: <SampleIcon2 />,
            subTitle: "This one is disabled",
            buttonColor: 'error',
            buttonIcon: <SampleIcon1 />,
            buttonSize: 'medium',
            disabled: true
        }
    ];

    return {
        constants: {
            height: '500px',
            title: "List with Items", 
            items: items
        } as Partial<ListPropsType>,
        variables: {
            enableSearch: {
                options: [false, true],
                default: false
            },
            cardStyle: {
                options: ["card-no-shadow", 'card-light-shadow', "card-dark-shadow"],
                default: 'card-no-shadow'
            }
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

