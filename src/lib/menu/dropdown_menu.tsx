// React
import React, { useState, useRef, useEffect } from 'react';

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
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef(null));

    const [left, setLeft] = useState <number> ();

    const [bottom, setBottom] = useState <number> ();

    const [elementWidth, setElementWidth] = useState <number> ();

    const [styles, setStyles] = useState({})

    const {innerWidth: width, innerHeight: height} = window;
    const halfWidthScreen = width / 2;

    useEffect (() => {

        console.log(left, bottom, elementWidth, halfWidthScreen)

        if (left && elementWidth) {
            const centerOfElement = left + elementWidth / 2
            if (centerOfElement <= halfWidthScreen) {
                setStyles({
                    left: `${left}px`,
                    top: `${bottom}px`,
                    width: `${elementWidth}px`
                })
            } else if (centerOfElement >= halfWidthScreen) {
                setStyles({
                    right: `${width - (left + elementWidth)}px`,
                    top: `${bottom}px`,
                    width: `${elementWidth}px`
                })
            }
        }
    }, [left, bottom, elementWidth, halfWidthScreen, width])

    useEffect(() => {
        const handleScroll = () => {
            setOpen(false)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

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
        if (!props.disabled) setOpen(!open);        
    };

    let className = "vieolo-dropdown-menu";
    if (props.className) className += ` ${props.className}`;
    if (props.disabled) className += " disabled";

    return <div className={className} ref={container as any}>
        <div ref={(el) => {
        if(!el) return;
        setLeft(el.getBoundingClientRect().left)
        setBottom(el.getBoundingClientRect().bottom)
        setElementWidth(el.getBoundingClientRect().width)}} 
            onClick={() => handleButtonClick()}
        >
            {props.buttonComponent}
        </div>

        {
            open &&
            <div className={`dropdown dropdown--${props.position || 'left'}`} style={styles}>
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

/*
const [left, setLeft] = useState <number> ();

    const [bottom, setBottom] = useState <number> ();

    const [elementWidth, setElementWidth] = useState <number> ();

    const [styles, setStyles] = useState({})

    const {innerWidth: width, innerHeight: height} = window;
    const halfWidthScreen = width / 2;

    useEffect (() => {

        console.log(left, bottom, elementWidth, halfWidthScreen)

        if (left && elementWidth) {
            const centerOfElement = left + elementWidth / 2
            if (centerOfElement <= halfWidthScreen) {
                setStyles({
                    left: `${left}px`,
                    top: `${bottom}px`
                })
            } else if (centerOfElement >= halfWidthScreen) {
                setStyles({
                    right: `${width - (left + elementWidth)}px`,
                    top: `${bottom}px`
                })
            }
        }
    }, [left, bottom, elementWidth, halfWidthScreen, width])

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setOpen(false);
                setSearchQuery("");
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

    function getSelectedItems(values: string[]): SelectItemType[] {
        return props.items.filter(i => values.includes(i.value))
    }

        useEffect(() => {
        const handleScroll = () => {
            setOpen(false)
        }
        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [])

    let thisSelectedItems = getSelectedItems(props.selectedItems);

    return <div className="vieolo-select" ref={container as any}>
        <div ref={(el) => {
        if(!el) return;
        console.log(el.getBoundingClientRect())
        setLeft(el.getBoundingClientRect().left)
        setBottom(el.getBoundingClientRect().bottom)
        setElementWidth(el.getBoundingClientRect().width)}} className={`select-button${props.error ? ' select-button-error' : ''}`} onClick={(e) => {
            setOpen(true);
            setSearchQuery("");
        }}>
            <div className="button-text">
                <TypographyParagraphSmall text={props.title} className="button-title" />
                {
                    (props.searchable && open)
                    ? <input
                        autoFocus
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                    />
                    : <TypographyTitleSmall text={thisSelectedItems.map(s => s.title).join(", ")} className="button-value" />
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
            <div className="select-dropdown" style={styles}>
                {
                    props.items.filter(item => (!searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase()))).map(item => {
                        return <SelectItem
                            key={item.title}
                            item={item}
                            isSelected={props.selectedItems.includes(item.value)}
                            onSelect={(t: SelectItemType) => {
                                if (props.multipleChoice) {
                                    let newSelected = [...props.selectedItems];
                                    if (props.selectedItems.includes(item.value)) newSelected = newSelected.filter(f => f !== item.value);
                                    else newSelected.push(item.value);
                                    props.onSelect(newSelected);
                                }else {
                                    setOpen(false);
                                    setSearchQuery("");
                                    props.onSelect([t.value]);
                                }
                            }}
                        />
                    })
                }
            </div>
        }
    </div>


}


function SelectItem(props: {
    item: SelectItemType,
    isSelected: boolean,
    onSelect: (item: SelectItemType) => void
}) {

    let className = "select-item";

    if (props.isSelected) className += " select-item-selected";
    if (props.item.category) className += " select-item-category";

    return <Fragment>
        {
            props.item.category &&
            <p className="category-name">{props.item.category}</p>
        }
        <div
            className={className}
            onClick={() => { props.onSelect(props.item) }}
        >
            <TypographyParagraphMedium text={props.item.title} />
        </div>
    </Fragment>

}

*/