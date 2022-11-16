import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Vieolo UI
import Card from "../Card";
import DropDownMenu from "../DropDownMenu";
import Flex from "../Flex";
import IconButton from "../IconButton";
import Typography from '../Typography';
// Icons
import MoreIcon from '@mui/icons-material/MoreVertRounded';
import Divider from "../Divider";
export default function ActionCard(props) {
    return _jsxs(Card, { ...props, padding: "none", emphasis: "none", children: [_jsxs(Flex, { alignItems: "center", columnGap: "one", justifyContent: "space-between", className: "padding-vertical--half padding-horizontal--one", children: [_jsxs(Flex, { alignItems: "center", columnGap: "one", children: [props.headerIcon &&
                                props.headerIcon, _jsx(Typography, { text: props.headerTitle, type: 'title-medium' })] }), (props.dropDownMenu && props.dropDownMenu.items.length > 0) &&
                        _jsx(DropDownMenu, { buttonComponent: _jsx(IconButton, { icon: _jsx(MoreIcon, {}), onClick: () => { }, color: props.color, size: 'extra-small' }), items: props.dropDownMenu.items, onItemSelect: props.dropDownMenu.onItemSelect })] }), _jsx(Divider, { direction: "horizontal", length: "pc-100", position: "center", thickness: "1", color: props.color, colorType: 'normal' }), _jsx(Card, { padding: props.padding, emphasis: props.emphasis, borderRadius: 'none', children: props.children }), (props.footerComponents && props.footerComponents.length > 0) &&
                _jsxs(_Fragment, { children: [_jsx(Divider, { direction: "horizontal", length: "pc-100", position: "center", thickness: "1", spaceAround: "half", color: props.color }), _jsx(Flex, { alignItems: "center", columnGap: "one", justifyContent: "space-between", className: "padding-vertical--half", children: _jsx(Flex, { alignItems: "center", columnGap: "one", className: "padding-left--one", children: props.footerComponents }) })] })] });
}
