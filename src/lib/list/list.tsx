// React
import React, { ReactNode, useState } from 'react';

// Vieolo UI
import ItemRow from './item_row';
import Typography from '../typography/typography';

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
    ariaLabel?: string,
    /** 
     * The group that the item belongs to
     * If the item does not belong to a group, it will appear after all of the groups
     */
    group?: string;
};



export default function List(props: {
    /**
     * The style of the items
     * This styles applied both to grouped and ungrouped items
     */
    itemStyle?: RowStyleType,
    /** The style of the group expandable cards when collapsed */
    collapsedGroupStyle?: RowStyleType,
    /** 
     * The style of the group expandable cards when expanded
     * If undefined, the `collapsedGroupStyle` is used
     */
    expandedGroupStyle?: RowStyleType,
    items: ListItem[],
    enableSearch?: boolean,
    disableSorting?: boolean,
    enableSubtitleSearch?: boolean,
    title?: string,
    height: string,
    horizontalPadding?: 'none' | 'half' | 'one',
    ariaLabel?: string,
    onlyAllowOneGroupToExpand?: boolean;
}) {

    let [query, setQuery] = useState<string>("");
    let [openedGroup, setOpenedGroup] = useState<string>("");


    let sortedItems = props.items.filter(a => {
        if (!query.trim()) return true;
        if (a.title.toLowerCase().includes(query.toLowerCase())) return true;
        if (a.subTitle && props.enableSubtitleSearch && a.subTitle.toLowerCase().includes(query.toLowerCase())) return true;
        return false;
    });

    if (!props.disableSorting) {
        sortedItems.sort((a, b) => {
            if (!a.group && !b.group) return a.title > b.title ? 1 : -1;
            if (a.group === b.group) return a.title > b.title ? 1 : -1;
            return (a.group || 'zzzzzzzzzzzzz') > (b.group || 'zzzzzzzzzzzzzzz') ? 1 : -1;
        });
    }

    let grouped: {
        [group: string]: {
            items: ReactNode[],
            group: string;
        };
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
            ariaLabel={a.ariaLabel}
        />;

        if (a.group) {
            if (!grouped[a.group]) grouped[a.group] = { group: a.group, items: [] };
            grouped[a.group].items.push(row);
        } else {
            ungrouped.push(row);
        }
    }



    return <div
        className={`vieolo-list padding-horizontal--${props.horizontalPadding || 'none'}`}
        style={{ height: props.height }}
        aria-label={props.ariaLabel || props.title}
    >
        {
            props.title &&
            <div className="center-by-flex-row"><Typography type='title-medium' text={props.title} className="margin-vertical--10" /></div>
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
                        ariaLabel={g.group}
                        collapsedCardStyle={props.collapsedGroupStyle}
                        expandedCardStyle={props.expandedGroupStyle || props.collapsedGroupStyle}
                        state={props.onlyAllowOneGroupToExpand ? openedGroup === g.group ? "expanded" : "collapsed" : undefined}
                        onStateChange={v => {
                            if (v === "expanded") setOpenedGroup(g.group);
                            else {
                                if (openedGroup === g.group) setOpenedGroup('');
                            }
                        }}
                    >
                        {g.items}
                    </ExpandableCard>
                </div>;
            })
        }

        {ungrouped}
    </div>;
}