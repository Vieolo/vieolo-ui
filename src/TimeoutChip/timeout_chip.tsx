// React
import { useState, useEffect } from "react";

// Vieolo UI
import Chip from "../Chip";
import { ColorOptionType, EmphasisType } from "../types";


type ChipPropType = Omit<React.ComponentProps<typeof Chip>, 'icon' | 'color' | 'emphasis'> 

export default function TimeoutChip(props: ChipPropType & {
    normalIcon?: React.ReactNode,
    timeoutIcon?: React.ReactNode,
    normalColor?: ColorOptionType,
    timeoutColor?: ColorOptionType,
    normalEmphasis?: EmphasisType,
    timeoutEmphasis?: EmphasisType,
    timeoutDuration?: number,
}) {
    let [activated, setActivated] = useState<boolean>(false);

    useEffect(() => {
        let tm: NodeJS.Timeout;
        if (activated) {
            tm = setTimeout(() => {
                setActivated(false)
            }, props.timeoutDuration || 2000)
        }

        return () => {
            if (tm) clearTimeout(tm)
        }
    }, [activated, props.timeoutDuration])

    return <Chip
        {...props}
        icon={activated ? props.timeoutIcon : props.normalIcon}
        color={activated ? props.timeoutColor : props.normalColor}
        emphasis={activated ? props.timeoutEmphasis : props.normalEmphasis}
        onChipSelect={!props.onChipSelect ? undefined : async () => {
            if (props.onChipSelect) props.onChipSelect()
            setActivated(true)
        }}
    />
}
