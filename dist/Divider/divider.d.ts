/// <reference types="react" />
import { ColorOptionType, WidthAndHeightSize } from "../types/types";
export default function Divider(props: {
    direction: 'horizontal' | 'vertical';
    length: WidthAndHeightSize;
    color?: ColorOptionType;
    colorType?: 'light' | 'normal' | 'text';
    position?: 'start' | 'center' | 'end';
}): JSX.Element;