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