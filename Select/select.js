import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React
import { Fragment, useEffect, useRef, useState } from 'react';
// Installed Packages
import Device from '@vieolo/device-js';
// Material UI
import DownIcon from '@mui/icons-material/ArrowDropDownRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
// Vieolo UI
import IconButton from '../IconButton';
import Typography from '../Typography';
import Checkbox from '../CheckBox';
// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';
export default function Select(props) {
    let [open, setOpen] = useState(false);
    let [top, setTop] = useState(0);
    let [left, setLeft] = useState(0);
    let [bottom, setBottom] = useState(0);
    let [right, setRight] = useState(0);
    let [width, setWidth] = useState(160);
    let [virtKeyboardOffset, setVirtKeyboardOffset] = useState(0);
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
        const handleVirtualKeyboard = (event) => {
            const viewport = window.visualViewport;
            setVirtKeyboardOffset(window.innerHeight - viewport.height);
        };
        if (open && Device.isTouchOnlyDevice && window.visualViewport) {
            window.visualViewport.addEventListener("resize", handleVirtualKeyboard);
            window.visualViewport.addEventListener("scroll", handleVirtualKeyboard);
        }
        else if (!open && Device.isTouchOnlyDevice && window.visualViewport) {
            window.visualViewport.removeEventListener("resize", handleVirtualKeyboard);
            window.visualViewport.removeEventListener("scroll", handleVirtualKeyboard);
            setVirtKeyboardOffset(0);
        }
        return () => {
            if (open && Device.isTouchOnlyDevice && window.visualViewport) {
                window.visualViewport.removeEventListener("resize", handleVirtualKeyboard);
                window.visualViewport.removeEventListener("scroll", handleVirtualKeyboard);
            }
        };
    }, [open]);
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
            setWidth(rect.width);
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
    if (!Device.isTouchOnlyDevice) {
        if (right !== 0)
            style.right = right;
        if (left !== 0)
            style.left = left;
        if (top !== 0)
            style.top = top;
        if (bottom !== 0)
            style.bottom = bottom;
        if (width !== 0)
            style.width = Math.max(width, 160);
    }
    // On Android devices, virtualKeyboardOffset is sometimes a negative value instead of 0
    // So, it should be explicitly checked to be greater than 0
    if (virtKeyboardOffset > 0) {
        style.maxHeight = '25vh';
    }
    let items = [];
    let filtered = props.items.filter(item => (!searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase())));
    for (let i = 0; i < filtered.length; i++) {
        const item = filtered[i];
        const prev = i > 0 ? filtered[i - 1] : undefined;
        items.push(_jsx(SelectItem, { item: item, isSelected: props.selectedItems.includes(item.value), previousItem: prev, onKeyboardFocus: itemKeyboardFocus === item.value, onSelect: (t) => handleSelectItem(t), itemRef: item.value === itemKeyboardFocus ? itemKeyboardRef : undefined, multipleChoice: props.multipleChoice }, item.value));
    }
    const itemsComponent = _jsx("div", { className: "vieolo-select__select-dropdown", style: style, role: "list", children: items });
    let height = 'small';
    if (props.height)
        height = props.height;
    else if (props.title)
        height = 'medium';
    let className = `vieolo-select vieolo-select--${props.width || 'medium'}`;
    if (props.searchable) {
        className += " vieolo-select--searchable";
    }
    if (props.disabled) {
        className += " disabled";
    }
    let searchInput = _jsx("input", { autoFocus: true, value: searchQuery, onChange: e => setSearchQuery(e.target.value), placeholder: "Search...", "aria-label": props.ariaLabel ? (props.ariaLabel + " items") : `Search ${props.title} items` });
    return _jsxs("div", { className: className, ref: container, children: [_jsxs("div", { className: `vieolo-select__select-button${props.error ? ' vieolo-select__select-button--error' : ''} vieolo-select__select-button--${height}`, onClick: e => handleOpen(e), tabIndex: 0, role: "button", "aria-label": props.ariaLabel || `Select ${props.title}`, onKeyDown: e => {
                    if (props.disabled)
                        return;
                    handleOnKeyDown(e, {
                        onEnter: (k) => {
                            if (!open) {
                                e.stopPropagation();
                                e.preventDefault();
                                handleOpen(undefined, true);
                            }
                            else if (itemKeyboardFocus) {
                                if (!(props.searchable && itemKeyboardFocus && k === 'Space')) {
                                    handleSelectItem(filtered.find(f => f.value === itemKeyboardFocus));
                                }
                            }
                        },
                        onAlphaNumeric: () => {
                            if (!open) {
                                e.stopPropagation();
                                e.preventDefault();
                                handleOpen(undefined, true);
                                setSearchQuery(e.key);
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
                }, children: [_jsxs("div", { className: "vieolo-select__select-button__button-text", onClick: e => {
                            e.stopPropagation();
                            handleOpen(e);
                        }, children: [props.title &&
                                _jsx(Typography, { type: 'caption-large', text: props.title, className: "vieolo-select__select-button__button-text__button-title" }), (!props.title && props.placeHolder && (!props.selectedItems || props.selectedItems.length === 0)) &&
                                _jsx(Typography, { type: 'caption-large', text: props.placeHolder, className: "vieolo-select__select-button__button-text__button-title" }), (props.searchable && open && !Device.isTouchOnlyDevice)
                                ? searchInput
                                : _jsx(Typography, { type: 'paragraph-small', text: thisSelectedItems.map(s => s.title).join(", "), className: "vieolo-select__select-button__button-text__button-value", fontWeight: 'bold', showTitle: true })] }), (!props.clearable || (props.clearable && (!props.selectedItems || props.selectedItems.length === 0)))
                        ? _jsx(DownIcon, {})
                        : _jsx(IconButton, { icon: _jsx(CloseIcon, {}), onClick: e => {
                                e.stopPropagation();
                                props.onSelect([]);
                            }, color: "error", size: "extra-small" })] }), open && (Device.isTouchOnlyDevice ?
                _jsxs(_Fragment, { children: [_jsx("div", { className: "vieolo-select__backdrop", onClick: (e) => {
                                e.stopPropagation();
                                setOpen(!open);
                            } }), _jsxs("div", { className: `vieolo-select__modal`, style: virtKeyboardOffset > 0 ? { bottom: (virtKeyboardOffset) + "px", maxHeight: '35vh' } : undefined, children: [props.searchable && searchInput, _jsx("div", { className: 'vieolo-select__modal__container', children: itemsComponent })] })] })
                : itemsComponent)] });
}
function SelectItem(props) {
    let className = "vieolo-select__select-item";
    if (props.isSelected && !props.multipleChoice)
        className += " vieolo-select__select-item--selected";
    if (props.item.category)
        className += " vieolo-select__select-item--category";
    if (props.item.subTitle)
        className += " vieolo-select__select-item--subtitle";
    if (props.onKeyboardFocus)
        className += " vieolo-select__select-item--keyboard-focus";
    return _jsxs(Fragment, { children: [(props.item.category && (!props.previousItem || props.item.category !== props.previousItem.category)) &&
                _jsx("p", { className: "vieolo-select__select-item__category-name", children: props.item.category }), _jsxs("div", { className: className, onClick: e => {
                    e.stopPropagation();
                    props.onSelect(props.item);
                }, ref: props.itemRef, role: "listitem", "aria-label": props.item.title, children: [props.multipleChoice &&
                        _jsx(Checkbox, { onChange: () => { }, value: props.isSelected, removeTabIndex: true }), props.item.icon && props.item.icon, _jsxs("div", { className: 'vieolo-select__select-item__text-container', children: [_jsx(Typography, { text: props.item.title }), props.item.subTitle &&
                                _jsx(Typography, { type: 'caption-medium', text: props.item.subTitle })] })] })] });
}
