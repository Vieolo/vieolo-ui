import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Vieolo UI
import Flex from "../Flex";
import Spacer from "../Spacer";
import Typography from "../Typography";
export default function ProgressBar(props) {
    let perc = (props.value / props.max) * 100;
    return _jsxs("div", { className: "vieolo-progress-bar", children: [props.topRow &&
                _jsxs(_Fragment, { children: [_jsxs(Flex, { alignItems: "center", justifyContent: "space-between", children: [_jsxs(Flex, { direction: "column", children: [props.topRow.minValueTitle &&
                                            _jsx(Typography, { text: props.topRow.minValueTitle, type: "caption-large" }), props.topRow.minValueText &&
                                            _jsx(Typography, { text: props.topRow.minValueText, fontWeight: "bold" })] }), _jsxs(Flex, { direction: "column", alignItems: "end", children: [props.topRow.maxValueTitle &&
                                            _jsx(Typography, { text: props.topRow.maxValueTitle, type: "caption-large" }), props.topRow.maxValueText &&
                                            _jsx(Typography, { text: props.topRow.maxValueText, fontWeight: "bold" })] })] }), _jsx(Spacer, { height: "half" })] }), _jsx("div", { className: "vieolo-progress-bar__bar-container", children: _jsx("div", { className: `vieolo-progress-bar__bar-container__bar background-color--${props.color || 'primary'}-normal`, style: { width: `${perc}%` }, title: `${perc.toFixed(2)}%`, "date-testid": `${props.dataTestID || ""}${perc.toFixed(2)}%` }) }), props.bottomRow &&
                _jsxs(_Fragment, { children: [_jsx(Spacer, { height: "half" }), _jsxs(Flex, { direction: "column", alignItems: "center", children: [props.bottomRow.currentValueTitle &&
                                    _jsx(Typography, { text: props.bottomRow.currentValueTitle, type: "caption-large" }), props.bottomRow.currentValueText &&
                                    _jsx(Typography, { text: props.bottomRow.currentValueText, color: props.bottomRow.currentValueColor, type: "paragraph-large", fontWeight: "bold" })] })] })] });
}
