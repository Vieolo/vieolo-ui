import React from 'react';
import RadioGroup from '../RadioGroup';
import { RowHeightType } from '../types/types';
type RadioGroupPropType = Omit<React.ComponentProps<typeof RadioGroup>, "direction">;
export default function RadioGroupRow(props: {
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    height?: RowHeightType | "default";
} & RadioGroupPropType): JSX.Element;
export {};
