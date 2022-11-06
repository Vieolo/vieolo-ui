/// <reference types="react" />
export declare type ColorOptionType = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'alert' | 'accessory-blue' | 'accessory-orange' | 'accessory-green';
export declare type EmphasisType = 'high' | 'medium' | 'low' | 'low-normal' | 'none' | 'none-normal' | 'none-background';
export declare type BorderRadiusValueType = 'full' | 'normal' | 'half' | 'none' | 'default' | 'round' | 'circle';
export declare type BorderRadiusType = BorderRadiusValueType | {
    topLeft?: BorderRadiusValueType;
    topRight?: BorderRadiusValueType;
    bottomLeft?: BorderRadiusValueType;
    bottomRight?: BorderRadiusValueType;
};
export declare type FontWeightType = 'light' | 'normal' | 'bold' | 'extra-bold';
export declare type GridGapType = 'none' | 'half' | 'one' | 'two';
export declare type ElevationType = '0' | '1' | '2';
export declare type RowHeightType = "small" | "medium" | "large" | "over";
export declare type RowStyleType = {
    elevation?: ElevationType;
    emphasis?: EmphasisType;
    borderRadius?: BorderRadiusType;
    color?: ColorOptionType;
    height?: RowHeightType;
};
declare type viewPortHeight = "vh-";
declare type viewPortWidth = "vw-";
declare type viewPortPercent = "pc-";
declare type viewPortSizes = "100" | "90" | "80" | "70" | "60" | "50" | "40" | "30" | "20" | "10";
declare type viewPortHeightFinal = `${viewPortHeight}${viewPortSizes}`;
declare type viewPortWidthFinal = `${viewPortWidth}${viewPortSizes}`;
declare type viewPortPercentFinal = `${viewPortPercent}${viewPortSizes}`;
export declare type WidthAndHeightSize = "none" | "half" | "one" | "two" | "px-600" | "px-500" | "px-400" | "px-300" | "px-200" | "px-100" | "px-50" | viewPortWidthFinal | viewPortHeightFinal | viewPortPercentFinal;
export declare type CardExtraActionType = {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    icon?: React.ReactNode;
    text?: string;
    color?: ColorOptionType;
    id: string;
    ariaLabel?: string;
    dataTestID?: string;
};
declare type TypographyMainType = 'title' | 'paragraph' | 'caption';
declare type TypographySecondaryType = 'large' | 'medium' | 'small';
export declare type TypographyOptionTypes = `${TypographyMainType}-${TypographySecondaryType}`;
export {};
