import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Button from "../Button";
import Divider from "../Divider/divider";
import Flex from "../Flex";
export default function TabRow(props) {
    return _jsxs("div", { className: "vieolo-tab-row", children: [_jsx(Flex, { columnGap: "half", className: "padding-horizontal--half overflow--hide-scrollbar", wrap: "scroll", children: props.items.map((item, i) => {
                    return _jsxs(Flex, { direction: 'column', className: "padding-top--half", justifyContent: "space-between", alignItems: "center", rowGap: "half", children: [_jsx(Button, { text: item.text, ariaLabel: `${item.value} tab`, borderRadius: props.tabButtonBorderRadius, color: props.tabColor, endIcon: item.endIcon, startIcon: item.startIcon, emphasis: 'none-background', height: props.tabButtonHeight || 'small', isTransparent: true, isLoading: item.value === props.selectedItem && props.isLoading, onClick: () => {
                                    props.onItemSelect(item.value);
                                } }), item.value === props.selectedItem
                                ? _jsx(Divider, { length: "pc-100", thickness: "2", color: props.selectedUnderlineColor || 'secondary', direction: 'horizontal', colorType: "normal" })
                                : _jsx("div", { style: { height: "2px" } })] }, `${item.value} ${i}`);
                }) }), _jsx(Divider, { direction: "horizontal", length: "pc-100", thickness: (props.lowerBorder && props.lowerBorder.thickness) ? props.lowerBorder.thickness : '1', color: (props.lowerBorder && props.lowerBorder.color) ? props.lowerBorder.color : 'primary', colorType: (props.lowerBorder && props.lowerBorder.colorType) ? props.lowerBorder.colorType : 'normal' })] });
}
