// React
import React, { useState } from 'react';


// Typography
import TypographyTitleMedium from '../typography/typography_title_medium';

// Vieolo UI
import ItemRowSearch from './item_row_search';
import ItemRow from './item_row';

// Types
import { ColorOptionType } from '../private/types';


export type ListItem = {
    id: string,
    title: string,
    subTitle?: string,
    onClick?: () => void,
    selected: boolean,
    onButtonClick?: () => void,
    buttonColor?: ColorOptionType,
    buttonIcon?: React.ReactNode,
    buttonSize?: 'small' | 'medium',
    leadingIcon?: React.ReactNode,
}



export default function List(props: {
    items: ListItem[],
    enableSearch?: boolean,
    title: string,
    cardStyle?: "card-light-shadow" | "card-dark-shadow" | "card-no-shadow",
    height: string,
}) {

    let [query, setQuery] = useState<string>("");

    return <div className="vieolo-list" style={{ height: props.height }}>
        <div className="center-by-flex-row"><TypographyTitleMedium text={props.title} className="margin-vertical--10" /></div>

        {
            props.enableSearch &&
            <ItemRowSearch
                query={query}
                cardStyle={props.cardStyle || 'card-no-shadow'}
                onChange={q => setQuery(q)}
            />
        }

        {
            props.items.filter(a => !query.trim() || a.title.toLowerCase().includes(query.toLowerCase())).map(a => {
                return <ItemRow
                    key={a.id}
                    cardStyle={props.cardStyle || 'card-no-shadow'}
                    selected={a.selected}
                    title={a.title}
                    subTitle={a.subTitle}
                    onClick={a.onClick}
                    buttonClick={a.onButtonClick}
                    buttonColor={a.buttonColor}
                    buttonIcon={a.buttonIcon}
                    buttonSize={a.buttonSize}
                    leadingIcon={a.leadingIcon}
                />
            })
        }
    </div>
}