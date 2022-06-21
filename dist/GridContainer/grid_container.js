import { jsx as _jsx } from "react/jsx-runtime";
export default function GridContainer(props) {
    let style = props.style || {};
    let className = 'vieolo-grid-container';
    if (props.className)
        className += ` ${props.className}`;
    if (props.height)
        style.height = props.height;
    let gridTemplate = 'repeat(12, 1fr)';
    if (props.itemDirection === 'row') {
        style.gridTemplateRows = gridTemplate;
    }
    else {
        style.gridTemplateColumns = gridTemplate;
    }
    className += ` row-gap--${props.rowGap || 'none'}`;
    className += ` column-gap--${props.columnGap || 'none'}`;
    return _jsx("div", Object.assign({ className: className, style: style }, { children: props.children }), void 0);
}
