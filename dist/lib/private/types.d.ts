export declare type ColorOptionType = 'primary' | 'secondary' | 'tertiary' | 'error' | 'success' | 'alert' | 'accessory-blue' | 'accessory-orange' | 'accessory-green';
export declare type EmphasisType = 'high' | 'medium' | 'low' | 'none';
export declare type BorderRadiusType = 'full' | 'normal' | 'half' | 'none' | 'default';
export declare type FontWeightType = 'light' | 'normal' | 'bold' | 'extra-bold';
export declare type GridGapType = 'none' | 'half' | 'one' | 'two';
export declare type ElevationType = '0' | '1' | '2';
export declare type RowHeightType = "small" | "medium" | "large" | "over";
export declare type RowStyleType = {
    elevation?: ElevationType;
    emphasis?: "none" | "low";
    borderRadius?: BorderRadiusType;
    color?: ColorOptionType;
    height?: RowHeightType;
};
