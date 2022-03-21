export function getEmphasisClasses(emphasis, color, options) {
    function getBorderClass() {
        return `border--px-${options.borderWidth === undefined ? '2' : options.borderWidth}`;
    }
    function getTextColorClass() {
        return options.removeTextColorClasses ? "" : `color--${color}-${emphasis === "high" ? "text" : "normal"}`;
    }
    let c = "";
    if (emphasis === 'high') {
        c = ` background-color--${color}-normal ${getTextColorClass()} border--px-0`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
    }
    else if (emphasis === 'medium') {
        c = ` background-color--${color}-light border--px-0`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-normal`;
        }
    }
    else if (emphasis === 'low') {
        c = ` background-color--content-background border--${color}-light ${getTextColorClass()} ${getBorderClass()} border--solid`;
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
            c += ` hover-border--${color}-light`;
        }
    }
    return c;
}
