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
    return _jsxs(Card, Object.assign({}, props, { padding: "none", emphasis: "none" }, { children: [_jsxs(Flex, Object.assign({ alignItems: "center", columnGap: "one", justifyContent: "space-between", className: "padding-vertical--half padding-horizontal--one" }, { children: [_jsxs(Flex, Object.assign({ alignItems: "center", columnGap: "one" }, { children: [props.headerIcon &&
                                props.headerIcon,
                            _jsx(Typography, { text: props.headerTitle, type: 'title-medium' }, void 0)] }), void 0),
                    (props.dropDownMenu && props.dropDownMenu.items.length > 0) &&
                        _jsx(DropDownMenu, { buttonComponent: _jsx(IconButton, { icon: _jsx(MoreIcon, {}, void 0), onClick: () => { }, color: props.color, size: 'extra-small' }, void 0), items: props.dropDownMenu.items, onItemSelect: props.dropDownMenu.onItemSelect }, void 0)] }), void 0),
            _jsx(Divider, { direction: "horizontal", length: "pc-100", position: "center", thickness: "1", color: props.color, colorType: 'normal' }, void 0),
            _jsx(Card, Object.assign({ padding: props.padding, emphasis: props.emphasis, borderRadius: 'none' }, { children: props.children }), void 0),
            (props.footerComponents && props.footerComponents.length > 0) &&
                _jsxs(_Fragment, { children: [_jsx(Divider, { direction: "horizontal", length: "pc-100", position: "center", thickness: "1", spaceAround: "half", color: props.color }, void 0),
                        _jsx(Flex, Object.assign({ alignItems: "center", columnGap: "one", justifyContent: "space-between", className: "padding-vertical--half" }, { children: _jsx(Flex, Object.assign({ alignItems: "center", columnGap: "one", className: "padding-left--one" }, { children: props.footerComponents }), void 0) }), void 0)] }, void 0)] }), void 0);
}
