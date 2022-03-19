// React
import React, { ReactNode, useState } from 'react';


// Typography
import TypographyTitleMedium from '../typography/typography_title_medium';

// Vieolo UI
import ItemRow from './item_row';

// Types
import { ColorOptionType, RowStyleType } from '../private/types';
import ExpandableCard from '../card/expandable_card';


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
    group?: string
}



export default function List(props: {
    itemStyle?: RowStyleType,
    collapsedGroupStyle?: RowStyleType,
    expandedGroupStyle?: RowStyleType,
    items: ListItem[],
    enableSearch?: boolean,
    enableSubtitleSearch?: boolean,
    title?: string,
    height: string,
    horizontalPadding?: 'none' | 'half' | 'one'
}) {

    let [query, setQuery] = useState<string>("");


    let sortedItems = props.items.filter(a => {
        if (!query.trim()) return true;
        if (a.title.toLowerCase().includes(query.toLowerCase())) return true;
        if (a.subTitle && props.enableSubtitleSearch && a.subTitle.toLowerCase().includes(query.toLowerCase())) return true;
        return false;
    }).sort((a, b) => {
        if (!a.group && !b.group) return 1;
        if (a.group === b.group) return 1;
        return (a.group || 'zzzzzzzz') > (b.group || 'zzzzzzzz') ? 1 : -1
    })    

    let grouped: {
        [group: string]: {
            items: ReactNode[],
            group: string
        }
    } = {};
    let ungrouped: ReactNode[] = [];

    for (let i = 0; i < sortedItems.length; i++) {
        const a = sortedItems[i];

        let row = <ItemRow
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

        if (a.group) {
            if (!grouped[a.group]) grouped[a.group] = { group: a.group, items: [] }
            grouped[a.group].items.push(row)
        } else {
            ungrouped.push(row)
        }
    }



    return <div className={`vieolo-list padding-horizontal--${props.horizontalPadding || 'none'}`} style={{ height: props.height }}>
        {
            props.title &&
            <div className="center-by-flex-row"><TypographyTitleMedium text={props.title} className="margin-vertical--10" /></div>
        }

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
            Object.values(grouped).map(g => {
                return <div className="margin-vertical--half" key={g.group}>
                    <ExpandableCard                        
                        title={g.group}
                        initialState='collapsed'
                        collapsedCardStyle={props.collapsedGroupStyle}
                        expandedCardStyle={props.expandedGroupStyle || props.collapsedGroupStyle}
                    >
                        {g.items}
                    </ExpandableCard>
                </div>
            })
        }

        {ungrouped}
    </div>
}