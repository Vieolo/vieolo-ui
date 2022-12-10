// React
import React, { useEffect, useState, useRef, useCallback } from 'react';


type onCloseEvent = MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function Modal({ onClose, position, children }: {
    onClose: (event: onCloseEvent) => void,
    position?: 'center' | 'top',
    children: React.ReactNode
}) {

    let [container,] = useState(useRef<HTMLDivElement>(null));

    let handleClickOutside = useCallback((event: onCloseEvent) => {
        if (container.current && !(container.current as any).contains(event.target)) {
            onCloseRef.current(event);
        }
    }, [container]);

    const onCloseRef = React.useRef(onClose);
    React.useEffect(
        () => {
            onCloseRef.current = onClose;
        }
    );

    useEffect(() => {


        document.addEventListener("click", handleClickOutside);
        let main = document.querySelector('main');
        if (main) main.style.overflow = 'hidden';


        return () => {
            document.removeEventListener("click", handleClickOutside);
            let main = document.querySelector('main');
            if (main) main.style.removeProperty("overflow");
        }
    }, [container, handleClickOutside]);

    let className = "vieolo-modal";

    if (position === 'top') {
        className += " vieolo-modal--top"
    }

    return <div className={className} onClick={e => handleClickOutside(e)}>
        <div className="modal-content" ref={container as any}>
            {children}
        </div>
    </div>

}