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
    return _jsx("div", Object.assign({ className: c }, { children: props.children }), void 0);
}
