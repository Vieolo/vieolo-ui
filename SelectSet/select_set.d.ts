import React from 'react';
import Select from '../Select';
type SelectPropType = Omit<React.ComponentProps<typeof Select>, "error">;
export default function SelectSet(props: {
    label: string;
    tip?: string;
    error: boolean | string;
} & SelectPropType): JSX.Element;
export {};
