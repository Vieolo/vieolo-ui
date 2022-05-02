import { jsx as _jsx } from "react/jsx-runtime";
export default function Typography(props) {
    let finalType = props.type || 'paragraph-medium';
    let finalClassName = `color--${props.color || (finalType.includes("caption") ? 'gray' : 'default')}-${props.colorType || 'normal'} `;
    finalClassName += `margin-vertical--${props.margin || "0"} `;
    finalClassName += `font-weight--${props.fontWeight || (finalType.includes("title") ? 'bold' : 'normal')} `;
    finalClassName += `font-family--${props.fontFamily || 'primary'} `;
    if (props.textAlign)
        finalClassName += `text-align--${props.textAlign} `;
    if (props.className)
        finalClassName += `${props.className} `;
    finalClassName += `typography-${finalType} `;
    if (props.nonselectable)
        finalClassName += "nonselectable ";
    return _jsx("p", Object.assign({ className: finalClassName.trim(), title: props.showTitle ? (props.hoverTitle || props.text) : "", "aria-label": props.ariaLabel, "data-testid": props.dataTestID, style: props.style }, { children: props.text }), void 0);
}
