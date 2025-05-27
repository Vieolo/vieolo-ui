import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from "react";
// Vieolo UI
import Card from "../Card";
import Flex from "../Flex";
import IconButton from "../IconButton";
import Typography from "../Typography";
import Input from "../Input";
// Material UI
import MenuIcon from '@mui/icons-material/MenuRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
export default function Navbar(props) {
    let [query, setQuery] = useState("");
    let logo;
    if (props.logo && props.logoRedirectURL) {
        logo = _jsx("a", { href: props.logoRedirectURL, children: props.logo });
    }
    else if (props.logo) {
        logo = props.logo;
    }
    let c = 'vieolo-navbar';
    if (props.alwaysOpen) {
        c += ` vieolo-navbar--with-always-open-drawer vieolo-navbar--with-always-open-drawer--responsive-${props.alwaysOpen.responsiveBreakpoint}`;
    }
    return _jsx(Card, { elevation: props.elevation, className: c, borderRadius: "none", children: _jsxs(Flex, { justifyContent: "space-between", alignItems: "center", className: "height--pc-100", children: [_jsxs(Flex, { alignItems: "center", columnGap: "one", children: [(props.hasDrawerButton) &&
                            _jsx("div", { className: "vieolo-navbar__drawer-button", children: props.drawerButton ||
                                    _jsx(IconButton, { icon: props.drawerState === 'open' ? _jsx(CloseIcon, {}) : _jsx(MenuIcon, {}), color: 'primary', emphasis: "none", onClick: () => {
                                            if (props.onDrawerButtonClicked)
                                                props.onDrawerButtonClicked();
                                        } }) }), logo && logo, props.title &&
                            _jsx(Typography, { text: props.title, type: 'title-medium' })] }), _jsxs(Flex, { direction: "row-reverse", alignItems: "center", columnGap: "one", children: [props.rightComponents, props.onSearchSubmit &&
                            _jsx("form", { onSubmit: e => {
                                    e.preventDefault();
                                    if (query.trim()) {
                                        props.onSearchSubmit(query);
                                    }
                                }, children: _jsx(Input, { error: false, value: query, onChange: v => setQuery(v), size: "medium", placeholder: props.searchPlaceholder || 'Search...' }) })] })] }) });
}
