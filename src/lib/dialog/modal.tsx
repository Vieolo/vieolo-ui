// React
import React, { useEffect, useState, useRef, useCallback } from 'react';


type onCloseEvent = MouseEvent | React.MouseEvent<HTMLDivElement, MouseEvent>;

export default function Modal({ onClose, children }: {
    onClose: (event: onCloseEvent) => void,
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


    return <div className={`vieolo-modal`} onClick={e => handleClickOutside(e)}>
        <div className="modal-content" ref={container as any}>
            {children}
        </div>
    </div>

}