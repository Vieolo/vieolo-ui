// React
import React, { ReactNode, useState } from 'react';

// Vieolo UI
import ItemRow from '../ItemRow';
import Typography from '../Typography';
import Flex from '../Flex';

// Types
import { BorderRadiusValueType, ColorOptionType, RowStyleType } from '../types/types';
import ExpandableCard from '../ExpandableCard/expandable_card';
import Divider from '../Divider';
import { GridGapType } from '../types';
import { getManagedBorderRadius } from '../utility/style_utility';


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
    group?: string
}



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
    enableSorting?: boolean,
    enableSubtitleSearch?: boolean,
    title?: string,
    height: string,
    horizontalPadding?: 'none' | 'half' | 'one',
    ariaLabel?: string,
    onlyAllowOneGroupToExpand?: boolean,
    headerActions?: React.ReactNode,
    controlItemBorderRadius?: boolean,
    rowGap?: GridGapType
}) {

    function changeItemRowBorderRadius(items: ListItem[]) {
        let elements: React.ReactNode[] = []
        for (let i = 0; i < items.length; i++) {
            const a = items[i];

            let ts = props.itemStyle ? { ...props.itemStyle } : { borderRadius: 'default' as BorderRadiusValueType };

            if (props.controlItemBorderRadius && items.length > 1) {
                ts.borderRadius = getManagedBorderRadius(i, items.length, typeof ts.borderRadius === 'string' ? ts.borderRadius as BorderRadiusValueType : 'default')
            }

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
                itemStyle={ts}
                ariaLabel={a.ariaLabel}
            />

            elements.push(row)
        }

        return elements
    }

    let [query, setQuery] = useState<string>("");
    let [openedGroup, setOpenedGroup] = useState<string>("");


    let sortedItems = props.items.filter(a => {
        if (!query.trim()) return true;
        if (a.title.toLowerCase().includes(query.toLowerCase())) return true;
        if (a.subTitle && props.enableSubtitleSearch && a.subTitle.toLowerCase().includes(query.toLowerCase())) return true;
        return false;
    })

    if (props.enableSorting) {
        sortedItems.sort((a, b) => {
            if (!a.group && !b.group) return a.title > b.title ? 1 : -1;
            if (a.group === b.group) return a.title > b.title ? 1 : -1;
            return (a.group || 'zzzzzzzzzzzzz') > (b.group || 'zzzzzzzzzzzzzzz') ? 1 : -1
        })
    }

    let grouped: {
        [group: string]: {
            items: ReactNode[],
            data: ListItem[]
            group: string
        }
    } = {};
    let ungroupedData: ListItem[] = [];
    let ungrouped: ReactNode[] = [];

    for (let i = 0; i < sortedItems.length; i++) {
        const a = sortedItems[i];

        if (a.group) {
            if (!grouped[a.group]) grouped[a.group] = { group: a.group, items: [], data: [] }
            grouped[a.group].data.push(a)
        } else {
            ungroupedData.push(a)
        }
    }

    for (let i = 0; i < Object.keys(grouped).length; i++) {
        const g = grouped[Object.keys(grouped)[i]];
        g.items = changeItemRowBorderRadius(g.data)
    }

    ungrouped = changeItemRowBorderRadius(ungroupedData)

    return <div
        className={`vieolo-list padding-horizontal--${props.horizontalPadding || 'none'}`}
        style={{ height: props.height }}
        aria-label={props.ariaLabel || props.title}
    >
        {
            (props.title || props.headerActions) &&
            <>
                <Flex justifyContent='space-between' alignItems='center'>
                    {
                        props.title
                            ? <div className="center-by-flex-row"><Typography type='title-medium' text={props.title} className="margin-vertical--10" /></div>
                            : <span></span>
                    }

                    {
                        props.headerActions &&
                        <Flex alignItems='center' columnGap='half'>
                            {props.headerActions}
                        </Flex>
                    }
                </Flex>
                <Divider direction='horizontal' length='pc-100' thickness='1' colorType='normal' spaceAround='half' />
            </>

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

        <Flex direction='column' rowGap={props.rowGap || 'half'}>
            {
                Object.values(grouped).map((g, i) => {
                    let cs = { ...(props.collapsedGroupStyle || {}) };
                    let es = { ...(props.expandedGroupStyle || props.collapsedGroupStyle || {}) };

                    if (props.controlItemBorderRadius) {
                        if (!cs.borderRadius) cs.borderRadius = 'default'
                        if (!es.borderRadius) es.borderRadius = 'default'
                        cs.borderRadius = getManagedBorderRadius(i, Object.keys(grouped).length, typeof cs.borderRadius === 'string' ? cs.borderRadius as BorderRadiusValueType : 'default')
                        es.borderRadius = getManagedBorderRadius(i, Object.keys(grouped).length, typeof es.borderRadius === 'string' ? es.borderRadius as BorderRadiusValueType : 'default')
                    }

                    return <ExpandableCard
                        key={g.group}
                        title={g.group}
                        initialState='collapsed'
                        ariaLabel={g.group}
                        collapsedCardStyle={cs}
                        expandedCardStyle={es}
                        state={props.onlyAllowOneGroupToExpand ? openedGroup === g.group ? "expanded" : "collapsed" : undefined}
                        onStateChange={v => {
                            if (v === "expanded") setOpenedGroup(g.group);
                            else {
                                if (openedGroup === g.group) setOpenedGroup('');
                            }
                        }}
                    >
                        <Flex direction='column' rowGap={props.rowGap || 'half'}>
                            {g.items}
                        </Flex>
                    </ExpandableCard>

                })
            }

            {ungrouped}
        </Flex>
    </div>
}