import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Flex from "../Flex";
import Grid from "../Grid";
import GridContainer from "../GridContainer";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { ArrowBackIcon } from "../icons";
export default function SubNavbarRow(props) {
    let midCol = props.midColumnSize || 4;
    let icon = props.icon || _jsx(ArrowBackIcon, {}, void 0);
    let backButtonText = props.backButtonText || 'Go Back';
    let onBack = props.onBack || window.history.back;
    return _jsx("div", Object.assign({ className: "vieolo-sub-navbar-row" }, { children: _jsxs(GridContainer, Object.assign({ className: "padding-horizontal--one height--pc-100" }, { children: [_jsx(Grid, Object.assign({ xl: ((12 - midCol) / 2), className: "height--pc-100" }, { children: _jsxs(Flex, Object.assign({ alignItems: "center", columnGap: "half", className: "height--pc-100" }, { children: [!props.removeBackButton &&
                                _jsx(IconButton, { icon: icon, onClick: () => onBack(), color: "primary", size: 'small' }, void 0),
                            _jsx(Typography, { text: backButtonText, fontWeight: 'bold' }, void 0)] }), void 0) }), void 0),
                _jsx(Grid, Object.assign({ xl: midCol, className: "height--pc-100" }, { children: _jsx(Flex, Object.assign({ alignItems: "center", justifyContent: "center", className: "height--pc-100" }, { children: props.center && props.center }), void 0) }), void 0),
                _jsx(Grid, Object.assign({ xl: ((12 - midCol) / 2), className: "height--pc-100" }, { children: _jsx(Flex, Object.assign({ direction: "row-reverse", alignItems: "center", columnGap: "one", className: "height--pc-100" }, { children: props.actions || [] }), void 0) }), void 0)] }), void 0) }), void 0);
}
