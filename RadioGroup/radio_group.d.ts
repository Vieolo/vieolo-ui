/// <reference types="react" />
import { ColorOptionType, GridGapType } from "../types";
import { BorderRadiusType } from "../types/types";
export type RadioButtonType = {
    id: string;
    ariaLabel?: string;
    title?: string;
    subTitle?: string;
    /**
     * If an icon is provided, it will replace the rounded checkbox
     */
    icon?: React.ReactNode;
};
type RadioGroupDirection = 'vertical' | 'horizontal';
export type RadioGroupResponsiveChanges = {
    direction?: RadioGroupDirection;
};
export default function RadioGroup(props: {
    value: string;
    options: RadioButtonType[];
    onOptionChange: (o: string) => void;
    direction?: RadioGroupDirection;
    lg?: RadioGroupResponsiveChanges;
    md?: RadioGroupResponsiveChanges;
    sm?: RadioGroupResponsiveChanges;
    disabled?: boolean;
    /** Defaults to half */
    horizontalButtonPadding?: "none" | 'half' | 'one' | 'two';
    verticalButtonPadding?: "none" | 'half' | 'one' | 'two';
    /** defaults to primary */
    color?: ColorOptionType;
    /** Defaults to none */
    gap?: GridGapType;
    /** defaults to half */
    borderRadius?: BorderRadiusType;
}): JSX.Element;
export {};
