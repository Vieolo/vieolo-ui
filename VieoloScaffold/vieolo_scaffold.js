import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React, Router
import { Switch, Route } from "react-router-dom";
// Vieolo UI
import PageFrame from "../PageFrame";
import ConfirmationDialog from "../ConfirmationDialog";
export default function VieoloScaffold(props) {
    return _jsxs(PageFrame, { drawer: props.drawer, navbar: props.navbar, hideNavbar: props.hideNavbar, children: [_jsx("main", { children: _jsx(Switch, { children: props.routes.map(r => {
                        if (r.path.includes("/:")) {
                            return _jsx(Route, { path: r.path, component: r.page }, r.key || r.path);
                        }
                        return _jsx(Route, { path: r.path, children: r.page }, r.key || r.path);
                    }) }) }), props.confirmation &&
                _jsx(ConfirmationDialog, { ...props.confirmation })] });
}
