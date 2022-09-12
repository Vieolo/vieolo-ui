import React from 'react';
export default function FormSection(props: {
    title: string;
    /** This string is displayed on the right side of the form section header */
    secondaryValue?: string;
    children?: React.ReactNode;
    disabled?: boolean;
}): JSX.Element;
