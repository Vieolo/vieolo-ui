import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Flex from "../Flex";
import Spacer from "../Spacer";
import Typography from "../Typography";
import { ArrowDown, ArrowUp } from "../icons";
export default function NavDrawer(props) {
    let drawerClass = `vieolo-nav-drawer__drawer vieolo-nav-drawer__drawer--${props.state}`;
    if (props.alwaysOpen) {
        drawerClass += ` vieolo-nav-drawer__drawer--always-open`;
    }
    if (props.alwaysOpen) {
        drawerClass += ` vieolo-nav-drawer__drawer--responsive-${props.alwaysOpen.responsiveBreakpoint}`;
    }
    return _jsxs("div", { className: `vieolo-nav-drawer`, children: [_jsx("div", { className: drawerClass, children: _jsxs(Flex, { direction: "column", justifyContent: "space-between", className: "height--pc-100", children: [_jsxs(Flex, { direction: "column", children: [props.topContent &&
                                    _jsxs(_Fragment, { children: [props.topContent, _jsx(Spacer, { height: "one" })] }), (props.mainItems || []).map(z => {
                                    if (z.customComponent)
                                        return _jsx("div", { children: z.customComponent }, z.title);
                                    return _jsx(NavDrawerItem, { paddingLeft: props.itemPaddingLeft, item: z, open: z.children && z.children.length > 0 && props.openItems && props.openItems.includes(z.title), onOpenChange: o => {
                                            if (props.onOpenItemsChange && props.openItems) {
                                                let newList = o ? [...props.openItems, z.title] : props.openItems.filter(x => x !== z.title);
                                                props.onOpenItemsChange(newList);
                                            }
                                        }, onClickIntercepted: () => {
                                            if (props.onDrawerClose)
                                                props.onDrawerClose();
                                        } }, z.title);
                                })] }), _jsxs(Flex, { direction: "column", children: [(props.bottomItems || []).map(z => {
                                    return _jsx(NavDrawerItem, { item: z, paddingLeft: props.itemPaddingLeft, onClickIntercepted: () => {
                                            if (props.onDrawerClose)
                                                props.onDrawerClose();
                                        } }, z.title);
                                }), props.footPrint && props.footPrint] })] }) }), _jsx("div", { className: "vieolo-nav-drawer__outer-area", children: _jsx("div", { className: `vieolo-nav-drawer__outer-area__${props.state}`, onClick: () => {
                        if (props.state === 'open' && props.onDrawerClose)
                            props.onDrawerClose();
                    } }) })] });
}
function NavDrawerItem(props) {
    let t = _jsxs(Flex, { alignItems: "center", columnGap: "one", children: [props.item.icon && props.item.icon, _jsx(Typography, { text: props.item.title, fontWeight: 'bold' })] });
    let c = `vieolo-nav-drawer__item vieolo-nav-drawer__item--${props.item.selected ? "selected" : "not-selected"}`;
    c += ` vieolo-nav-drawer__item--${props.item.height || 'medium'}`;
    c += ` padding-left--${props.paddingLeft || 'two'}`;
    if (props.item.newGroup) {
        c += ` margin-top--two `;
    }
    if (props.item.href && (!props.item.children || props.item.children.length === 0)) {
        return _jsx("a", { href: props.item.href, className: c, onClick: e => {
                if (props.item.onClick) {
                    // Preventing the default when clicked
                    // The on click functionality will be handled by the implementor to prevent unnecessary reload of the page
                    e.preventDefault();
                    props.item.onClick();
                    props.onClickIntercepted();
                }
            }, children: t });
    }
    else if (props.item.children && props.item.children.length > 0) {
        return _jsxs(Flex, { direction: "column", children: [_jsx("div", { className: c, onClick: () => {
                        if (props.onOpenChange)
                            props.onOpenChange(!(props.open || false));
                    }, children: _jsxs(Flex, { alignItems: "center", justifyContent: "space-between", className: "width--pc-100 padding-right--one", children: [_jsxs(Flex, { alignItems: "center", columnGap: "one", children: [props.item.icon && props.item.icon, _jsx(Typography, { text: props.item.title, fontWeight: 'bold' })] }), props.open
                                ? _jsx(ArrowUp, {})
                                : _jsx(ArrowDown, {})] }) }), props.open &&
                    _jsx(Flex, { direction: "column", className: "margin-bottom--half", children: props.item.children.map(child => {
                            let childClass = `vieolo-nav-drawer__item__child`;
                            if (child.selected)
                                childClass = `${childClass} ${childClass}--selected`;
                            let content = _jsx(_Fragment, { children: _jsxs(Flex, { alignItems: "center", columnGap: "half", children: [child.icon
                                            ? child.icon
                                            : _jsx(Spacer, { width: "half" }), _jsx("p", { children: child.title })] }) });
                            if (child.href) {
                                return _jsx("a", { href: child.href, className: childClass, onClick: e => {
                                        if (child.onClick) {
                                            // Preventing the default when clicked
                                            // The on click functionality will be handled by the implementor to prevent unnecessary reload of the page
                                            e.preventDefault();
                                            child.onClick();
                                        }
                                    }, children: content }, child.title);
                            }
                            return _jsx("div", { className: childClass, onClick: child.onClick, children: content }, child.title);
                        }) })] });
    }
    else {
        return _jsx("div", { className: c, onClick: props.item.onClick, children: t });
    }
}
