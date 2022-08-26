export function getEmphasisClasses(emphasis, color, options) {
    function getBorderClass() {
        return `border--px-${options.borderWidth === undefined ? '2' : options.borderWidth}`;
    }
    function getTextColorClass() {
        return options.removeTextColorClasses ? "" : `color--${color}-${emphasis === "high" ? "text" : emphasis === 'medium' ? 'text-light' : "normal"}`;
    }
    let c = "";
    if (emphasis === 'high') {
        c = ` background-color--${color}-normal ${getTextColorClass()} border--px-0`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
    }
    else if (emphasis === 'medium') {
        c = ` background-color--${color}-light border--px-0 ${getTextColorClass()}`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-normal`;
        }
    }
    else if (emphasis === 'low' || emphasis === 'low-normal') {
        c = ` background-color--content-background border--${color}-${emphasis === 'low' ? 'light' : 'normal'} ${getTextColorClass()} ${getBorderClass()} border--solid`;
        if (options.hoverable) {
            c += ` hover--${color}-light`;
        }
    }
    else {
        c = ` background-color--content-background border--content-background ${getTextColorClass()} ${getBorderClass()} border--solid`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
        if (options.hoverable) {
            c += ` hover-border--${color}-${emphasis === 'none' ? 'light' : 'normal'}`;
        }
    }
    return c;
}
export function getManagedBorderRadius(index, total, borderRadius) {
    let br = borderRadius || 'default';
    if (total > 1) {
        if (index === 0) {
            br = {
                topLeft: borderRadius || 'default',
                topRight: borderRadius || 'default',
                bottomRight: 'none',
                bottomLeft: 'none',
            };
        }
        else if (index === total - 1) {
            br = {
                bottomLeft: borderRadius || 'default',
                bottomRight: borderRadius || 'default',
                topRight: 'none',
                topLeft: 'none',
            };
        }
        else {
            br = 'none';
        }
    }
    return br;
}
export function getBorderRadiusClasses(prefix, borderRadiusType) {
    let br = borderRadiusType || 'default';
    let pr = (prefix.length > 0 ? `${prefix}--` : '') + "border-radius";
    let className = '';
    if (typeof br === 'string') {
        className += ` ${pr}-${br}`;
    }
    else {
        className += ` ${pr}-top-left-${borderRadiusType.topLeft || 'default'}`;
        className += ` ${pr}-top-right-${borderRadiusType.topRight || 'default'}`;
        className += ` ${pr}-bottom-left-${borderRadiusType.bottomLeft || 'default'}`;
        className += ` ${pr}-bottom-right-${borderRadiusType.bottomRight || 'default'}`;
    }
    return className;
}
