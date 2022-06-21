import React from 'react';
export default function BackButtonRow(props: {
    removeBackButton?: boolean;
    icon?: React.ReactNode;
    backButtonText?: string;
    onBack?: () => void;
    actions?: any[];
    center?: React.ReactNode;
    centerLarge?: boolean;
}): JSX.Element;
