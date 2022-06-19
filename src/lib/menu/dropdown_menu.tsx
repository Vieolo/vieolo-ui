// React
import React, { useState, useRef, useEffect, CSSProperties } from 'react';

// Vieolo UI
import Typography from '../typography/typography';

// Types
import { ColorOptionType } from '../private/types';

// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';

export type DropDownMenuItemType = {
    title: string,
    /** The unique value of each item which is used to reference this item */
    value: string,
    icon?: React.ReactNode,
    color?: ColorOptionType
}


type DropDownMenuProps = {
    buttonComponent: React.ReactNode,
    disabled?: boolean,
    items: DropDownMenuItemType[],
    onItemSelect: (value: string) => void,
    className?: string,
    /** @deprecated The positioning of the dropdown is calculated automatically */
    position?: 'left' | 'right'
}


export default function DropDownMenu(props: DropDownMenuProps) {

    let [open, setOpen] = useState<boolean>(false);
    let [top, setTop] = useState<number>(0);
    let [left, setLeft] = useState<number>(0);
    let [bottom, setBottom] = useState<number>(0);
    let [right, setRight] = useState<number>(0);
    let [container,] = useState(useRef<HTMLDivElement>(null));
    let [itemKeyboardFocus, setItemKeyboardFocus] = useState<string>("");
    let itemKeyboardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setOpen(false);
                setItemKeyboardFocus("");
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

    useEffect(() => {
        if (itemKeyboardFocus && itemKeyboardRef.current) {            
            itemKeyboardRef.current.scrollIntoView({block: 'center'});
        }
    }, [itemKeyboardFocus, itemKeyboardRef])


    function handleOpen(e?: React.MouseEvent<HTMLDivElement, MouseEvent>, openedByKeyboard?: boolean) {
        if (!props.disabled) {
            if (e) e.stopPropagation();
            if (!open) {
                let rect = container.current!.getBoundingClientRect();
                let displaySize = { width: window.innerWidth, height: window.innerHeight }
                let r = 0,
                    l = 0,
                    t = 0,
                    b = 0;

                if ((rect.y + 240 + rect.height) > displaySize.height) {
                    b = displaySize.height - rect.y;
                    t = 0;
                } else {
                    t = rect.top + rect.height;
                    b = 0;
                }

                if (props.position === 'right' || (rect.x - (190 - rect.width)) < 190) {
                    l = rect.left;
                    r = 0;
                } else {
                    l = 0;
                    r = displaySize.width - rect.x - rect.width;
                }

                setRight(r);
                setLeft(l);
                setTop(t);
                setBottom(b);
            }
            setOpen(!open);
            if(openedByKeyboard) setItemKeyboardFocus(props.items[0].value);
        }
    };

    function handleSelectItem(item: DropDownMenuItemType | undefined) {
        if (!item) return;
        setOpen(false);
        props.onItemSelect(item.value);
    }

    let className = "vieolo-dropdown-menu";
    if (props.className) className += ` ${props.className}`;
    if (props.disabled) className += " disabled";

    let style: CSSProperties = {}

    if (right !== 0) style.right = right;
    if (left !== 0) style.left = left;
    if (top !== 0) style.top = top;
    if (bottom !== 0) style.bottom = bottom;


    return <div className={className} ref={container as any}>
        <div
            onClick={e => handleOpen(e)}
            tabIndex={0}
            onKeyDown={e => {
                handleOnKeyDown(e, {
                    onEnter: () => {
                        if (!open) handleOpen(undefined, true);
                        else if (itemKeyboardFocus) {
                            handleSelectItem(props.items.find(i => i.value === itemKeyboardFocus));
                            setOpen(false);
                        }
                    },
                    onArrowDown: () => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (open) {
                            let lastIndex = props.items.findIndex(i => i.value === itemKeyboardFocus);
                            if (lastIndex < props.items.length - 1) {
                                setItemKeyboardFocus(props.items[lastIndex + 1].value);
                            }
                        } else {
                            handleOpen(undefined, true);
                        }
                    },
                    onArrowUp: () => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (open) {
                            let lastIndex = props.items.findIndex(i => i.value === itemKeyboardFocus);
                            if (lastIndex > 0) {
                                setItemKeyboardFocus(props.items[lastIndex - 1].value);
                            }
                        } else {
                            handleOpen(undefined, true);
                        }
                    },
                    onEscape: () => {
                        if (open) {
                            setOpen(false);
                            setItemKeyboardFocus("");
                        }
                    },
                    onTab: () => {
                        if (open) {
                            setOpen(false);
                            setItemKeyboardFocus("");
                        }
                    }
                })
            }}
        >
            {props.buttonComponent}
        </div>

        {
            open &&
            <div className={`dropdown`} style={style} >
                {
                    props.items.map((item, i) => {
                        return <DropDownMenuItem
                            key={`${item.value}_${i}`}
                            title={item.title}
                            value={item.value}
                            icon={item.icon}
                            color={item.color}
                            onClick={(v: string) => {
                                setOpen(!open);
                                props.onItemSelect(v);
                            }}
                            onItemSelect={(t: DropDownMenuItemType) => { handleSelectItem(t) }}
                            onKeyboardFocus={itemKeyboardFocus === item.value}
                            itemRef={item.value === itemKeyboardFocus ? itemKeyboardRef : undefined}
                        />
                    })
                }
            </div>
        }
    </div>


}

function DropDownMenuItem(props: { 
    title: string, 
    value: string, 
    onClick: (selectedValue: string) => void,
    onItemSelect: (item: DropDownMenuItemType) => void,
    icon?: React.ReactNode,
    color?: ColorOptionType
    onKeyboardFocus?: boolean
    itemRef?: React.RefObject<HTMLDivElement>
}) {
    let className = ` vieolo-dropdown-menu__dropdown-item color--${props.color || 'primary'}-normal`;
    if (props.onKeyboardFocus) className += ` vieolo-dropdown-menu__dropdown-item--keyboard-focus`;
    
    return <div 
        className={className} 
        onClick={() => { props.onClick(props.value) }}
        aria-label={`${props.title} select item`}
    >
        {
            props.icon &&
            props.icon
        }
        <Typography type='paragraph-small' text={props.title} fontWeight='bold' />
    </div>
}