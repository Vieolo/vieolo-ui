// React
import React, { useState } from 'react';


// Typography
import TypographyTitleMedium from '../typography/typography_title_medium';

// Vieolo UI
import ItemRow, { ItemStyleType } from './item_row';

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
    disabled?: boolean,
}



export default function List(props: {
    items: ListItem[],
    enableSearch?: boolean,
    enableSubtitleSearch?: boolean,
    title: string,
    itemStyle?: ItemStyleType
    height: string,
    horizontalPadding?: 'none' | 'half' | 'one'
}) {

    let [query, setQuery] = useState<string>("");

    return <div className={`vieolo-list padding-horizontal--${props.horizontalPadding || 'none'}`} style={{ height: props.height }}>
        <div className="center-by-flex-row"><TypographyTitleMedium text={props.title} className="margin-vertical--10" /></div>

        {
            props.enableSearch &&
            <ItemRow 
                itemStyle={props.itemStyle}
                searchRow={{
                    query: query,
                    onQueryChange: (c) => setQuery(c)
                }}
            />
        }

        {
            props.items.filter(a => {
                if (!query.trim()) return true;
                if (a.title.toLowerCase().includes(query.toLowerCase())) return true;
                if (a.subTitle && props.enableSubtitleSearch && a.subTitle.toLowerCase().includes(query.toLowerCase())) return true;
                return false;
            }).map(a => {
                return <ItemRow
                    key={a.id}
                    selected={a.selected}
                    title={a.title}
                    subTitle={a.subTitle}
                    onClick={a.onClick}
                    buttonClick={a.onButtonClick}
                    buttonColor={a.buttonColor}
                    buttonIcon={a.buttonIcon}
                    buttonSize={a.buttonSize}
                    leadingIcon={a.leadingIcon}
                    disabled={a.disabled}
                    itemStyle={props.itemStyle}
                />
            })
        }
    </div>
}