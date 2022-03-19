import { ColorOptionType, EmphasisType } from "../private/types";
export declare function getEmphasisClasses(emphasis: EmphasisType, color: ColorOptionType, options: {
    hasRipple?: boolean;
    hoverable?: boolean;
    borderWidth?: "0" | "1" | "2";
    removeTextColorClasses?: boolean;
}): string;
