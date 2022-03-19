import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Typography
import TypographyTitleMedium from '../typography/typography_title_medium';
// Vieolo UI
import ItemRow from './item_row';
import ExpandableCard from '../card/expandable_card';
export default function List(props) {
    let [query, setQuery] = useState("");
    let sortedItems = props.items.filter(a => {
        if (!query.trim())
            return true;
        if (a.title.toLowerCase().includes(query.toLowerCase()))
            return true;
        if (a.subTitle && props.enableSubtitleSearch && a.subTitle.toLowerCase().includes(query.toLowerCase()))
            return true;
        return false;
    }).sort((a, b) => {
        if (!a.group && !b.group)
            return 1;
        if (a.group === b.group)
            return 1;
        return (a.group || 'zzzzzzzz') > (b.group || 'zzzzzzzz') ? 1 : -1;
    });
    let grouped = {};
    let ungrouped = [];
    for (let i = 0; i < sortedItems.length; i++) {
        const a = sortedItems[i];
        let row = _jsx(ItemRow, { selected: a.selected, title: a.title, subTitle: a.subTitle, onClick: a.onClick, buttonClick: a.onButtonClick, buttonColor: a.buttonColor, buttonIcon: a.buttonIcon, buttonSize: a.buttonSize, leadingIcon: a.leadingIcon, disabled: a.disabled, itemStyle: props.itemStyle }, a.id);
        if (a.group) {
            if (!grouped[a.group])
                grouped[a.group] = { group: a.group, items: [] };
            grouped[a.group].items.push(row);
        }
        else {
            ungrouped.push(row);
        }
    }
    return _jsxs("div", Object.assign({ className: `vieolo-list padding-horizontal--${props.horizontalPadding || 'none'}`, style: { height: props.height } }, { children: [props.title &&
                _jsx("div", Object.assign({ className: "center-by-flex-row" }, { children: _jsx(TypographyTitleMedium, { text: props.title, className: "margin-vertical--10" }, void 0) }), void 0),
            props.enableSearch &&
                _jsx(ItemRow, { itemStyle: props.itemStyle, searchRow: {
                        query: query,
                        onQueryChange: (c) => setQuery(c)
                    } }, void 0),
            Object.values(grouped).map(g => {
                return _jsx("div", Object.assign({ className: "margin-vertical--half" }, { children: _jsx(ExpandableCard, Object.assign({ title: g.group, initialState: 'collapsed', collapsedCardStyle: props.collapsedGroupStyle, expandedCardStyle: props.expandedGroupStyle || props.collapsedGroupStyle }, { children: g.items }), void 0) }), g.group);
            }),
            ungrouped] }), void 0);
}
