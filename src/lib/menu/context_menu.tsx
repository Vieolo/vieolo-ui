// React
import React, { Fragment, ReactNode, useState, useEffect, useRef } from 'react';

// Hooks
import { useAppearingContainer } from '../../hooks/useAppearingContainer';
import { ColorOptionType } from '../private/types';

export type ContextMenuItem = {
    title: string,
    icon?: ReactNode,
    color?: ColorOptionType
    onClick: (v: string) => void,
    disabled?: boolean
}


export default function ContextMenu(props: {
    items: ContextMenuItem[],
    position: { x: number, y: number },
    onClose: () => void
}) {

    let [top, setTop] = useState<string>('');
    let [left, setLeft] = useState<string>('');

    let container = useRef<HTMLDivElement>(null);

    useAppearingContainer(container, true, props.onClose, () => {
        props.onClose();
    });

    useEffect(() => {
        const clickX = props.position.x;
        const clickY = props.position.y;
        const screenW = window.innerWidth;
        const screenH = window.innerHeight;
        const rootW = container.current!.offsetWidth;
        const rootH = container.current!.offsetHeight;

        const right = (screenW - clickX) > rootW;
        const left = !right;
        const top = (screenH - clickY) > rootH;
        const bottom = !top;

        if (right) {
            setLeft(`${clickX + 5}px`);
        }

        if (left) {
            setLeft(`${clickX - rootW - 5}px`);
        }

        if (top) {
            setTop(`${clickY + 5}px`);
        }

        if (bottom) {
            setTop(`${clickY - rootH - 5}px`)
        }
    }, [container, props.position]);

    // function handleScroll(event: any) {
    //     props.onClose();
    // }

    // function prepareContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //     const clickX = e.pageX;
    //     const clickY = e.pageY;
    //     const screenW = window.innerWidth;
    //     const screenH = window.innerHeight;
    //     const rootW = this.container.current.offsetWidth;
    //     const rootH = this.container.current.offsetHeight;

    //     const right = (screenW - clickX) > rootW;
    //     const left = !right;
    //     const top = (screenH - clickY) > rootH;
    //     const bottom = !top;


    //     if (right) {
    //         setLeft(`${clickX + 5}px`);
    //     }

    //     if (left) {
    //         setLeft(`${clickX - rootW - 5}px`);
    //     }

    //     if (top) {
    //         setTop(`${clickY + 5}px`);
    //     }

    //     if (bottom) {
    //         setTop(`${clickY - rootH - 5}px`);
    //     }
    // }


    return <div ref={container} className="vieolo-context-menu" style={{ top: top, left: left }}>
        {
            props.items.map(i => {
                return <div
                    key={i.title}
                    className={`vieolo-context-menu__menu-row vieolo-context-menu__menu-row-${i.color || 'primary'} ${i.disabled ? ' disabled' : ''}`}
                    onClick={() => { i.onClick(i.title); props.onClose(); }}
                >
                    {
                        i.icon &&
                        <Fragment>
                            {i.icon}
                        </Fragment>
                    }
                    <p>{i.title}</p>
                </div>
            })
        }
    </div>

}


// export class ContextMenux extends React.Component<
//     ContextMenuProps,
//     {
//         top: string,
//         left: string
//     }
// > {

//     container: React.RefObject<HTMLDivElement>;

//     constructor(props: ContextMenu) {
//         super(props as any);
//         this.container = React.createRef();
//         this.state = {
//             top: '',
//             left: ''
//         }
//     }

//     componentDidMount() {
//         document.addEventListener("click", this.handleClickOutside);
//         document.querySelector('main').style.overflow = 'hidden';
//         document.addEventListener('contextmenu', this.handleClickOutside)

//         const clickX = this.props.position.x;
//         const clickY = this.props.position.y;
//         const screenW = window.innerWidth;
//         const screenH = window.innerHeight;
//         const rootW = this.container.current.offsetWidth;
//         const rootH = this.container.current.offsetHeight;

//         const right = (screenW - clickX) > rootW;
//         const left = !right;
//         const top = (screenH - clickY) > rootH;
//         const bottom = !top;


//         if (right) {
//             this.setState({
//                 left: `${clickX + 5}px`
//             })

//         }

//         if (left) {
//             this.setState({
//                 left: `${clickX - rootW - 5}px`
//             })
//         }

//         if (top) {
//             this.setState({
//                 top: `${clickY + 5}px`
//             })
//         }

//         if (bottom) {
//             this.setState({
//                 top: `${clickY - rootH - 5}px`
//             })
//         }
//     };

//     componentWillUnmount() {
//         document.removeEventListener('click', this.handleClickOutside);
//         document.removeEventListener('contextmenu', this.handleClickOutside)
//         document.querySelector('main').style.overflow = 'auto';
//     }

//     handleClickOutside = (event: any) => {
//         if (this.container.current && !(this.container.current as any).contains(event.target)) {
//             this.props.onClose();
//         }
//     };

//     handleScroll = (event: any) => {
//         this.props.onClose();
//     }


//     prepareContextMenu(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
//         const clickX = e.pageX;
//         const clickY = e.pageY;
//         const screenW = window.innerWidth;
//         const screenH = window.innerHeight;
//         const rootW = this.container.current.offsetWidth;
//         const rootH = this.container.current.offsetHeight;

//         const right = (screenW - clickX) > rootW;
//         const left = !right;
//         const top = (screenH - clickY) > rootH;
//         const bottom = !top;


//         if (right) {
//             this.setState({
//                 left: `${clickX + 5}px`
//             })

//         }

//         if (left) {
//             this.setState({
//                 left: `${clickX - rootW - 5}px`
//             })
//         }

//         if (top) {
//             this.setState({
//                 top: `${clickY + 5}px`
//             })
//         }

//         if (bottom) {
//             this.setState({
//                 top: `${clickY - rootH - 5}px`
//             })
//         }
//     }


//     render() {
//         return <div ref={this.container} className="context-menu" style={{ top: this.state.top, left: this.state.left }}>
//             {
//                 this.props.items.map(i => {
//                     return <div
//                         key={i.title}
//                         className={`context-menu-row context-menu-row-${i.color || 'primary'} ${i.disabled ? ' disabled' : ''}`}
//                         onClick={() => { i.onClick(i.title); this.props.onClose(); }}
//                     >
//                         {
//                             i.icon &&
//                             <Fragment>
//                                 {i.icon}
//                             </Fragment>
//                         }
//                         <p>{i.title}</p>
//                     </div>
//                 })
//             }
//         </div>
//     };
// }