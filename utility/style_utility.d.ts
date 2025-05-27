import { BorderRadiusType } from "../types";
import { BorderRadiusValueType, ColorOptionType, EmphasisType } from "../types/types";
export declare function getEmphasisClasses(emphasis: EmphasisType, color: ColorOptionType, options: {
    hasRipple?: boolean;
    hoverable?: boolean;
    borderWidth?: "0" | "1" | "2";
    removeTextColorClasses?: boolean;
    transparentBackground?: boolean;
}): string;
export declare function getManagedBorderRadius(index: number, total: number, borderRadius?: BorderRadiusValueType): BorderRadiusType;
export declare function getBorderRadiusClasses(prefix: string, borderRadiusType?: BorderRadiusType): string;
