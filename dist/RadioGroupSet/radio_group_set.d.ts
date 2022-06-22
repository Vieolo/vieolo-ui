import React from 'react';
import { RadioButtonType } from '../RadioGroup';
import { RowHeightType } from '../types/types';
export default function RadioGroupSet(props: {
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    value: string;
    options: RadioButtonType[];
    disabled?: boolean;
    height?: RowHeightType | "default";
    onOptionChange: (o: string) => void;
    /** Defaults to 10px */
    horizontalButtonPadding?: number;
    direction?: 'horizontal' | 'vertical';
}): JSX.Element;
