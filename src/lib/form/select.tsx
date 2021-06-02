// React
import React, { Fragment, useEffect, useRef, useState } from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyTitleSmall from '../typography/typography_title_small';

// Material UI
import DownIcon from '@material-ui/icons/ArrowDropDownRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';

// Components
import IconButton from '../button/icon_button';


type SelectItemType = {
    title: string,
    value: string,
    category?: string
}

type SelectProps = {
    title: string,
    items: SelectItemType[],
    selectedItem: string,
    onSelect: (value: string) => void,
    error: boolean,
    clearable?: boolean,
    searchable?: boolean
}


export default function Select(props: SelectProps) {

    let [open, setOpen] = useState<boolean>(false);
    let [container, setContainer] = useState(useRef(null));
    let [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        let main = document.querySelector('main')
        if (main) main.style.overflow = 'hidden';

        return () => {
            document.removeEventListener("click", handleClickOutside);
            let main = document.querySelector('main');
            if (main) main.style.overflow = 'auto';
        }
    }, [])


    function handleClickOutside(event: any) {
        if (container.current && !(container.current as any).contains(event.target)) {
            setOpen(false);
            setSearchQuery("");
        }
    };

    function getSelectedItem(value: string): SelectItemType {
        return props.items.filter(i => i.value === value)[0]
    }



    let thisSelectedItem = getSelectedItem(props.selectedItem);

    return <div className="vieolo-select" ref={container as any}>
        <div className={`select-button${props.error ? ' select-button-error' : ''}`} onClick={() => {
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
                    : <TypographyTitleSmall text={thisSelectedItem ? thisSelectedItem.title : ""} className="button-value" />
                }                
            </div>

            {
                (!props.clearable || (props.clearable && (!props.selectedItem || !props.selectedItem.trim())))
                ? <DownIcon />
                : <IconButton 
                    icon={<CloseIcon />}
                    onClick={() => props.onSelect("")}
                    color="error"
                    size="small"
                />
            }
            
        </div>

        {
            open &&
            <div className="select-dropdown">
                {
                    props.items.filter(item => (!searchQuery.trim() || item.title.toLowerCase().includes(searchQuery.toLowerCase()))).map(item => {
                        return <SelectItem
                            key={item.title}
                            item={item}
                            isSelected={props.selectedItem === item.value}
                            onSelect={(t: SelectItemType) => {
                                setOpen(false);
                                setSearchQuery("");
                                props.onSelect(t.value);
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