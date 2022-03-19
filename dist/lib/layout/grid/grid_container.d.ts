import React from 'react';
export default function GridContainer(props: {
    itemDirection?: 'row' | 'column';
    rowGap?: 'none' | 'half' | 'one' | 'two';
    columnGap?: 'none' | 'half' | 'one' | 'two';
    height?: string;
    children?: React.ReactNode;
}): JSX.Element;
