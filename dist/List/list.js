import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Vieolo UI
import ItemRow from '../ItemRow';
import Typography from '../Typography';
import Flex from '../Flex';
import ExpandableCard from '../ExpandableCard/expandable_card';
import Divider from '../Divider';
import { getManagedBorderRadius } from '../utility/style_utility';
export default function List(props) {
    function changeItemRowBorderRadius(items) {
        let elements = [];
        for (let i = 0; i < items.length; i++) {
            const a = items[i];
            let ts = props.itemStyle ? { ...props.itemStyle } : { borderRadius: 'default' };
            if (props.controlItemBorderRadius && items.length > 1) {
                ts.borderRadius = getManagedBorderRadius(i, items.length, typeof ts.borderRadius === 'string' ? ts.borderRadius : 'default');
            }
            let row = _jsx(ItemRow, { selected: a.selected, title: a.title, subTitle: a.subTitle, onClick: a.onClick, buttonClick: a.onButtonClick, buttonColor: a.buttonColor, buttonIcon: a.buttonIcon, buttonSize: a.buttonSize, leadingIcon: a.leadingIcon, disabled: a.disabled, itemStyle: ts, ariaLabel: a.ariaLabel }, a.id);
            elements.push(row);
        }
        return elements;
    }
    let [query, setQuery] = useState("");
    let [openedGroup, setOpenedGroup] = useState("");
    let sortedItems = props.items.filter(a => {
        if (!query.trim())
            return true;
        if (a.title.toLowerCase().includes(query.toLowerCase()))
            return true;
        if (a.subTitle && props.enableSubtitleSearch && a.subTitle.toLowerCase().includes(query.toLowerCase()))
            return true;
        return false;
    });
    if (props.enableSorting) {
        sortedItems.sort((a, b) => {
            if (!a.group && !b.group)
                return a.title > b.title ? 1 : -1;
            if (a.group === b.group)
                return a.title > b.title ? 1 : -1;
            return (a.group || 'zzzzzzzzzzzzz') > (b.group || 'zzzzzzzzzzzzzzz') ? 1 : -1;
        });
    }
    let grouped = {};
    let ungroupedData = [];
    let ungrouped = [];
    for (let i = 0; i < sortedItems.length; i++) {
        const a = sortedItems[i];
        if (a.group) {
            if (!grouped[a.group])
                grouped[a.group] = { group: a.group, items: [], data: [] };
            grouped[a.group].data.push(a);
        }
        else {
            ungroupedData.push(a);
        }
    }
    for (let i = 0; i < Object.keys(grouped).length; i++) {
        const g = grouped[Object.keys(grouped)[i]];
        g.items = changeItemRowBorderRadius(g.data);
    }
    ungrouped = changeItemRowBorderRadius(ungroupedData);
    return _jsxs("div", { className: `vieolo-list padding-horizontal--${props.horizontalPadding || 'none'}`, style: { height: props.height }, "aria-label": props.ariaLabel || props.title, children: [(props.title || props.headerActions) &&
                _jsxs(_Fragment, { children: [_jsxs(Flex, { justifyContent: 'space-between', alignItems: 'center', children: [props.title
                                    ? _jsx("div", { className: "center-by-flex-row", children: _jsx(Typography, { type: 'title-medium', text: props.title, className: "margin-vertical--10" }) })
                                    : _jsx("span", {}), props.headerActions &&
                                    _jsx(Flex, { alignItems: 'center', columnGap: 'half', children: props.headerActions })] }), _jsx(Divider, { direction: 'horizontal', length: 'pc-100', thickness: '1', colorType: 'normal', spaceAround: 'half' })] }), props.enableSearch &&
                _jsx(ItemRow, { itemStyle: props.itemStyle, searchRow: {
                        query: query,
                        onQueryChange: (c) => setQuery(c)
                    } }), _jsxs(Flex, { direction: 'column', rowGap: props.rowGap || 'half', children: [Object.values(grouped).map((g, i) => {
                        let cs = { ...(props.collapsedGroupStyle || {}) };
                        let es = { ...(props.expandedGroupStyle || props.collapsedGroupStyle || {}) };
                        if (props.controlItemBorderRadius) {
                            if (!cs.borderRadius)
                                cs.borderRadius = 'default';
                            if (!es.borderRadius)
                                es.borderRadius = 'default';
                            cs.borderRadius = getManagedBorderRadius(i, Object.keys(grouped).length, typeof cs.borderRadius === 'string' ? cs.borderRadius : 'default');
                            es.borderRadius = getManagedBorderRadius(i, Object.keys(grouped).length, typeof es.borderRadius === 'string' ? es.borderRadius : 'default');
                        }
                        return _jsx(ExpandableCard, { title: g.group, initialState: 'collapsed', ariaLabel: g.group, collapsedCardStyle: cs, expandedCardStyle: es, state: props.onlyAllowOneGroupToExpand ? openedGroup === g.group ? "expanded" : "collapsed" : undefined, onStateChange: v => {
                                if (v === "expanded")
                                    setOpenedGroup(g.group);
                                else {
                                    if (openedGroup === g.group)
                                        setOpenedGroup('');
                                }
                            }, children: _jsx(Flex, { direction: 'column', rowGap: props.rowGap || 'half', children: g.items }) }, g.group);
                    }), ungrouped] })] });
}
