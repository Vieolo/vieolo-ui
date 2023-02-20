// React
import { useEffect } from "react";
export function useAppearingContainer(// internal
container, open, setOpen, onClose) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (container.current && !container.current.contains(event.target)) {
                setOpen(false);
                if (onClose)
                    onClose();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [container, setOpen, onClose]);
    useEffect(() => {
        let main = document.querySelector('main');
        if (main) {
            if (open)
                main.style.overflow = 'hidden';
            else
                main.style.removeProperty("overflow");
        }
        return () => {
            let main = document.querySelector('main');
            if (main)
                main.style.removeProperty("overflow");
        };
    }, [open]);
}
