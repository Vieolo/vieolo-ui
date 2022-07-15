import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef, useEffect } from 'react';
// Vieolo UI
import Typography from '../Typography';
// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';
export default function DropDownMenu(props) {
    let [open, setOpen] = useState(false);
    let [top, setTop] = useState(0);
    let [left, setLeft] = useState(0);
    let [bottom, setBottom] = useState(0);
    let [right, setRight] = useState(0);
    let [container,] = useState(useRef(null));
    let [itemKeyboardFocus, setItemKeyboardFocus] = useState("");
    let itemKeyboardRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (container.current && !container.current.contains(event.target)) {
                setOpen(false);
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
    function handleOpen(e, openedByKeyboard) {
        if (!props.disabled) {
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
                if (props.position === 'right' || (rect.x - (190 - rect.width)) < 190) {
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
            setOpen(!open);
            if (openedByKeyboard)
                setItemKeyboardFocus(props.items[0].value);
        }
    }
    ;
    function handleSelectItem(item) {
        if (!item)
            return;
        setOpen(false);
        props.onItemSelect(item.value);
    }
    let className = "vieolo-dropdown-menu";
    if (props.className)
        className += ` ${props.className}`;
    if (props.disabled)
        className += " disabled";
    let style = {};
    if (right !== 0)
        style.right = right;
    if (left !== 0)
        style.left = left;
    if (top !== 0)
        style.top = top;
    if (bottom !== 0)
        style.bottom = bottom;
    return _jsxs("div", Object.assign({ className: className, ref: container }, { children: [_jsx("div", Object.assign({ onClick: e => handleOpen(e), tabIndex: 0, onKeyDown: e => {
                    handleOnKeyDown(e, {
                        onEnter: () => {
                            if (!open)
                                handleOpen(undefined, true);
                            else if (itemKeyboardFocus) {
                                handleSelectItem(props.items.find(i => i.value === itemKeyboardFocus));
                                setOpen(false);
                            }
                        },
                        onArrowDown: () => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (open) {
                                let lastIndex = props.items.findIndex(i => i.value === itemKeyboardFocus);
                                if (lastIndex < props.items.length - 1) {
                                    setItemKeyboardFocus(props.items[lastIndex + 1].value);
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
                                let lastIndex = props.items.findIndex(i => i.value === itemKeyboardFocus);
                                if (lastIndex > 0) {
                                    setItemKeyboardFocus(props.items[lastIndex - 1].value);
                                }
                            }
                            else {
                                handleOpen(undefined, true);
                            }
                        },
                        onEscape: () => {
                            if (open) {
                                setOpen(false);
                                setItemKeyboardFocus("");
                            }
                        },
                        onTab: () => {
                            if (open) {
                                setOpen(false);
                                setItemKeyboardFocus("");
                            }
                        }
                    });
                } }, { children: props.buttonComponent }), void 0),
            open &&
                _jsx("div", Object.assign({ className: `dropdown`, style: style }, { children: props.items.map((item, i) => {
                        return _jsx(DropDownMenuItem, { title: item.title, value: item.value, icon: item.icon, color: item.color, onClick: (v) => {
                                setOpen(!open);
                                props.onItemSelect(v);
                            }, onItemSelect: (t) => { handleSelectItem(t); }, onKeyboardFocus: itemKeyboardFocus === item.value, itemRef: item.value === itemKeyboardFocus ? itemKeyboardRef : undefined }, `${item.value}_${i}`);
                    }) }), void 0)] }), void 0);
}
function DropDownMenuItem(props) {
    let className = ` vieolo-dropdown-menu__dropdown-item color--${props.color || 'primary'}-normal`;
    if (props.onKeyboardFocus)
        className += ` vieolo-dropdown-menu__dropdown-item--keyboard-focus`;
    return _jsxs("div", Object.assign({ className: className, onClick: e => {
            e.stopPropagation();
            props.onClick(props.value);
        }, "aria-label": `${props.title} select item` }, { children: [props.icon &&
                props.icon,
            _jsx(Typography, { type: 'paragraph-small', text: props.title, fontWeight: 'bold' }, void 0)] }), void 0);
}
