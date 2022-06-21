import { jsx as _jsx } from "react/jsx-runtime";
// React
import React, { useEffect, useState, useRef, useCallback } from 'react';
export default function Modal({ onClose, children }) {
    let [container,] = useState(useRef(null));
    let handleClickOutside = useCallback((event) => {
        if (container.current && !container.current.contains(event.target)) {
            onCloseRef.current(event);
        }
    }, [container]);
    const onCloseRef = React.useRef(onClose);
    React.useEffect(() => {
        onCloseRef.current = onClose;
    });
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        let main = document.querySelector('main');
        if (main)
            main.style.overflow = 'hidden';
        return () => {
            document.removeEventListener("click", handleClickOutside);
            let main = document.querySelector('main');
            if (main)
                main.style.removeProperty("overflow");
        };
    }, [container, handleClickOutside]);
    return _jsx("div", Object.assign({ className: `vieolo-modal`, onClick: e => handleClickOutside(e) }, { children: _jsx("div", Object.assign({ className: "modal-content", ref: container }, { children: children }), void 0) }), void 0);
}
