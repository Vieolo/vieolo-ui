import React from 'react';
export default function SwitchSet(props: {
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    on: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    switchID: string;
}): JSX.Element;
