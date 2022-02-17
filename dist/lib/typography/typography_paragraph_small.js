import { jsx as _jsx } from "react/jsx-runtime";
// Internal Components
import TypographyBase from './typography_base';
export default function TypographyParagraphSmall(props) {
    return _jsx(TypographyBase, { text: props.text, className: `typography-paragraph-small${props.className ? ` ${props.className}` : ""}`, showTitle: props.showTitle, dataTestID: props.dataTestID, ariaLabel: props.ariaLabel }, void 0);
}
