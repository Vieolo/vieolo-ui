/// <reference types="react" />
import { ColorOptionType } from "../types";
export default function ProgressBar(props: {
    topRow?: {
        minValueTitle?: string;
        minValueText?: string;
        maxValueTitle?: string;
        maxValueText?: string;
    };
    bottomRow?: {
        currentValueTitle?: string;
        currentValueText?: string;
        currentValueColor?: ColorOptionType;
    };
    max: number;
    value: number;
    color?: ColorOptionType;
    dataTestID?: string;
}): JSX.Element;
