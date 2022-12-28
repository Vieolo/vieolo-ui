/// <reference types="react" />
import { ColorOptionSubType, ColorOptionType, WidthAndHeightSize } from "../types/types";
export type DividerThickness = "1" | "2" | 'half';
export default function Divider(props: {
    direction: 'horizontal' | 'vertical';
    length: WidthAndHeightSize;
    color?: ColorOptionType;
    colorType?: ColorOptionSubType;
    position?: 'start' | 'center' | 'end';
    thickness?: DividerThickness;
    spaceAround?: "half" | 'one' | 'two';
}): JSX.Element;
