import { jsx as _jsx } from "react/jsx-runtime";
// React
import React, { useEffect, useState, useRef, useCallback } from 'react';
export default function Modal({ onClose, position, children }) {
    let [container,] = useState(useRef(null));
    let [id,] = useState(new Date().getTime());
    let handleClickOutside = useCallback((event) => {
        if (container.current &&
            !container.current.contains(event.target) &&
            container.current.getAttribute("modal-id") === id.toString()) {
            event.stopPropagation();
            onCloseRef.current(event);
        }
    }, [container, id]);
    const onCloseRef = React.useRef(onClose);
    useEffect(() => {
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
    useEffect(() => {
        const handleBrowserBack = (e) => {
            // This callback is fired AFTER the browser has poped the state
            // So, the state is NOT reflective of the state that has just been poped
            // There are cases where two modals are places on top of each other
            // In those cases, if the current state equals to this modal ID, it means
            // that the current modal is was the lower modal and the top modal has just
            // been poped
            // So, we won't close this modal just yet 
            e.preventDefault();
            if (e.state !== `modal ${id}`) {
                onClose(e);
            }
        };
        // When the url is using HTTP, it will be considered to be in debug mode
        let debug = window.location.protocol === 'http:';
        // debug = false;
        if (!debug) {
            window.history.pushState(`modal ${id}`, '');
            window.addEventListener('popstate', handleBrowserBack);
        }
        return () => {
            if (!debug) {
                window.removeEventListener('popstate', handleBrowserBack);
                if (window.history.state === `modal ${id}`) {
                    // window.history.replaceState({}, '');
                    window.history.go(-1);
                }
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    let className = "vieolo-modal";
    if (position === 'top') {
        className += " vieolo-modal--top";
    }
    return _jsx("div", { className: className, onClick: e => handleClickOutside(e), children: _jsx("div", { className: "modal-content", ref: container, "modal-id": id, children: children }) });
}
