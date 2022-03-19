// React 
import React from 'react';


export default function GridContainer(props: {
    itemDirection?: 'row' | 'column',
    gap?: 'none' | 'half' | 'one' | 'two',
    height?: string,
    children?: React.ReactNode
}) {    

    let style: React.CSSProperties = {};
    let className: string = 'vieolo-grid-container';

    if (props.height) style.height= props.height;

    let gridTemplate = 'repeat(12, 1fr)';
    if (props.itemDirection === 'row') {
        style.gridTemplateRows = gridTemplate
        className += ` row-gap--${props.gap || 'none'}`;
    } else {
        style.gridTemplateColumns = gridTemplate;
        className += ` column-gap--${props.gap || 'none'}`;
    }

    return <div className={className}>
        {props.children}
    </div>
}
