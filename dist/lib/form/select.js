import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { Fragment, useEffect, useRef, useState } from 'react';
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyTitleSmall from '../typography/typography_title_small';
// Material UI
import DownIcon from '@material-ui/icons/ArrowDropDownRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
// Components
import IconButton from '../button/icon_button';
export default function Select(props) {
    let [open, setOpen] = useState(false);
    let [container, setContainer] = useState(useRef(null));
    let [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        let main = document.querySelector('main');
        if (main)
            main.style.overflow = 'hidden';
        return () => {
            document.removeEventListener("click", handleClickOutside);
            let main = document.querySelector('main');
            if (main)
                main.style.overflow = 'auto';
        };
    }, []);
    function handleClickOutside(event) {
        if (container.current && !container.current.contains(event.target)) {
            setOpen(false);
            setSearchQuery("");
        }
    }
    ;
    function getSelectedItems(values) {
        return props.items.filter(i => values.includes(i.value));
    }
    let thisSelectedItems = getSelectedItems(props.selectedItems);
    return _jsxs("div", Object.assign({ className: "vieolo-select", ref: container }, { children: [_jsxs("div", Object.assign({ className: `select-button${props.error ? ' select-button-error' : ''}`, onClick: () => {
                    setOpen(true);
                    setSearchQuery("");
                } }, { children: [_jsxs("div", Object.assign({ className: "button-text" }, { children: [_jsx(TypographyParagraphSmall, { text: props.title, className: "button-title" }, void 0),
                            (props.searchable && open)
                                ? _jsx("input", { autoFocus: true, value: searchQuery, onChange: e => setSearchQuery(e.target.value), placeholder: "Search..." }, void 0)
                                : _jsx(TypographyTitleSmall, { text: thisSelectedItems.map(s => s.title).join(", "), className: "button-value" }, void 0)] }), void 0),
                    (!props.clearable || (props.clearable && (!props.selectedItems || props.selectedItems.length === 0)))
                        ? _jsx(DownIcon, {}, void 0)
                        : _jsx(IconButton, { icon: _jsx(CloseIcon, {}, void 0), onClick: () => props.onSelect([]), color: "error", size: "small" }, void 0)] }), void 0),
            open &&
                _jsx("div", Object.assign({ className: "select-dropdown" }, { children: props.items.filter(item => (!searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase()))).map(item => {
                        return _jsx(SelectItem, { item: item, isSelected: props.selectedItems.includes(item.value), onSelect: (t) => {
                                if (props.multipleChoice) {
                                    let newSelected = [...props.selectedItems];
                                    if (props.selectedItems.includes(item.value))
                                        newSelected = newSelected.filter(f => f !== item.value);
                                    else
                                        newSelected.push(item.value);
                                    props.onSelect(newSelected);
                                }
                                else {
                                    setOpen(false);
                                    setSearchQuery("");
                                    props.onSelect([t.value]);
                                }
                            } }, item.title);
                    }) }), void 0)] }), void 0);
}
function SelectItem(props) {
    let className = "select-item";
    if (props.isSelected)
        className += " select-item-selected";
    if (props.item.category)
        className += " select-item-category";
    return _jsxs(Fragment, { children: [props.item.category &&
                _jsx("p", Object.assign({ className: "category-name" }, { children: props.item.category }), void 0),
            _jsx("div", Object.assign({ className: className, onClick: () => { props.onSelect(props.item); } }, { children: _jsx(TypographyParagraphMedium, { text: props.item.title }, void 0) }), void 0)] }, void 0);
}
