type GridSpanType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export default function Grid(props: {
    xl: GridSpanType,
    lg?: GridSpanType,
    md?: GridSpanType,
    sm?: GridSpanType,
    direction?: 'row' | 'column',
    children?: React.ReactNode
}) {    

    let d = props.direction || 'column';
    let c = `vieolo-grid grid-${d}--xl--${props.xl}`;
    
    if (props.lg) c += ` grid-${d}--ld--${props.lg}`;
    if (props.md) c += ` grid-${d}--md--${props.md}`;
    if (props.sm) c += ` grid-${d}--sm--${props.sm}`;

    return <div className={c}>
        {props.children}
    </div>
}