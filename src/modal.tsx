// React
import React from 'react';


export default class Modal extends React.Component<{onClose: () => void}, {}> {

    container: React.RefObject<unknown>;

    constructor(props: {onClose: () => void}) {
        super(props as any);
        this.container = React.createRef();
    }


    handleClickOutside = (event: any) => {
        if (this.container.current && !(this.container.current as any).contains(event.target)) {
            this.props.onClose();
        }
    };


    componentDidMount() {                
        document.querySelector('main').style.overflow = 'hidden';        
    }

    componentWillUnmount() {
        document.querySelector('main').style.overflow = 'auto';
    }


    render(): JSX.Element {

        return (
            <div className={`vieolo-modal`} onClick={this.handleClickOutside}>
                <div className="modal-content" ref={this.container as any}>{this.props.children}</div>
            </div>
        )
    }
}