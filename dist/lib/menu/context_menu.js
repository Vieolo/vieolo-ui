import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { Fragment, useState, useEffect, useRef } from 'react';
// Hooks
import { useAppearingContainer } from '../../hooks/useAppearingContainer';
export default function ContextMenu(props) {
    let [top, setTop] = useState('');
    let [left, setLeft] = useState('');
    let container = useRef(null);
    useAppearingContainer(container, true, props.onClose, () => {
        props.onClose();
    });
    useEffect(() => {
        const clickX = props.position.x;
        const clickY = props.position.y;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = container.current.offsetWidth;
        const rootH = container.current.offsetHeight;
        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;
        if (right) {
            setLeft(`${clickX + 5}px`);
        }
        if (left) {
            setLeft(`${clickX - rootW - 5}px`);
        }
        if (top) {
            setTop(`${clickY + 5}px`);
        }
        if (bottom) {
            setTop(`${clickY - rootH - 5}px`);
        }
    }, [container, props.position]);
    return _jsx("div", Object.assign({ ref: container, className: "vieolo-context-menu", style: { top: top, left: left } }, { children: props.items.map(i => {
            return _jsxs("div", Object.assign({ "aria-label": `Context Menu ${i.ariaLabel || i.title}`, className: `vieolo-context-menu__menu-row vieolo-context-menu__menu-row-${i.color || 'primary'} ${i.disabled ? ' disabled' : ''}`, onClick: () => { i.onClick(i.title); props.onClose(); } }, { children: [i.icon &&
                        _jsx(Fragment, { children: i.icon }, void 0),
                    _jsx("p", { children: i.title }, void 0)] }), i.title);
        }) }), void 0);
}
