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
    selectedItems: string[],
    onSelect: (values: string[]) => void,
    error: boolean,
    clearable?: boolean,
    searchable?: boolean,
    multipleChoice?: boolean
}


export default function Select(props: SelectProps) {

    let [open, setOpen] = useState<boolean>(false);
    // eslint-disable-next-line
    let [container, setContainer] = useState(useRef(null)); 
    let [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setOpen(false);
                setSearchQuery("");
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

    

    function getSelectedItems(values: string[]): SelectItemType[] {
        return props.items.filter(i => values.includes(i.value))
    }



    let thisSelectedItems = getSelectedItems(props.selectedItems);

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
            <div className="select-dropdown">
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