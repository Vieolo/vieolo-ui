import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
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
    return _jsx(Card, Object.assign({ elevation: props.elevation, className: "vieolo-navbar", borderRadius: "none" }, { children: _jsxs(Flex, Object.assign({ justifyContent: "space-between", alignItems: "center", className: "height--pc-100" }, { children: [_jsxs(Flex, Object.assign({ alignItems: "center", columnGap: "one" }, { children: [props.hasDrawerButton &&
                            _jsx(_Fragment, { children: props.drawerButton ||
                                    _jsx(IconButton, { icon: props.drawerState === 'open' ? _jsx(CloseIcon, {}, void 0) : _jsx(MenuIcon, {}, void 0), color: 'primary', emphasis: "none", onClick: () => {
                                            if (props.onDrawerButtonClicked)
                                                props.onDrawerButtonClicked();
                                        } }, void 0) }, void 0),
                        props.logo && props.logo,
                        props.title &&
                            _jsx(Typography, { text: props.title, type: 'title-medium' }, void 0)] }), void 0),
                _jsxs(Flex, Object.assign({ direction: "row-reverse", alignItems: "center", columnGap: "one" }, { children: [props.rightComponents,
                        props.onSearchSubmit &&
                            _jsx("form", Object.assign({ onSubmit: e => {
                                    e.preventDefault();
                                    if (query.trim()) {
                                        props.onSearchSubmit(query);
                                    }
                                } }, { children: _jsx(Input, { error: false, value: query, onChange: v => setQuery(v), size: "medium", placeholder: props.searchPlaceholder || 'Search...' }, void 0) }), void 0)] }), void 0)] }), void 0) }), void 0);
}
