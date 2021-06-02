// React
import React, { Fragment } from 'react';

// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyParagraphSmall from '../typography/typography_paragraph_small';
import TypographyTitleSmall from '../typography/typography_title_small';


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
    error: boolean
}


export default class Select extends React.Component<
    SelectProps,
    {
        open: boolean
    }
> {

    container: React.RefObject<unknown>;

    constructor(props: SelectProps) {
        super(props as any);
        this.state = {
            open: false
        };
        this.container = React.createRef();
    }

    handleButtonClick = () => {
        this.setState(state => {
            return {
                open: !this.state.open
            };
        });
    };

    handleClickOutside = (event: any) => {
        if (this.container.current && !(this.container.current as any).contains(event.target)) {
            this.setState({
                open: false,
            });
        }
    };


    componentDidMount() {
        document.addEventListener("click", this.handleClickOutside);
        let main = document.querySelector('main')
        if (main) main.style.overflow = 'hidden';
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
        let main = document.querySelector('main');
        if (main) main.style.overflow = 'auto';
    }

    getSelectedItem(value: string) : SelectItemType {
        return this.props.items.filter(i => i.value === value)[0]
    }

    //<p className="button-title">{this.props.title}</p>
    //                <p className="button-value">{thisSelectedItem ? thisSelectedItem.title : null}</p>

    render(): React.ReactNode {

        let thisSelectedItem = this.getSelectedItem(this.props.selectedItem);

        return (
            <div className="vieolo-select" ref={this.container as any}>
                <div className={`select-button${this.props.error ? ' select-button-error' : ''}`} onClick={() => {this.setState({open: true})}}>
                    <TypographyParagraphSmall text={this.props.title} className="button-title" />
                    <TypographyTitleSmall text={thisSelectedItem ? thisSelectedItem.title : ""} className="button-value" />
                </div>

                {
                    this.state.open &&
                    <div className="select-dropdown">
                        {
                            this.props.items.map(item => {
                                return <SelectItem 
                                    key={item.title}
                                    item={item}
                                    isSelected={this.props.selectedItem === item.value}
                                    onSelect={(t: SelectItemType) => {
                                        this.setState({
                                            open: false,
                                        })
                                        this.props.onSelect(t.value);
                                    }} 
                                    />
                            })
                        }
                    </div>
                }
            </div>
        )
    }

}


function SelectItem(props: {
    item: SelectItemType, 
    isSelected: boolean, 
    onSelect: (item: SelectItemType) => void    
}) {

    let className= "select-item";

    if (props.isSelected) className += " select-item-selected";
    if (props.item.category) className += " select-item-category";

    return <Fragment>
        {
            props.item.category &&
            <p className="category-name">{props.item.category}</p>
        }
        <div 
            className={className} 
            onClick={() => {props.onSelect(props.item)}}
            > 
            <TypographyParagraphMedium text={props.item.title} />
        </div>
    </Fragment> 

}