import { jsx as _jsx } from "react/jsx-runtime";
export default function Grid(props) {
    let d = props.direction || 'column';
    let c = `vieolo-grid grid-${d}--xl--${props.xl}`;
    if (props.lg !== undefined)
        c += ` grid-${d}--lg--${props.lg}`;
    if (props.md !== undefined)
        c += ` grid-${d}--md--${props.md}`;
    if (props.sm !== undefined)
        c += ` grid-${d}--sm--${props.sm}`;
    return _jsx("div", Object.assign({ className: c }, { children: props.children }), void 0);
}
