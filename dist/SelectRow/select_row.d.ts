import React from 'react';
import Select from '../Select';
type SelectPropType = React.ComponentProps<typeof Select>;
export default function SelectRow(props: {
    rowTitle: string | React.ReactNode;
    rowSubtitle?: string | React.ReactNode;
} & SelectPropType): JSX.Element;
export {};
