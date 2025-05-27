import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef, useEffect } from 'react';
// Vieolo UI
import Typography from '../Typography';
import SwitchRow from '../SwitchRow';
import IconButton from '../IconButton';
// Installed Packages
import Device from '@vieolo/device-js';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
    let finalItems = props.items.filter(z => !z.hidden);
    let disabled = props.disabled || (finalItems.length === 0 && props.disableIfAllItemsHidden);
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
        if (!disabled) {
            if (e)
                e.stopPropagation();
            if (!open && !Device.isTouchOnlyDevice) {
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
                if (props.position === 'right' || (rect.x < 260 && (rect.x - (260 - rect.width)) < 260)) {
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
                setItemKeyboardFocus(finalItems[0].value);
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
    if (disabled)
        className += " disabled";
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
    }
    return _jsxs("div", { className: className, ref: container, children: [_jsx("div", { onClick: e => handleOpen(e), tabIndex: 0, onKeyDown: e => {
                    handleOnKeyDown(e, {
                        onEnter: () => {
                            if (!open)
                                handleOpen(undefined, true);
                            else if (itemKeyboardFocus) {
                                handleSelectItem(finalItems.find(i => i.value === itemKeyboardFocus));
                                setOpen(false);
                            }
                        },
                        onArrowDown: () => {
                            e.stopPropagation();
                            e.preventDefault();
                            if (open) {
                                let lastIndex = finalItems.findIndex(i => i.value === itemKeyboardFocus);
                                if (lastIndex < finalItems.length - 1) {
                                    setItemKeyboardFocus(finalItems[lastIndex + 1].value);
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
                                let lastIndex = finalItems.findIndex(i => i.value === itemKeyboardFocus);
                                if (lastIndex > 0) {
                                    setItemKeyboardFocus(finalItems[lastIndex - 1].value);
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
                }, children: props.buttonComponent ||
                    _jsx(IconButton, { icon: _jsx(MoreVertIcon, {}), ...props.defaultButtonConfig, size: (props.defaultButtonConfig && props.defaultButtonConfig.size) ? props.defaultButtonConfig.size : 'small', disabled: disabled }) }), open &&
                _jsxs(_Fragment, { children: [_jsx("div", { className: "vieolo-dropdown-menu__backdrop", onClick: (e) => {
                                e.stopPropagation();
                                setOpen(!open);
                            } }), _jsx("div", { className: `vieolo-dropdown-menu__dropdown`, style: style, children: finalItems.map((item, i) => {
                                return _jsx(DropDownMenuItem, { title: item.title, topBorder: item.topBorder, value: item.value, icon: item.icon, color: item.color, switch: item.switch, onClick: (v, closeDialog) => {
                                        if (closeDialog)
                                            setOpen(!open);
                                        props.onItemSelect(v);
                                    }, onItemSelect: (t) => { handleSelectItem(t); }, onKeyboardFocus: itemKeyboardFocus === item.value, itemRef: item.value === itemKeyboardFocus ? itemKeyboardRef : undefined }, `${item.value}_${i}`);
                            }) })] })] });
}
function DropDownMenuItem(props) {
    let className = ` vieolo-dropdown-menu__dropdown-item ${props.topBorder ? "vieolo-dropdown-menu__dropdown-item--top-border" : ''} color--${props.color || 'primary'}-normal`;
    if (props.onKeyboardFocus)
        className += ` vieolo-dropdown-menu__dropdown-item--keyboard-focus`;
    if (props.switch) {
        return _jsx(SwitchRow, { on: props.switch.on, onChange: () => {
                props.onClick(props.value, false);
            }, switchID: `dropdown_${props.value}_switch`, title: props.title, ariaLabel: props.switch.ariaLabel, disabled: props.switch.disabled, subtitle: props.switch.subTitle });
    }
    return _jsxs("div", { className: className, onClick: e => {
            e.stopPropagation();
            props.onClick(props.value, true);
        }, "aria-label": `${props.value} select item`, children: [props.icon &&
                props.icon, _jsx(Typography, { type: 'paragraph-small', text: props.title, fontWeight: 'bold' })] });
}
