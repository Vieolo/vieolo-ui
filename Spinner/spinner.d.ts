/// <reference types="react" />
import { ColorOptionType } from "../types/types";
export default function Spinner(props: {
    color?: ColorOptionType;
    size?: 'extra-small' | 'small' | 'medium' | 'large';
    colorType?: 'normal' | 'text' | 'text-light' | 'light';
}): JSX.Element;
