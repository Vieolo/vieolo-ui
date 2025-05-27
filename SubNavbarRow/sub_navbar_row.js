import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React, Router
import { useHistory } from 'react-router-dom';
// Vieolo UI
import Flex from "../Flex";
import Grid from "../Grid";
import GridContainer from "../GridContainer";
import Typography from "../Typography";
import IconButton from "../IconButton";
import { ArrowBackIcon } from "../icons";
export default function SubNavbarRow(props) {
    let history = useHistory();
    let midCol = props.midColumnSize || 4;
    let icon = props.icon || _jsx(ArrowBackIcon, {});
    let backButtonText = props.backButtonText || 'Go Back';
    let onBack = props.onBack || history.goBack;
    let c = "vieolo-sub-navbar-row";
    c += ` vieolo-sub-navbar-row--elevation-${props.elevation || 'default'}`;
    return _jsx("div", { className: c, children: _jsxs(GridContainer, { className: "padding-horizontal--one height--pc-100", children: [_jsx(Grid, { xl: ((12 - midCol) / 2), className: "height--pc-100", children: _jsxs(Flex, { alignItems: "center", columnGap: "half", className: "height--pc-100", children: [!props.removeBackButton &&
                                _jsx(IconButton, { icon: icon, onClick: () => onBack(), color: "primary", size: 'small' }), _jsx(Typography, { text: backButtonText, fontWeight: 'bold' })] }) }), _jsx(Grid, { xl: midCol, className: "height--pc-100", children: _jsx(Flex, { alignItems: "center", justifyContent: "center", className: "height--pc-100", children: props.center && props.center }) }), _jsx(Grid, { xl: ((12 - midCol) / 2), className: "height--pc-100", children: _jsx(Flex, { direction: "row-reverse", alignItems: "center", columnGap: "one", className: "height--pc-100", children: props.actions || [] }) })] }) });
}
