import { jsx as _jsx } from "react/jsx-runtime";
export default function Grid(props) {
    let pd = props.preDefined ? props.preDefined : props.templateColumn ? null : 'one-one';
    let style = props.style || {};
    if (!props.preDefined && props.templateColumn) {
        style.gridTemplateColumns = props.templateColumn;
    }
    if (props.templateRow) {
        style.gridTemplateRows = props.templateRow;
    }
    let c = `grid ${pd ? 'grid--' + pd : ''} ${props.columnGap ? 'grid--column-gap-' + props.columnGap : ''} ${props.rowGap ? 'grid--row-gap-' + props.rowGap : ''} ${props.className || ''}`;
    return _jsx("div", Object.assign({ className: c, style: style }, { children: props.children }), void 0);
}
