/// <reference types="react" />
import { DividerThickness } from "../Divider/divider";
import { BorderRadiusType, ColorOptionSubType, ColorOptionType } from "../types/types";
export type TabRowItem = {
    text: string;
    value: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
};
export default function TabRow(props: {
    items: TabRowItem[];
    tabColor?: ColorOptionType;
    tabButtonBorderRadius?: BorderRadiusType;
    tabButtonHeight?: 'small' | 'medium' | 'large';
    selectedUnderlineColor?: ColorOptionType;
    onItemSelect: (value: string) => void;
    selectedItem?: string;
    /**
     * Will only affect the selected tab
     * it is usefull when a tab is clicked and the data for the tab has to be feched
     */
    isLoading?: boolean;
    lowerBorder?: {
        color?: ColorOptionType;
        colorType?: ColorOptionSubType;
        thickness?: DividerThickness;
    };
}): JSX.Element;
