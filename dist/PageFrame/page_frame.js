import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Vieolo UI
import Navbar from '../NavBar';
import NavDrawer from '../NavDrawer';
export default function PageFrame(props) {
    let [drawerOpen, setDrawerOpen] = useState(false);
    return _jsxs("div", { className: "vieolo-page-frame", children: [props.navbar &&
                _jsx(Navbar, { drawerButton: props.navbar.drawerButton, elevation: props.navbar.elevation, logoRedirectURL: props.navbar.logoRedirectURL, hasDrawerButton: props.drawer !== undefined, logo: props.navbar.logo, onDrawerButtonClicked: props.drawer === undefined ? undefined : () => {
                        var _a;
                        setDrawerOpen(!drawerOpen);
                        if ((_a = props.navbar) === null || _a === void 0 ? void 0 : _a.onDrawerButtonClicked)
                            props.navbar.onDrawerButtonClicked();
                    }, onSearchSubmit: props.navbar.onSearchSubmit, rightComponents: props.navbar.rightComponents, searchPlaceholder: props.navbar.searchPlaceholder, title: props.navbar.title, drawerState: drawerOpen ? 'open' : 'close' }), props.drawer &&
                _jsx(NavDrawer, { state: drawerOpen ? "open" : 'closed', mainItems: props.drawer.mainItems, bottomItems: props.drawer.bottomItems, topContent: props.drawer.topContent, footPrint: props.drawer.footPrint, onDrawerClose: () => setDrawerOpen(false) }), props.children] });
}
