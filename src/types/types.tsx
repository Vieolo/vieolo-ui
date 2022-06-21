export type ColorOptionType = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'alert' | 'accessory-blue' | 'accessory-orange' | 'accessory-green';
export type EmphasisType = 'high' | 'medium' | 'low' | 'none';
export type BorderRadiusType = 'full' | 'normal' | 'half' | 'none' | 'default';
export type FontWeightType = 'light' | 'normal' | 'bold' | 'extra-bold';
export type GridGapType = 'none' | 'half' | 'one' | 'two';
export type ElevationType = '0' | '1' | '2';
export type RowHeightType = "small" | "medium" | "large" | "over";

export type RowStyleType = {
    elevation?: ElevationType,
    emphasis?: "none" | "low",
    borderRadius?: BorderRadiusType,
    color?: ColorOptionType,
    height?: RowHeightType
}

type viewPortHeight = "vh-";
type viewPortWidth = "vw-";
type viewPortPercent = "pc-";
type viewPortSizes = "100" | "90" | "80" | "70" | "60" | "50" | "40" | "30" | "20" | "10";
type viewPortHeightFinal = `${viewPortHeight}${viewPortSizes}`;
type viewPortWidthFinal = `${viewPortWidth}${viewPortSizes}`;
type viewPortPercentFinal = `${viewPortPercent}${viewPortSizes}`;

export type WidthAndHeightSize = "none" | "half" | "one" | "two" | "px-600" | "px-500" | "px-400" | "px-300" | "px-200" | "px-100" | "px-50" | viewPortWidthFinal | viewPortHeightFinal | viewPortPercentFinal;


export type CardExtraActionType = {
    onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
    icon?: React.ReactNode,
    text?: string,
    color?: ColorOptionType,
    id: string,
    ariaLabel?: string,
    dataTestID?: string
}

type TypographyMainType = 'title' | 'paragraph' | 'caption';
type TypographySecondaryType = 'large' | 'medium' | 'small';

export type TypographyOptionTypes = `${TypographyMainType}-${TypographySecondaryType}`
