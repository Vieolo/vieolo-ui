import { jsx as _jsx } from "react/jsx-runtime";
export default function Flex(props) {
    let c = "flex";
    if (props.direction)
        c += ` flex--direction--${props.direction}`;
    if (props.justifyContent)
        c += ` flex--justify-content--${props.justifyContent}`;
    if (props.alignItems)
        c += ` flex--align-items--${props.alignItems}`;
    if (props.rowGap)
        c += ` row-gap--${props.rowGap}`;
    if (props.columnGap)
        c += ` column-gap--${props.columnGap}`;
    if (props.className)
        c += ` ${props.className}`;
    if (props.wrap)
        c += ` flex--wrap--${props.wrap === 'scroll' ? `scroll-${(props.direction || 'row').includes("row") ? "x" : "y"}` : props.wrap}`;
    return _jsx("div", { className: c, children: props.children });
}
