// React
import React, { useState, useRef, useEffect, CSSProperties } from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';


type DropDownMenuProps = {
    buttonComponent: React.ReactNode,
    disabled?: boolean,
    items: { title: string, icon?: React.ReactNode }[],
    onItemSelect: (title: string) => void,
    className?: string,
    position?: 'left' | 'right'
}


export default function DropDownMenu(props: DropDownMenuProps) {

    let [open, setOpen] = useState<boolean>(false);
    let [top, setTop] = useState<number>(0);
    let [left, setLeft] = useState<number>(0);
    let [bottom, setBottom] = useState<number>(0);
    let [right, setRight] = useState<number>(0);
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef<HTMLDivElement>(null));

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
        

        return () => {
            document.removeEventListener("click", handleClickOutside);            
        }
    }, [container])

    useEffect(() => {
        let main = document.querySelector('main')
        if (main) {
            if (open) main.style.overflow = 'hidden';
            else main.style.removeProperty("overflow");
        }
    }, [open])


    function handleButtonClick() {
        if (!props.disabled) {
            if (!open) {
                let rect = container.current!.getBoundingClientRect();
                let displaySize = {width: window.innerWidth, height: window.innerHeight}
                let r = 0,
                    l = 0,
                    t = 0,
                    b = 0;
                
                if ((rect.y + 240 + rect.height) > displaySize.height) {
                    b = displaySize.height - rect.y;
                    t = 0;
                }else {
                    t = rect.top + rect.height;
                    b = 0;
                }

                if ((rect.x - (190 - rect.width)) < 190) {
                    l = rect.left;
                    r = 0;
                }else {
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
    };

    let className = "vieolo-dropdown-menu";
    if (props.className) className += ` ${props.className}`;
    if (props.disabled) className += " disabled";

    let style: CSSProperties = {}

    if (right != 0) style.right = right;
    if (left != 0) style.left = left;
    if (top != 0) style.top = top;
    if (bottom != 0) style.bottom = bottom;
    

    return <div className={className} ref={container as any}>
        <div onClick={() => handleButtonClick()}>
            {props.buttonComponent}
        </div>

        {
            open &&
            <div className={`dropdown dropdown--${props.position || 'left'}`} style={style} >
                {
                    props.items.map(item => {
                        return <DropDownMenuItem key={item.title} title={item.title} icon={item.icon} onClick={(t: string) => {
                            setOpen(!open);
                            props.onItemSelect(t);
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
        <TypographyParagraphMedium  text={props.title} />
    </div>
}