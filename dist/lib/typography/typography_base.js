import { jsx as _jsx } from "react/jsx-runtime";
export default function TypographyBase(props) {
    let finalClassName = `${props.color || (props.className.includes("caption") ? 'gray-text' : 'default-text')}-color `;
    finalClassName += `margin-vertical--${props.margin || "0"} `;
    finalClassName += `font-weight--${props.fontWeight || (props.className.includes("title") ? 'bold' : 'normal')} `;
    finalClassName += `${props.className} `;
    return _jsx("p", Object.assign({ className: finalClassName.trim(), title: props.showTitle ? props.text : "", "aria-label": props.ariaLabel, "data-testid": props.dataTestID, style: props.style }, { children: props.text }), void 0);
}
