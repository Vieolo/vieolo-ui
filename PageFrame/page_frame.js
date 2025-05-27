import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
// Vieolo UI
import Navbar from '../NavBar';
import NavDrawer from '../NavDrawer';
export default function PageFrame(props) {
    var _a;
    let [drawerOpen, setDrawerOpen] = useState(false);
    let [openItems, setOpenItems] = useState(props.drawer
        ? props.drawer.mainItems.filter(z => z.children && z.children.length > 0 && z.children.some(x => x.selected)).map(z => z.title)
        : []);
    return _jsxs("div", { className: "vieolo-page-frame", children: [(props.navbar && !props.hideNavbar) &&
                _jsx(Navbar, { drawerButton: props.navbar.drawerButton, elevation: props.navbar.elevation, logoRedirectURL: props.navbar.logoRedirectURL, hasDrawerButton: props.drawer !== undefined, logo: props.navbar.logo, onDrawerButtonClicked: props.drawer === undefined ? undefined : () => {
                        var _a;
                        setDrawerOpen(!drawerOpen);
                        if ((_a = props.navbar) === null || _a === void 0 ? void 0 : _a.onDrawerButtonClicked)
                            props.navbar.onDrawerButtonClicked();
                    }, onSearchSubmit: props.navbar.onSearchSubmit, rightComponents: props.navbar.rightComponents, searchPlaceholder: props.navbar.searchPlaceholder, title: props.navbar.title, drawerState: drawerOpen ? 'open' : 'close', alwaysOpen: (_a = props.drawer) === null || _a === void 0 ? void 0 : _a.alwaysOpen }), props.drawer &&
                _jsx(NavDrawer, { ...props.drawer, state: drawerOpen ? "open" : 'closed', onDrawerClose: () => setDrawerOpen(false), openItems: openItems, onOpenItemsChange: n => setOpenItems(n) }), (!props.drawer || !props.drawer.alwaysOpen)
                ? props.children
                : _jsx("div", { className: `vieolo-page-frame--with-always-open-drawer vieolo-page-frame--with-always-open-drawer--responsive-${props.drawer.alwaysOpen.responsiveBreakpoint}`, children: props.children })] });
}
