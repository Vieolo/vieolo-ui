import React from 'react';
import Card from '../Card';
type CardPropType = Pick<React.ComponentProps<typeof Card>, "borderRadius" | "color" | "emphasis" | "elevation">;
export default function FormSection(props: {
    title: string;
    /** This string is displayed on the right side of the form section header */
    secondaryValue?: string | React.ReactNode;
    children?: React.ReactNode;
    disabled?: boolean;
} & CardPropType): JSX.Element;
export {};
