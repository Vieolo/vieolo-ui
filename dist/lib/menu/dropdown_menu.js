import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef, useEffect } from 'react';
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
export default function DropDownMenu(props) {
    let [open, setOpen] = useState(false);
    let [top, setTop] = useState(0);
    let [left, setLeft] = useState(0);
    let [bottom, setBottom] = useState(0);
    let [right, setRight] = useState(0);
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef(null));
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (container.current && !container.current.contains(event.target)) {
                setOpen(false);
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
    function handleButtonClick() {
        if (!props.disabled) {
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
        }
    }
    ;
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
    return _jsxs("div", Object.assign({ className: className, ref: container }, { children: [_jsx("div", Object.assign({ onClick: () => handleButtonClick() }, { children: props.buttonComponent }), void 0),
            open &&
                _jsx("div", Object.assign({ className: `dropdown'}`, style: style }, { children: props.items.map(item => {
                        return _jsx(DropDownMenuItem, { title: item.title, icon: item.icon, onClick: (t) => {
                                setOpen(!open);
                                props.onItemSelect(t);
                            } }, item.title);
                    }) }), void 0)] }), void 0);
}
function DropDownMenuItem(props) {
    return _jsxs("div", Object.assign({ className: "dropdown-item", onClick: () => { props.onClick(props.title); } }, { children: [props.icon &&
                props.icon,
            _jsx(TypographyParagraphMedium, { text: props.title }, void 0)] }), void 0);
}
