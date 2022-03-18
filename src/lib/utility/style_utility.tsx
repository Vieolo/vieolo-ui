// Types
import { ColorOptionType, EmphasisType } from "../private/types";

export function getEphasisClasses(emphasis: EmphasisType, color: ColorOptionType, hasRipple: boolean, hoverable: boolean): string {
    let c = "";
    if (emphasis === 'high') {
		c = ` background-color--${color}-normal color--${color}-text border--px-0`;
        if (hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
	} else if (emphasis === 'medium') {
		c = ` background-color--${color}-light border--px-0`;
        if (hasRipple) {
            c += ` ripple ripple--${color}-normal`
        }
	} else if (emphasis === 'low') {
		c = ` background-color--background border--${color}-light color--${color}-normal border--px-2 border--solid`;
        
        if (hoverable) {
            c += ` hover--${color}-light`
        }
	} else {
		c = ` background-color--background border--background color--${color}-normal border--px-2 border--solid`;
        if (hasRipple) {
            c += ` ripple ripple--${color}-light`;
        }
        if (hoverable) {
            c += ` hover-border--${color}-light`;
        }
	}

    return c;
}