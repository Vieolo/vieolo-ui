import React from 'react';
import { RowHeightType } from '../private/types';
export default function SwitchSet(props: {
    title: string | React.ReactNode;
    subtitle?: string | React.ReactNode;
    on: boolean;
    onChange: (v: boolean) => void;
    disabled?: boolean;
    switchID: string;
    /**
     * The height of the row
     * To change the default height, override the "vieolo-swith-set--default-height" CSS class
     */
    height?: RowHeightType | "default";
}): JSX.Element;
