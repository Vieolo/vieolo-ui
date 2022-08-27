// React
import React from 'react';

// Vieolo UI
import Typography from '../Typography';
import Chip from '../Chip';
import Spacer from '../Spacer';

// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';
import DoneIcon from '@mui/icons-material/DoneRounded';


export type DoubleToggleListItem = {
    title: string,
    id: string,
    on: boolean,
    disabled?: boolean
}


export default function DoubleToggleList(props: {
    title: string,
    description: string,
    items: DoubleToggleListItem[],
    onItemToggle: (id: string, newValue: boolean) => void,
    chipSize?: 'small' | 'medium'
}) {

    let onList: DoubleToggleListItem[] = [];
    let offList: DoubleToggleListItem[] = [];

    for (let i = 0; i < props.items.length; i++) {
        const e = props.items[i];
        if (e.on) onList.push(e);
        else offList.push(e);
    }

    return <div className="vieolo-double-toggle-list" >

        <div className="vieolo-double-toggle-list__text-container" >

            <Typography type='paragraph-large' text={props.title} fontWeight='bold' />
            <Spacer height='half' />
            <Typography type='paragraph-medium' text={props.description} />

        </div>

        <div className="vieolo-double-toggle-list__list-container" >
            <SingleList
                list={onList}
                on={true}
                onItemToggle={props.onItemToggle}
                chipSize={props.chipSize}
            />

            <SingleList
                list={offList}
                on={false}
                onItemToggle={props.onItemToggle}
                chipSize={props.chipSize}
            />
        </div>

    </div>
}



function SingleList(props: { 
    on: boolean, 
    list: DoubleToggleListItem[], 
    onItemToggle: (id: string, on: boolean) => void,
    chipSize?: 'small' | 'medium'
}) {
    return <div className={`vieolo-double-toggle-list__list vieolo-double-toggle-list__list--${props.on ? "on" : "off"}`}>

        {
            props.list.map(i => {
                return <Chip
                    key={i.id}
                    label={i.title}
                    id={i.id}
                    color={props.on ? 'success' : 'error'}
                    emphasis='medium'
                    size={props.chipSize}
                    icon={props.on ? <DoneIcon /> : <CloseIcon />}
                    onChipSelect={() => props.onItemToggle(i.id, !props.on)
                    }
                    disabled={i.disabled}
                />
            })
        }

    </div>
}