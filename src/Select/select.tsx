// React
import React, { Fragment, useEffect, useRef, useState, CSSProperties } from 'react';

// Installed Packages
import Device from '@vieolo/device-js';

// Material UI
import DownIcon from '@mui/icons-material/ArrowDropDownRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';

// Vieolo UI
import IconButton from '../IconButton';
import Typography from '../Typography';
import Checkbox from '../CheckBox';

// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';


export type SelectItemType = {
    title: string,
    value: string,
    category?: string,
    subTitle?: string,
    icon?: React.ReactNode,
}

type SelectProps = {
    title?: string,
    placeHolder?: string,
    items: SelectItemType[],
    selectedItems: string[],
    onSelect: (values: string[]) => void,
    error: boolean,
    clearable?: boolean,
    searchable?: boolean,
    multipleChoice?: boolean,
    height?: 'medium' | 'small',
    disabled?: boolean,
    ariaLabel?: string,
    width?: 'small' | 'medium' | 'full'
}


export default function Select(props: SelectProps) {

    let [open, setOpen] = useState<boolean>(false);
    let [top, setTop] = useState<number>(0);
    let [left, setLeft] = useState<number>(0);
    let [bottom, setBottom] = useState<number>(0);
    let [right, setRight] = useState<number>(0);
    let [width, setWidth] = useState<number>(160);
    let [virtKeyboardOffset, setVirtKeyboardOffset] = useState<number>(0);
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef<HTMLDivElement>(null));
    let [searchQuery, setSearchQuery] = useState("");
    let [itemKeyboardFocus, setItemKeyboardFocus] = useState<string>("");
    let itemKeyboardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setOpen(false);
                setSearchQuery("");
                setItemKeyboardFocus("");
            }
        }

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [container])

    useEffect(() => {
        const handleVirtualKeyboard = (event: Event) => {
            const viewport = window.visualViewport!;
            setVirtKeyboardOffset(window.innerHeight - viewport.height)
        }

        if (open && Device.isTouchOnlyDevice && window.visualViewport) {
            window.visualViewport.addEventListener("resize", handleVirtualKeyboard);
            window.visualViewport.addEventListener("scroll", handleVirtualKeyboard);
        } else if (!open && Device.isTouchOnlyDevice && window.visualViewport) {
            window.visualViewport.removeEventListener("resize", handleVirtualKeyboard);
            window.visualViewport.removeEventListener("scroll", handleVirtualKeyboard);
            setVirtKeyboardOffset(0)
        }
        return () => {
            if (open && Device.isTouchOnlyDevice && window.visualViewport) {
                window.visualViewport.removeEventListener("resize", handleVirtualKeyboard);
                window.visualViewport.removeEventListener("scroll", handleVirtualKeyboard);
            }
        }
    }, [open])

    useEffect(() => {
        let main = document.querySelector('main')
        if (main) {
            if (open) main.style.overflow = 'hidden';
            else main.style.removeProperty("overflow");
        }
    }, [open]);

    useEffect(() => {
        if (itemKeyboardFocus && itemKeyboardRef.current) {
            itemKeyboardRef.current.scrollIntoView({ block: 'center' });
        }
    }, [itemKeyboardFocus, itemKeyboardRef])



    function getSelectedItems(values: string[]): SelectItemType[] {
        return props.items.filter(i => values.includes(i.value))
    }

    function handleOpen(e?: React.MouseEvent<HTMLDivElement, MouseEvent>, openedByKeyboard?: boolean) {
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

            if ((rect.x - (160 - rect.width)) < 160) {
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
            setWidth(rect.width)
        }
        setOpen(true);
        setSearchQuery("");
        if (openedByKeyboard) setItemKeyboardFocus(props.selectedItems[0]);
    }

    function handleSelectItem(item: SelectItemType | undefined) {
        if (!item) return;
        if (props.multipleChoice) {
            let newSelected = [...props.selectedItems];
            if (props.selectedItems.includes(item.value)) newSelected = newSelected.filter(f => f !== item.value);
            else newSelected.push(item.value);
            props.onSelect(newSelected);
        } else {
            setOpen(false);
            setSearchQuery("");
            props.onSelect([item.value]);
        }
    }

    let thisSelectedItems = getSelectedItems(props.selectedItems);

    let style: CSSProperties = {}

    if (!Device.isTouchOnlyDevice) {
        if (right !== 0) style.right = right;
        if (left !== 0) style.left = left;
        if (top !== 0) style.top = top;
        if (bottom !== 0) style.bottom = bottom;
        if (width !== 0) style.width = Math.max(width, 160)
    }

    // On Android devices, virtualKeyboardOffset is sometimes a negative value instead of 0
    // So, it should be explicitly checked to be greater than 0
    if (virtKeyboardOffset > 0) {
        style.maxHeight = '25vh'
    }

    let items: React.ReactNode[] = [];
    let filtered = props.items.filter(item => (!searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase())));

    for (let i = 0; i < filtered.length; i++) {
        const item = filtered[i];
        const prev = i > 0 ? filtered[i - 1] : undefined

        items.push(<SelectItem
            key={item.value}
            item={item}
            isSelected={props.selectedItems.includes(item.value)}
            previousItem={prev}
            onKeyboardFocus={itemKeyboardFocus === item.value}
            onSelect={(t: SelectItemType) => handleSelectItem(t)}
            itemRef={item.value === itemKeyboardFocus ? itemKeyboardRef : undefined}
            multipleChoice={props.multipleChoice}
        />)
    }

    const itemsComponent = <div className="vieolo-select__select-dropdown" style={style} role="list" >
        {items}
    </div>

    let height = 'small';

    if (props.height) height = props.height
    else if (props.title) height = 'medium'

    let className = `vieolo-select vieolo-select--${props.width || 'medium'}`;

    if (props.searchable) {
        className += " vieolo-select--searchable"
    }

    if (props.disabled) {
        className += " disabled"
    }

    let searchInput = <input
        autoFocus
        value={searchQuery}
        onChange={e => setSearchQuery(e.target.value)}
        placeholder="Search..."
        aria-label={props.ariaLabel ? (props.ariaLabel + " items") : `Search ${props.title} items`}
    />

    return <div className={className} ref={container as any}>
        <div
            className={`vieolo-select__select-button${props.error ? ' vieolo-select__select-button--error' : ''} vieolo-select__select-button--${height}`}
            onClick={e => handleOpen(e)}
            tabIndex={0}
            role="button"
            aria-label={props.ariaLabel || `Select ${props.title}`}
            onKeyDown={e => {
                if (props.disabled) return
                handleOnKeyDown(e, {
                    onEnter: (k) => {
                        if (!open) {
                            e.stopPropagation();
                            e.preventDefault();
                            handleOpen(undefined, true);
                        } else if (itemKeyboardFocus) {
                            if (!(props.searchable && itemKeyboardFocus && k === 'Space')) {
                                handleSelectItem(filtered.find(f => f.value === itemKeyboardFocus))
                            } 
                        }
                    },
                    onAlphaNumeric: () => {
                        if (!open) {
                            e.stopPropagation();
                            e.preventDefault();
                            handleOpen(undefined, true);
                            setSearchQuery(e.key)
                        }
                    },
                    onArrowDown: () => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (open) {
                            if (itemKeyboardFocus) {
                                let lastIndex = filtered.map(f => f.value).indexOf(itemKeyboardFocus);
                                if (lastIndex < filtered.length - 1) setItemKeyboardFocus(filtered[lastIndex + 1].value);
                            }
                            else {
                                setItemKeyboardFocus(filtered[0].value);
                            }
                        }
                        else {
                            handleOpen(undefined, true);
                        }
                    },
                    onArrowUp: () => {
                        e.stopPropagation();
                        e.preventDefault();
                        if (open) {
                            if (itemKeyboardFocus) {
                                let lastIndex = filtered.map(f => f.value).indexOf(itemKeyboardFocus);
                                if (lastIndex > 0) setItemKeyboardFocus(filtered[lastIndex - 1].value);
                            }
                        }
                    },
                    onEscape: () => {
                        setOpen(false);
                        setSearchQuery("");
                        setItemKeyboardFocus("");
                    },
                    onBackspace: () => {
                        if (!open && props.clearable) {
                            props.onSelect([])
                        }
                    },
                    onTab: () => {
                        if (open) {
                            setOpen(false);
                            setSearchQuery("");
                            setItemKeyboardFocus("");
                        }
                    }
                })
            }}
        >
            <div className="vieolo-select__select-button__button-text" onClick={e => {
                e.stopPropagation();
                handleOpen(e);
            }}>
                {
                    props.title &&
                    <Typography type='caption-large' text={props.title} className="vieolo-select__select-button__button-text__button-title" />
                }
                {
                    (!props.title && props.placeHolder && (!props.selectedItems || props.selectedItems.length === 0)) &&
                    <Typography type='caption-large' text={props.placeHolder} className="vieolo-select__select-button__button-text__button-title" />
                }
                {
                    (props.searchable && open && !Device.isTouchOnlyDevice)
                        ? searchInput
                        : <Typography 
                            type='paragraph-small' 
                            text={thisSelectedItems.map(s => s.title).join(", ")} 
                            className="vieolo-select__select-button__button-text__button-value" 
                            fontWeight='bold' 
                            showTitle
                        />
                }
            </div>

            {
                (!props.clearable || (props.clearable && (!props.selectedItems || props.selectedItems.length === 0)))
                    ? <DownIcon />
                    : <IconButton
                        icon={<CloseIcon />}
                        onClick={e => {
                            e.stopPropagation();
                            props.onSelect([])
                        }}
                        color="error"
                        size="extra-small"
                    />
            }

        </div>
        {
            open && (Device.isTouchOnlyDevice ?
                <>
                    <div
                        className="vieolo-select__backdrop"
                        onClick={(e) => {
                            e.stopPropagation();
                            setOpen(!open)
                        }}
                    >
                    </div>

                    <div className={`vieolo-select__modal`} style={virtKeyboardOffset > 0 ? { bottom: (virtKeyboardOffset) + "px", maxHeight: '35vh' } : undefined}>
                        {props.searchable && searchInput}
                        <div className='vieolo-select__modal__container'>
                            {itemsComponent}
                        </div>
                    </div>
                </>
                : itemsComponent
            )
        }
    </div>


}


