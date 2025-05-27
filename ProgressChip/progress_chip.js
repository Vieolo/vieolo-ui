import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import DonutChart from "../DonutChart";
import Chip from "../Chip";
import Flex from "../Flex";
export default function ProgressChip(props) {
    return _jsx(Chip, { ...props, icon: _jsx(Flex, { direction: "column", justifyContent: "center", children: _jsx(DonutChart, { height: 22, width: 22, viewbox: "-10 -11 20 20", removeLabels: true, data: [
                    { title: "", color: props.color || 'primary', percent: props.progress, selected: true },
                    { title: "", percent: 1 - props.progress },
                ] }) }) });
}
