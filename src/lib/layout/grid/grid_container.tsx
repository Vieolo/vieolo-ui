// React 
import React from 'react';


export default function GridContainer(props: {
    itemDirection?: 'row' | 'column',
    rowGap?: 'none' | 'half' | 'one' | 'two',
    columnGap?: 'none' | 'half' | 'one' | 'two',
    height?: string,
    children?: React.ReactNode
}) {    

    let style: React.CSSProperties = {};
    let className: string = 'vieolo-grid-container';

    if (props.height) style.height= props.height;

    let gridTemplate = 'repeat(12, 1fr)';
    if (props.itemDirection === 'row') {
        style.gridTemplateRows = gridTemplate
    } else {
        style.gridTemplateColumns = gridTemplate;
    }
    className += ` row-gap--${props.rowGap || 'none'}`;
    className += ` column-gap--${props.columnGap || 'none'}`;

    return <div className={className} style={style} >
        {props.children}
    </div>
}
