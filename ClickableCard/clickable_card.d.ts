/// <reference types="react" />
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType, TypographyOptionTypes } from "../types/types";
export default function ClickableCard(props: {
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    emphasis?: EmphasisType;
    elevation?: ElevationType;
    borderRadius?: BorderRadiusType;
    color?: ColorOptionType;
    height?: string;
    width?: string;
    padding?: 'none' | 'half' | 'one';
    ariaLabel?: string;
    style?: React.CSSProperties;
    className?: string;
    icon?: React.ReactNode;
    /**
     * Since the whole card is clickable, avoid placing a button in the right items
     */
    rightItems?: React.ReactNode[];
    title: string;
    description?: string | {
        text: string;
        typographyType?: TypographyOptionTypes;
        textAlign?: 'left' | 'right' | 'center' | 'justify';
    };
    keepEmphasisTextColorClasses?: boolean;
}): JSX.Element;
