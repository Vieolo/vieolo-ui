import { jsx as _jsx } from "react/jsx-runtime";
export default function TypographyBase(props) {
    return _jsx("p", Object.assign({ className: props.className, title: props.showTitle ? props.text : "" }, { children: props.text }), void 0);
}
