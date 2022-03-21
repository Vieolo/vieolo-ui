// Types
import { ColorOptionType, EmphasisType } from "../private/types";

export function getEmphasisClasses(emphasis: EmphasisType, color: ColorOptionType, options: {
    hasRipple?: boolean, 
    hoverable?: boolean, 
    borderWidth?: "0" | "1" | "2",
    removeTextColorClasses?: boolean
}): string {

    function getBorderClass() {
        return `border--px-${options.borderWidth === undefined ? '2' : options.borderWidth}`
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
	
    } else if (emphasis === 'medium') {
	
        c = ` background-color--${color}-light border--px-0`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-normal`
        }
	
    } else if (emphasis === 'low') {
	
        c = ` background-color--transparent border--${color}-light ${getTextColorClass()} ${getBorderClass()} border--solid`;
        
        if (options.hoverable) {
            c += ` hover--${color}-light`
        }
	
    } else {
	
        c = ` background-color--transparent border--transparent ${getTextColorClass()} ${getBorderClass()} border--solid`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
        if (options.hoverable) {
            c += ` hover-border--${color}-light`;
        }
	
    }

    return c;
}