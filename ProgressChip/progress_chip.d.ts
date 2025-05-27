/// <reference types="react" />
import Chip from "../Chip";
type ChipPropType = Omit<React.ComponentProps<typeof Chip>, 'onButtonClick' | 'onChipSelect' | 'selected' | 'buttonComponent' | 'buttonIcon' | 'icon'>;
export default function ProgressChip(props: {
    /** The progress value of the chip. Should be a value from 0 to 1 */
    progress: number;
} & ChipPropType): JSX.Element;
export {};
