import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Flex from "../Flex";
import Spacer from "../Spacer";
import Typography from "../Typography";
export default function NavDrawer(props) {
    return _jsxs("div", { className: `vieolo-nav-drawer`, children: [_jsx("div", { className: `vieolo-nav-drawer__drawer vieolo-nav-drawer__drawer--${props.state}`, children: _jsxs(Flex, { direction: "column", justifyContent: "space-between", className: "height--pc-100", children: [_jsxs(Flex, { direction: "column", children: [props.topContent &&
                                    _jsxs(_Fragment, { children: [props.topContent, _jsx(Spacer, { height: "one" })] }), (props.mainItems || []).map(z => {
                                    return _jsx(NavDrawerItem, { item: z }, z.title);
                                })] }), _jsx(Flex, { direction: "column", children: (props.bottomItems || []).map(z => {
                                return _jsx(NavDrawerItem, { item: z }, z.title);
                            }) })] }) }), _jsx("div", { className: "vieolo-nav-drawer__outer-area", children: _jsx("div", { className: `vieolo-nav-drawer__outer-area__${props.state}`, onClick: () => {
                        if (props.state === 'open')
                            props.onDrawerClose();
                    } }) })] });
}
function NavDrawerItem(props) {
    let t = _jsxs(Flex, { alignItems: "center", columnGap: "one", children: [props.item.icon && props.item.icon, _jsx(Typography, { text: props.item.title, fontWeight: 'bold' })] });
    let c = `vieolo-nav-drawer__item vieolo-nav-drawer__item--${props.item.selected ? "selected" : "not-selected"}`;
    if (props.item.href) {
        return _jsx("a", { href: props.item.href, className: c, children: t });
    }
    else {
        return _jsx("div", { className: c, onClick: props.item.onClick, children: t });
    }
}
