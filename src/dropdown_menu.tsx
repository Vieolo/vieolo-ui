// React
import React from 'react';


type DropDownMenuProps = {
    buttonComponent: React.ReactNode,
    disabled?: boolean,
    items: { title: string, icon?: React.ReactNode }[],
    onItemSelec: (title: string) => void,
    className?: string
}


export default class DropDownMenu extends React.Component<
    DropDownMenuProps,
    {
        open: boolean
    }
    > {

    container: React.RefObject<unknown>;

    constructor(props: DropDownMenuProps) {
        super(props as any);
        this.state = {
            open: false,
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
    }
    componentWillUnmount() {
        document.removeEventListener("click", this.handleClickOutside);
    }


    render(): JSX.Element {

        return (
            <div className={`vieolo-dropdown-menu ${this.props.className || ''}`} ref={this.container as any}>
                <div onClick={() => this.handleButtonClick()}>
                    {this.props.buttonComponent}
                </div>

                {
                    this.state.open &&
                    <div className="dropdown">
                        {
                            this.props.items.map(item => {
                                return <DropDownMenuItem title={item.title} icon={item.icon} onClick={(t: string) => {
                                    this.setState({
                                        open: false,
                                    })
                                    this.props.onItemSelec(t);
                                }} />
                            })
                        }
                    </div>
                }
            </div>
        )
    }
}


function DropDownMenuItem(props: {title: string, onClick: (selectedTitle: string) => void, icon?: React.ReactNode}) {
    
    return <div className="dropdown-item" onClick={() => {props.onClick(props.title)}}>
        {
            props.icon &&
            props.icon
        }
        {props.title}
    </div>
}