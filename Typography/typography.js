import { jsx as _jsx } from "react/jsx-runtime";
export default function Typography(props) {
    function getClassName(size) {
        let targetStyle = (!size || size === 'xl') ? {
            color: props.color,
            colorType: props.colorType,
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            margin: props.margin,
            textAlign: props.textAlign,
            type: props.type
        } : props[size] || {};
        let finalType = targetStyle.type || 'paragraph-medium';
        let finalClassName = `typography-${finalType} `;
        finalClassName += `color--${targetStyle.color || (finalType.includes("caption") ? 'gray' : 'default')}-${targetStyle.colorType || 'normal'} `;
        finalClassName += `margin-vertical--${targetStyle.margin || "0"} `;
        finalClassName += `font-weight--${targetStyle.fontWeight || (finalType.includes("title") ? 'bold' : 'normal')} `;
        finalClassName += `font-family--${targetStyle.fontFamily || 'primary'} `;
        if (targetStyle.textAlign)
            finalClassName += `text-align--${targetStyle.textAlign} `;
        if (size) {
            finalClassName = finalClassName.trim().split(" ").map(z => `${z}--${size}`).join(" ");
        }
        return finalClassName;
    }
    let xlClass = getClassName();
    let lgClass = props.lg ? getClassName('lg') : " ";
    let mdClass = props.md ? getClassName('md') : " ";
    let smClass = props.sm ? getClassName('sm') : " ";
    let finalC = xlClass + lgClass + mdClass + smClass;
    if (props.className)
        finalC += `${props.className} `;
    if (props.nonselectable)
        finalC += `nonselectable `;
    if (props.noTextOverflow)
        finalC += `no-text-overflow `;
    return _jsx("p", { className: finalC.trim(), title: props.showTitle ? (props.hoverTitle || props.text) : "", "aria-label": props.ariaLabel, "data-testid": props.dataTestID, style: props.style, children: props.text });
}
