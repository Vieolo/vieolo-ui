export function getEmphasisClasses(emphasis, color, options) {
    function getBorderClass() {
        return `border--px-${options.borderWidth === undefined ? '2' : options.borderWidth}`;
    }
    function getTextColorClass() {
        return options.removeTextColorClasses ? "" : `color--${color}-${emphasis === "high" ? "text" : emphasis === 'medium' ? 'text-light' : "normal"}`;
    }
    let c = "";
    // High emphasis
    // Normal background color
    // Ripple with light color
    if (emphasis === 'high') {
        c = ` background-color--${color}-normal ${getTextColorClass()} border--px-0`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
        // Medium Emphasis
        // Light background color
        // Ripple with normal color (should change)
    }
    else if (emphasis === 'medium') {
        c = ` background-color--${color}-light border--px-0 ${getTextColorClass()}`;
        c += ` ${getBorderClass()}`;
        c += ` border--solid`;
        c += ` border--${color}-light`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-normal`;
        }
        // Low and Low-Normal
        // Content or transparent background
        // Border with light or normal color
        // Hover with light background
    }
    else if (emphasis === 'low' || emphasis === 'low-normal') {
        // Settin the background
        c = ` background-color--${options.transparentBackground ? 'transparent' : "background-content"}`;
        // Settin ght eborder color
        c += ` border--${color}-${emphasis === 'low' ? 'light' : 'normal'}`;
        // Setting the text color
        c += ` ${getTextColorClass()}`;
        // Setting the border thickness
        c += ` ${getBorderClass()}`;
        // Setting the style of the border
        c += ` border--solid`;
        if (options.hoverable) {
            c += ` hover--${color}-light`;
        }
        // None | None-Normal | None-Background
        // Content or transparent background
        // No border
        // Hover with border (light or normal) or background (light)
    }
    else {
        // Setting the background color 
        c = ` background-color--${options.transparentBackground ? 'transparent' : "background-content"}`;
        // Seting the border color
        c += ` border--${options.transparentBackground ? 'transparent' : "background-content"}`;
        // Setting the color of the text
        c += ` ${getTextColorClass()}`;
        // Setting the width of the border
        c += ` ${getBorderClass()}`;
        // Setting the shape of the border
        c += ` border--solid`;
        // Setting the ripple effect
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
        // Setting the hover effect
        if (options.hoverable) {
            if (emphasis.includes("background")) {
                c += ` hover-background--${color}-light`;
            }
            else {
                c += ` hover-border--${color}-${emphasis === 'none' ? 'light' : 'normal'}`;
            }
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
