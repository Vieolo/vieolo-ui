import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useRef, useEffect } from 'react';
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
export default function DropDownMenu(props) {
    let [open, setOpen] = useState(false);
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef(null));
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (container.current && !container.current.contains(event.target)) {
                setOpen(false);
            }
        };
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
    }, [container]);
    function handleButtonClick() {
        if (!props.disabled)
            setOpen(!open);
    }
    ;
    let className = "vieolo-dropdown-menu";
    if (props.className)
        className += ` ${props.className}`;
    if (props.disabled)
        className += " disabled";
    return _jsxs("div", Object.assign({ className: className, ref: container }, { children: [_jsx("div", Object.assign({ onClick: () => handleButtonClick() }, { children: props.buttonComponent }), void 0),
            open &&
                _jsx("div", Object.assign({ className: `dropdown dropdown--${props.position || 'left'}` }, { children: props.items.map(item => {
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
