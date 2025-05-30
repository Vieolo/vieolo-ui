import React from 'react';
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType } from '../types/types';
export default function Card(props: {
    emphasis?: EmphasisType;
    elevation?: ElevationType;
    borderRadius?: BorderRadiusType;
    color?: ColorOptionType;
    height?: string;
    width?: string;
    children?: React.ReactNode;
    padding?: 'none' | 'half' | 'one' | 'two';
    ariaLabel?: string;
    style?: React.CSSProperties;
    className?: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    keepEmphasisTextColorClasses?: boolean;
}): JSX.Element;
