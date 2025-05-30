import React from 'react';
import { RowHeightType } from '../types/types';
export default function SwitchRow(props: {
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    on: boolean;
    onChange: (v: boolean) => void;
    switchID: string;
    disabled?: boolean;
    ariaLabel?: string;
    dataTestID?: string;
    /**
     * The height of the row
     * To change the default height, override the "vieolo-swith-set--default-height" CSS class
     */
    height?: RowHeightType | "default";
}): JSX.Element;
