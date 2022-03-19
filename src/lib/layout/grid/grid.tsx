export default function Grid(props: {
    className?: string,
    columnGap?: 'half' | 'one' | 'two',
    rowGap?: 'half' | 'one' | 'two',
    /**
     * Sets the columns of the grid for some of the most used formats
     * Passing this value will cause the component to ignore `templateColumn`
     */
    preDefined?: 'one-one' | 'one-one-two' | 'two-one-one' | 'one-one-one-one' | 'three-one' | 'one-three',
    templateColumn?: string,
    templateRow?: string,
    style?: React.CSSProperties,
    children?: React.ReactNode[]
}) {
    let pd = props.preDefined ? props.preDefined : props.templateColumn ? null : 'one-one';

    let style: React.CSSProperties = props.style || {}; 

    if (!props.preDefined && props.templateColumn) {
        style.gridTemplateColumns = props.templateColumn;
    }

    if (props.templateRow) {
        style.gridTemplateRows = props.templateRow;
    }


    let c = `grid ${pd ? 'grid--' + pd : ''} ${props.columnGap ? 'grid--column-gap-' + props.columnGap : ''} ${props.rowGap ? 'grid--row-gap-' + props.rowGap : ''} ${props.className || ''}`;

    return <div className={c} style={style}>
        {props.children}
    </div>
}