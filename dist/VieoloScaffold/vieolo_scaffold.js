import { jsx as _jsx } from "react/jsx-runtime";
// React, Router
import { Switch, Route } from "react-router-dom";
// Vieolo UI
import PageFrame from "../PageFrame";
export default function VieoloScaffold(props) {
    return _jsx(PageFrame, { drawer: props.drawer, navbar: props.navbar, children: _jsx("main", { children: _jsx(Switch, { children: props.routes.map(r => {
                    if (r.path.includes("/:")) {
                        return _jsx(Route, { path: r.path, component: r.page }, r.path);
                    }
                    return _jsx(Route, { path: r.path, children: r.page }, r.path);
                }) }) }) });
}
