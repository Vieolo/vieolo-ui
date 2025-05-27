/// <reference types="react" />
import { BorderRadiusType } from "../types/types";
export default function TabSwitch(props: {
    options: {
        value: string;
        title: string;
    }[];
    value: string;
    onSelect: (o: string) => void;
    verticalMargin?: number;
    borderRadius?: BorderRadiusType;
    tabWidth?: number;
}): JSX.Element;
