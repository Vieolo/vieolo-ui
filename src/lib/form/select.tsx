// React
import React, { Fragment, useEffect, useRef, useState, CSSProperties } from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyTitleSmall from '../typography/typography_title_small';

// Material UI
import DownIcon from '@mui/icons-material/ArrowDropDownRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';

// Components
import IconButton from '../button/icon_button';
import { TypographyCaptionMedium } from '../typography';


type SelectItemType = {
    title: string,
    value: string,
    category?: string,
    subTitle?: string,
}

type SelectProps = {
    title: string,
    items: SelectItemType[],
    selectedItems: string[],
    onSelect: (values: string[]) => void,
    error: boolean,
    clearable?: boolean,
    searchable?: boolean,
    multipleChoice?: boolean,
    height?: 'medium' | 'small'
}


export default function Select(props: SelectProps) {

    let [open, setOpen] = useState<boolean>(false);
    let [top, setTop] = useState<number>(0);
    let [left, setLeft] = useState<number>(0);
    let [bottom, setBottom] = useState<number>(0);
    let [right, setRight] = useState<number>(0);
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
        let main = document.querySelector('main')
        if (main) {
            if (open) main.style.overflow = 'hidden';
            else main.style.removeProperty("overflow");
        }
    }, [open]);

    useEffect(() => {
        if (itemKeyboardFocus && itemKeyboardRef.current) {            
            itemKeyboardRef.current.scrollIntoView({block: 'center'});
        }
    }, [itemKeyboardFocus, itemKeyboardRef])



    function getSelectedItems(values: string[]): SelectItemType[] {
        return props.items.filter(i => values.includes(i.value))
    }

    function handleOpen(openedByKeyboard?: boolean) {
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

    if (right !== 0) style.right = right;
    if (left !== 0) style.left = left;
    if (top !== 0) style.top = top;
    if (bottom !== 0) style.bottom = bottom;

    let items: React.ReactNode[] = [];
    let filtered = props.items.filter(item => (!searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase())));

    for (let i = 0; i < filtered.length; i++) {
        const item = filtered[i];
        const prev = i > 0 ? filtered[i - 1] : undefined

        items.push(<SelectItem
            key={item.title}
            item={item}
            isSelected={props.selectedItems.includes(item.value)}
            previousItem={prev}
            onKeyboardFocus={itemKeyboardFocus === item.value}
            onSelect={(t: SelectItemType) => handleSelectItem(t)}
            itemRef={item.value === itemKeyboardFocus ? itemKeyboardRef : undefined}
        />)
    }

    return <div className="vieolo-select" ref={container as any}>
        <div
            className={`vieolo-select__select-button${props.error ? ' vieolo-select__select-button--error' : ''} vieolo-select__select-button--${props.height || 'medium'}`}
            onClick={() => handleOpen()}
            tabIndex={0}
            onKeyDown={e => {
                if (e.code === "Enter" || e.code === "Space") {
                    if (!open) handleOpen(true);
                    else if (itemKeyboardFocus) {
                        handleSelectItem(filtered.find(f => f.value === itemKeyboardFocus))
                    }
                } else if (e.code === "ArrowDown" && !open) {
                    e.stopPropagation();
                    e.preventDefault();
                    handleOpen(true);
                }else if (e.code === "ArrowDown" && open) {
                    if (!itemKeyboardFocus) setItemKeyboardFocus(filtered[0].value)
                    else {
                        let lastIndex = filtered.map(f => f.value).indexOf(itemKeyboardFocus);
                        if ((lastIndex + 1) < filtered.length) setItemKeyboardFocus(filtered[lastIndex + 1].value)
                    }
                    e.stopPropagation()
                    e.preventDefault();
                } else if (e.code === "ArrowUp" && open) {
                    if (itemKeyboardFocus) {
                        e.stopPropagation();
                        e.preventDefault();
                        let lastIndex = filtered.map(f => f.value).indexOf(itemKeyboardFocus);
                        if (lastIndex > 0) setItemKeyboardFocus(filtered[lastIndex - 1].value)
                    }
                } else if (e.code === "Escape" && open) {
                    setOpen(false);
                    setSearchQuery("");
                    setItemKeyboardFocus("");
                } else if (e.code === "Backspace" && !open && props.clearable) {
                    props.onSelect([]);
                } else if (e.code === "Tab" && open) {
                    setOpen(false);
                    setSearchQuery("");
                    setItemKeyboardFocus("");
                }
            }}
        >
            <div className="vieolo-select__select-button__button-text" onClick={e => {
                e.stopPropagation();
                handleOpen();
            }}>
                <TypographyParagraphSmall text={props.title} className="vieolo-select__select-button__button-text__button-title" />
                {
                    (props.searchable && open)
                        ? <input
                            autoFocus
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                        />
                        : <TypographyTitleSmall text={thisSelectedItems.map(s => s.title).join(", ")} className="vieolo-select__select-button__button-text__button-value" />
                }
            </div>

            {
                (!props.clearable || (props.clearable && (!props.selectedItems || props.selectedItems.length === 0)))
                    ? <DownIcon />
                    : <IconButton
                        icon={<CloseIcon />}
                        onClick={() => props.onSelect([])}
                        color="error"
                        size="small"
                    />
            }

        </div>

        {
            open &&
            <div className="vieolo-select__select-dropdown" style={style}>
                {items}
            </div>
        }
    </div>


}


function SelectItem(props: {
    item: SelectItemType,
    isSelected: boolean,
    onSelect: (item: SelectItemType) => void,
    previousItem?: SelectItemType,
    onKeyboardFocus: boolean,
    itemRef?: React.RefObject<HTMLDivElement>
}) {

    let className = "vieolo-select__select-item";

    if (props.isSelected) className += " vieolo-select__select-item--selected";
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
            onClick={() => { props.onSelect(props.item) }}
            ref={props.itemRef}
        >
            <TypographyParagraphMedium text={props.item.title} />
            {
                props.item.subTitle &&
                <TypographyCaptionMedium text={props.item.subTitle} />
            }
        </div>
    </Fragment>

}