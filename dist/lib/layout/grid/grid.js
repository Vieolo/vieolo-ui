import { jsx as _jsx } from "react/jsx-runtime";
// Types
import Flex from '../flex/flex';
export default function Grid(props) {
    let d = props.direction || 'column';
    let c = `vieolo-grid grid-${d}--xl--${props.xl}`;
    if (props.className)
        c += ` ${props.className}`;
    if (props.lg !== undefined)
        c += ` grid-${d}--lg--${props.lg}`;
    if (props.md !== undefined)
        c += ` grid-${d}--md--${props.md}`;
    if (props.sm !== undefined)
        c += ` grid-${d}--sm--${props.sm}`;
    return _jsx("div", Object.assign({ className: c }, { children: props.flex
            ? _jsx(Flex, Object.assign({ alignItems: props.flex.alignItems, className: props.flex.className, columnGap: props.flex.columnGap, direction: props.flex.direction, justifyContent: props.flex.justifyContent, rowGap: props.flex.rowGap }, { children: props.children }), void 0)
            : props.children }), void 0);
}
