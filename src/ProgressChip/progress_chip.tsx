// Vieolo UI
import DonutChart from "../DonutChart";
import Chip from "../Chip";
import Flex from "../Flex";

type ChipPropType = Omit<React.ComponentProps<typeof Chip>, 'onButtonClick' | 'onChipSelect' | 'selected' | 'buttonComponent' | 'buttonIcon' | 'icon'>

export default function ProgressChip(props: {
    /** The progress value of the chip. Should be a value from 0 to 1 */
    progress: number,
} & ChipPropType) {
    return <Chip
        {...props}
        icon={
            <Flex direction="column" justifyContent="center">
                <DonutChart
                    height={22}
                    width={22}
                    viewbox="-10 -11 20 20"
                    removeLabels
                    data={[
                        { title: "", color: props.color || 'primary', percent: props.progress, selected: true },
                        { title: "", percent: 1 - props.progress },
                    ]}
                />
            </Flex>
        }
    />
}
