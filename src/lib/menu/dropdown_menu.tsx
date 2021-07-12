// React
import React, { useState, useRef, useEffect } from 'react';


type DropDownMenuProps = {
    buttonComponent: React.ReactNode,
    disabled?: boolean,
    items: { title: string, icon?: React.ReactNode }[],
    onItemSelec: (title: string) => void,
    className?: string
}


export default function DropDownMenu(props: DropDownMenuProps) {

    let [open, setOpen] = useState<boolean>(false);
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef(null));

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        let main = document.querySelector('main')
        if (main) main.style.overflow = 'hidden';

        return () => {
            document.removeEventListener("click", handleClickOutside);
            let main = document.querySelector('main');
            if (main) main.style.overflow = 'auto';
        }
    }, [container])


    function handleButtonClick() {
        setOpen(!open);
    };



    return <div className={`vieolo-dropdown-menu ${props.className || ''}`} ref={container as any}>
        <div onClick={() => handleButtonClick()}>
            {props.buttonComponent}
        </div>

        {
            open &&
            <div className="dropdown">
                {
                    props.items.map(item => {
                        return <DropDownMenuItem title={item.title} icon={item.icon} onClick={(t: string) => {
                            setOpen(!open);
                            props.onItemSelec(t);
                        }} />
                    })
                }
            </div>
        }
    </div>


}

function DropDownMenuItem(props: { title: string, onClick: (selectedTitle: string) => void, icon?: React.ReactNode }) {

    return <div className="dropdown-item" onClick={() => { props.onClick(props.title) }}>
        {
            props.icon &&
            props.icon
        }
        {props.title}
    </div>
}