function SelectItem(props: {
    item: SelectItemType,
    isSelected: boolean,
    onSelect: (item: SelectItemType) => void,
    previousItem?: SelectItemType,
    onKeyboardFocus: boolean,
    itemRef?: React.RefObject<HTMLDivElement>,
    multipleChoice?: boolean,
}) {

    let className = "vieolo-select__select-item";

    if (props.isSelected && !props.multipleChoice) className += " vieolo-select__select-item--selected";
    if (props.item.category) className += " vieolo-select__select-item--category";
    if (props.item.subTitle) className += " vieolo-select__select-item--subtitle";
    if (props.onKeyboardFocus) className += " vieolo-select__select-item--keyboard-focus";

    return <Fragment>
        {
            (props.item.category && (!props.previousItem || props.item.category !== props.previousItem.category)) &&
            <p className="vieolo-select__select-item__category-name">{props.item.category}</p>
        }
        <div
            className={className}
            onClick={e => {
                e.stopPropagation();
                props.onSelect(props.item)
            }}
            ref={props.itemRef}
            role="listitem"
            aria-label={props.item.title}
        >
            {
                props.multipleChoice &&
                <Checkbox 
                    onChange={() => {}}
                    value={props.isSelected}
                    removeTabIndex
                />
            }
            {
                props.item.icon && props.item.icon
            }
            <div className='vieolo-select__select-item__text-container'>
                <Typography text={props.item.title} />
                {
                    props.item.subTitle &&
                    <Typography type='caption-medium' text={props.item.subTitle} />
                }
            </div>
        </div>
    </Fragment>

}