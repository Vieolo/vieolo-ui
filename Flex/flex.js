import { jsx as _jsx } from "react/jsx-runtime";
export default function Flex(props) {
    let c = "flex";
    // Default classes
    c += getFlexClass(props, 'xl');
    // Size classes
    let sizes = [props.lg, props.md, props.sm];
    for (let i = 0; i < sizes.length; i++) {
        const s = sizes[i];
        if (s !== undefined) {
            c += getFlexClass(s, i === 0 ? 'lg' : i === 1 ? 'md' : 'sm');
        }
    }
    if (props.className)
        c += ` ${props.className}`;
    return _jsx("div", { className: c, children: props.children });
}
function getFlexClass(props, size) {
    let c = "";
    let sizeState = size === 'xl' ? '' : `--${size}`;
    // Flex classes
    if (props.direction)
        c += ` flex--direction--${props.direction}${sizeState}`;
    if (props.justifyContent)
        c += ` flex--justify-content--${props.justifyContent}${sizeState}`;
    if (props.alignItems)
        c += ` flex--align-items--${props.alignItems}${sizeState}`;
    if (props.wrap)
        c += ` flex--wrap--${props.wrap === 'scroll' ? `scroll-${(props.direction || 'row').includes("row") ? "x" : "y"}` : props.wrap}${sizeState}`;
    // Gap casses
    if (props.rowGap)
        c += ` row-gap--${props.rowGap}${sizeState}`;
    if (props.columnGap)
        c += ` column-gap--${props.columnGap}${sizeState}`;
    return c;
}
