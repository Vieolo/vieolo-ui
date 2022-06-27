// Types
import { ColorOptionType, EmphasisType } from "../types/types";

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
        return options.removeTextColorClasses ? "" : `color--${color}-${emphasis === "high" ? "text" : emphasis === 'medium' ? 'text-light' : "normal"}`;
    }


    let c = "";
    if (emphasis === 'high') {
		
        c = ` background-color--${color}-normal ${getTextColorClass()} border--px-0`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
	
    } else if (emphasis === 'medium') {
	
        c = ` background-color--${color}-light border--px-0 ${getTextColorClass()}`;
        if (options.hasRipple) {
            c += ` ripple ripple--${color}-normal`
        }
	
    } else if (emphasis === 'low' || emphasis === 'low-normal') {
	
        c = ` background-color--content-background border--${color}-${emphasis === 'low' ? 'light' : 'normal'} ${getTextColorClass()} ${getBorderClass()} border--solid`;
        
        if (options.hoverable) {
            c += ` hover--${color}-light`
        }
	
    } else {
	
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