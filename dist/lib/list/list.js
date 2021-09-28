import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Typography
import TypographyTitleMedium from '../typography/typography_title_medium';
// Vieolo UI
import ItemRowSearch from './item_row_search';
import ItemRow from './item_row';
export default function List(props) {
    let [query, setQuery] = useState("");
    return _jsxs("div", Object.assign({ className: "vieolo-list", style: { height: props.height } }, { children: [_jsx("div", Object.assign({ className: "center-by-flex-row" }, { children: _jsx(TypographyTitleMedium, { text: props.title, className: "margin-vertical--10" }, void 0) }), void 0),
            props.enableSearch &&
                _jsx(ItemRowSearch, { query: query, cardStyle: props.cardStyle || 'card-no-shadow', onChange: q => setQuery(q) }, void 0),
            props.items.filter(a => !query.trim() || a.title.toLowerCase().includes(query.toLowerCase())).map(a => {
                return _jsx(ItemRow, { cardStyle: props.cardStyle || 'card-no-shadow', selected: a.selected, title: a.title, subTitle: a.subTitle, onClick: a.onClick, buttonClick: a.onButtonClick, buttonColor: a.buttonColor, buttonIcon: a.buttonIcon, buttonSize: a.buttonSize, leadingIcon: a.leadingIcon }, a.id);
            })] }), void 0);
}
