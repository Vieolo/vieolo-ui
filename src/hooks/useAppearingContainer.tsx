// React
import React, { useEffect } from "react";

export function useAppearingContainer( // internal
    container: React.RefObject<HTMLDivElement>, 
    open: boolean, 
    setOpen: React.Dispatch<React.SetStateAction<boolean>>,
    onClose?: () => void
) {

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setOpen(false);
                if (onClose) onClose();
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [container, setOpen, onClose])

    useEffect(() => {
        let main = document.querySelector('main')
        if (main) {
            if (open) main.style.overflow = 'hidden';
            else main.style.removeProperty("overflow");
        }

        return () => {
            let main = document.querySelector('main')
            if (main) main.style.removeProperty("overflow");
        }
    }, [open]);

}