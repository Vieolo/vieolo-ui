import React from 'react';
import { BorderRadiusType, ColorOptionType, ElevationType, EmphasisType } from '../private/types';
export default function Card(props: {
    emphasis?: EmphasisType;
    elevation?: ElevationType;
    borderRadius?: BorderRadiusType;
    color?: ColorOptionType;
    height?: string;
    width?: string;
    children?: React.ReactNode;
    padding?: 'none' | 'half' | 'one';
    ariaLabel?: string;
}): JSX.Element;
