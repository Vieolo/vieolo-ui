export type ColorOptionType = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'alert' | "neutral" | 'accessory-blue' | 'accessory-orange' | 'accessory-green';
export type ColorOptionSubType = 'light' | 'normal' | 'text' | 'text-light';
export type EmphasisType = 'high' | 'medium' | 'low' | 'low-normal' | 'none' | 'none-normal' | 'none-background';
export type BorderRadiusValueType = 'full' | 'normal' | 'half' | 'none' | 'default' | 'round' | 'circle';
export type BorderRadiusType = BorderRadiusValueType | {
    topLeft?: BorderRadiusValueType
    topRight?: BorderRadiusValueType
    bottomLeft?: BorderRadiusValueType
    bottomRight?: BorderRadiusValueType
};
export type FontWeightType = 'light' | 'normal' | 'bold' | 'extra-bold';
export type GridGapType = 'none' | 'half' | 'one' | 'two';
export type ElevationType = '0' | '1' | '2';
export type RowHeightType = "small" | "medium" | "large" | "over";

export type RowStyleType = {
    elevation?: ElevationType,
    emphasis?: EmphasisType,
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

export type NumberInputValueType = {
    number: number | null,
    text: string,
    errorMessage?: string,
    isValid: boolean
}

export type StringInputValueType = {
    string: string | null,
    text: string,
    errorMessage?: string,
    isValid: boolean
}