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
    disabled?: boolean,
    ariaLabel?: string,
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


    return <div ref={container} className="vieolo-context-menu" style={{ top: top, left: left }}>
        {
            props.items.map(i => {
                return <div
                    key={i.title}
                    aria-label={`Context Menu ${i.ariaLabel || i.title}`}
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
