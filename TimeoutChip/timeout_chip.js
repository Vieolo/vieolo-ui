import { jsx as _jsx } from "react/jsx-runtime";
// React
import { useState, useEffect } from "react";
// Vieolo UI
import Chip from "../Chip";
export default function TimeoutChip(props) {
    let [activated, setActivated] = useState(false);
    useEffect(() => {
        let tm;
        if (activated) {
            tm = setTimeout(() => {
                setActivated(false);
            }, props.timeoutDuration || 2000);
        }
        return () => {
            if (tm)
                clearTimeout(tm);
        };
    }, [activated, props.timeoutDuration]);
    return _jsx(Chip, { ...props, icon: activated ? props.timeoutIcon : props.normalIcon, color: activated ? props.timeoutColor : props.normalColor, emphasis: activated ? props.timeoutEmphasis : props.normalEmphasis, onChipSelect: !props.onChipSelect ? undefined : async () => {
            if (props.onChipSelect)
                props.onChipSelect();
            setActivated(true);
        } });
}
