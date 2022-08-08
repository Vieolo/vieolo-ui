import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { Fragment, useEffect, useRef, useState } from 'react';
//Installed Packages
import Device from '@vieolo/device-js';
// Material UI
import DownIcon from '@mui/icons-material/ArrowDropDownRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
// Vieolo UI
import IconButton from '../IconButton';
import Typography from '../Typography';
import Modal from '../Modal/modal';
import Card from '../Card/card';
// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';
export default function Select(props) {
    let [open, setOpen] = useState(false);
    let [top, setTop] = useState(0);
    let [left, setLeft] = useState(0);
    let [bottom, setBottom] = useState(0);
    let [right, setRight] = useState(0);
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef(null));
    let [searchQuery, setSearchQuery] = useState("");
    let [itemKeyboardFocus, setItemKeyboardFocus] = useState("");
    let itemKeyboardRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (container.current && !container.current.contains(event.target)) {
                setOpen(false);
                setSearchQuery("");
                setItemKeyboardFocus("");
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [container]);
    useEffect(() => {
        let main = document.querySelector('main');
        if (main) {
            if (open)
                main.style.overflow = 'hidden';
            else
                main.style.removeProperty("overflow");
        }
    }, [open]);
    useEffect(() => {
        if (itemKeyboardFocus && itemKeyboardRef.current) {
            itemKeyboardRef.current.scrollIntoView({ block: 'center' });
        }
    }, [itemKeyboardFocus, itemKeyboardRef]);
    function getSelectedItems(values) {
        return props.items.filter(i => values.includes(i.value));
    }
    function handleOpen(e, openedByKeyboard) {
        if (e)
            e.stopPropagation();
        if (!open) {
            let rect = container.current.getBoundingClientRect();
            let displaySize = { width: window.innerWidth, height: window.innerHeight };
            let r = 0, l = 0, t = 0, b = 0;
            if ((rect.y + 240 + rect.height) > displaySize.height) {
                b = displaySize.height - rect.y;
                t = 0;
            }
            else {
                t = rect.top + rect.height;
                b = 0;
            }
            if ((rect.x - (160 - rect.width)) < 160) {
                l = rect.left;
                r = 0;
            }
            else {
                l = 0;
                r = displaySize.width - rect.x - rect.width;
            }
            setRight(r);
            setLeft(l);
            setTop(t);
            setBottom(b);
        }
        setOpen(true);
        setSearchQuery("");
        if (openedByKeyboard)
            setItemKeyboardFocus(props.selectedItems[0]);
    }
    function handleSelectItem(item) {
        if (!item)
            return;
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
            props.onSelect([item.value]);
        }
    }
    let thisSelectedItems = getSelectedItems(props.selectedItems);
    let style = {};
    if (right !== 0)
        style.right = right;
    if (left !== 0)
        style.left = left;
    if (top !== 0)
        style.top = top;
    if (bottom !== 0)
        style.bottom = bottom;
    let items = [];
    let filtered = props.items.filter(item => (!searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase())));
    for (let i = 0; i < filtered.length; i++) {
        const item = filtered[i];
        const prev = i > 0 ? filtered[i - 1] : undefined;
        items.push(_jsx(SelectItem, { item: item, isSelected: props.selectedItems.includes(item.value), previousItem: prev, onKeyboardFocus: itemKeyboardFocus === item.value, onSelect: (t) => handleSelectItem(t), itemRef: item.value === itemKeyboardFocus ? itemKeyboardRef : undefined }, item.value));
    }
    const itemsComponent = _jsx("div", Object.assign({ className: "vieolo-select__select-dropdown", style: style, role: "list" }, { children: items }), void 0);
    return _jsxs("div", Object.assign({ className: `vieolo-select${props.disabled ? ' disabled' : ''}`, ref: container }, { children: [_jsxs("div", Object.assign({ className: `vieolo-select__select-button${props.error ? ' vieolo-select__select-button--error' : ''} vieolo-select__select-button--${props.height || 'medium'}`, onClick: e => handleOpen(e), tabIndex: 0, role: "button", "aria-label": `Select ${props.title}`, onKeyDown: e => {
                    if (props.disabled)
                        return;
                    handleOnKeyDown(e, {
                        onEnter: () => {
                            if (!open)
                                handleOpen(undefined, true);
                            else if (itemKeyboardFocus) {
                                handleSelectItem(filtered.find(f => f.value === itemKeyboardFocus));
                            }
                        },
                        onArrowDown: () => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (open) {
                                if (itemKeyboardFocus) {
                                    let lastIndex = filtered.map(f => f.value).indexOf(itemKeyboardFocus);
                                    if (lastIndex < filtered.length - 1)
                                        setItemKeyboardFocus(filtered[lastIndex + 1].value);
                                }
                                else {
                                    setItemKeyboardFocus(filtered[0].value);
                                }
                            }
                            else {
                                handleOpen(undefined, true);
                            }
                        },
                        onArrowUp: () => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (open) {
                                if (itemKeyboardFocus) {
                                    let lastIndex = filtered.map(f => f.value).indexOf(itemKeyboardFocus);
                                    if (lastIndex > 0)
                                        setItemKeyboardFocus(filtered[lastIndex - 1].value);
                                }
                            }
                        },
                        onEscape: () => {
                            setOpen(false);
                            setSearchQuery("");
                            setItemKeyboardFocus("");
                        },
                        onBackspace: () => {
                            if (!open && props.clearable) {
                                props.onSelect([]);
                            }
                        },
                        onTab: () => {
                            if (open) {
                                setOpen(false);
                                setSearchQuery("");
                                setItemKeyboardFocus("");
                            }
                        }
                    });
                } }, { children: [_jsxs("div", Object.assign({ className: "vieolo-select__select-button__button-text", onClick: e => {
                            e.stopPropagation();
                            handleOpen(e);
                        } }, { children: [_jsx(Typography, { type: 'paragraph-small', text: props.title, className: "vieolo-select__select-button__button-text__button-title" }, void 0),
                            (props.searchable && open)
                                ? _jsx("input", { autoFocus: true, value: searchQuery, onChange: e => setSearchQuery(e.target.value), placeholder: "Search...", "aria-label": `Search ${props.title} items` }, void 0)
                                : _jsx(Typography, { type: 'title-small', text: thisSelectedItems.map(s => s.title).join(", "), className: "vieolo-select__select-button__button-text__button-value" }, void 0)] }), void 0),
                    (!props.clearable || (props.clearable && (!props.selectedItems || props.selectedItems.length === 0)))
                        ? _jsx(DownIcon, {}, void 0)
                        : _jsx(IconButton, { icon: _jsx(CloseIcon, {}, void 0), onClick: () => props.onSelect([]), color: "error", size: "extra-small" }, void 0)] }), void 0),
            open && (Device.isTouchOnlyDevice ?
                _jsx(Modal, Object.assign({ onClose: () => setOpen(false) }, { children: _jsxs(Card, { children: [_jsx(Typography, { type: 'title-small', text: props.title || '', className: 'vieolo-select__modal-title' }, void 0),
                            itemsComponent] }, void 0) }), void 0)
                : itemsComponent)] }), void 0);
}
function SelectItem(props) {
    let className = "vieolo-select__select-item";
    if (props.isSelected)
        className += " vieolo-select__select-item--selected";
    if (props.item.category)
        className += " vieolo-select__select-item--category";
    if (props.item.subTitle)
        className += " vieolo-select__select-item--subtitle";
    if (props.onKeyboardFocus)
        className += " vieolo-select__select-item--keyboard-focus";
    return _jsxs(Fragment, { children: [(props.item.category && (!props.previousItem || props.item.category !== props.previousItem.category)) &&
                _jsx("p", Object.assign({ className: "vieolo-select__select-item__category-name" }, { children: props.item.category }), void 0),
            _jsxs("div", Object.assign({ className: className, onClick: e => {
                    e.stopPropagation();
                    props.onSelect(props.item);
                }, ref: props.itemRef, role: "listitem", "aria-label": props.item.title }, { children: [_jsx(Typography, { text: props.item.title }, void 0),
                    props.item.subTitle &&
                        _jsx(Typography, { type: 'caption-medium', text: props.item.subTitle }, void 0)] }), void 0)] }, void 0);
}
