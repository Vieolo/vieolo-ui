/// <reference types="react" />
import Chip from "../Chip";
import { ColorOptionType, EmphasisType } from "../types";
type ChipPropType = Omit<React.ComponentProps<typeof Chip>, 'icon' | 'color' | 'emphasis'>;
export default function TimeoutChip(props: ChipPropType & {
    normalIcon?: React.ReactNode;
    timeoutIcon?: React.ReactNode;
    normalColor?: ColorOptionType;
    timeoutColor?: ColorOptionType;
    normalEmphasis?: EmphasisType;
    timeoutEmphasis?: EmphasisType;
    timeoutDuration?: number;
}): JSX.Element;
export {};
