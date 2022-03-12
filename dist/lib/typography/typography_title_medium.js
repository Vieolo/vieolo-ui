import { jsx as _jsx } from "react/jsx-runtime";
// Internal Components
import TypographyBase from './typography_base';
export default function TypographyTitleMedium(props) {
    return _jsx(TypographyBase, { text: props.text, className: `typography-title-medium${props.className ? ` ${props.className}` : ""}`, showTitle: props.showTitle, dataTestID: props.dataTestID, ariaLabel: props.ariaLabel, color: props.color, margin: props.margin, fontWeight: props.fontWeight, style: props.style }, void 0);
}
