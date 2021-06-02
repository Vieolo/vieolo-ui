import { jsx as _jsx } from "react/jsx-runtime";
// Internal Components
import TypographyBase from './typography_base';
export default function TypographyParagraphMedium(props) {
    return _jsx(TypographyBase, { text: props.text, className: `typography-paragraph-medium${props.className ? ` ${props.className}` : ""}`, showTitle: props.showTitle }, void 0);
}
