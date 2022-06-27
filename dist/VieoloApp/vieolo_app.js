import { jsx as _jsx } from "react/jsx-runtime";
// React, Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// Vieolo UI
import PageFrame from "../PageFrame";
export default function VieoloApp(props) {
    return _jsx(Router, { children: _jsx(PageFrame, Object.assign({ drawer: props.drawer, navbar: props.navbar }, { children: _jsx("main", { children: _jsx(Switch, { children: props.routes.map(r => {
                        if (r.path.includes("/:")) {
                            return _jsx(Route, { path: r.path, component: r.page }, r.path);
                        }
                        return _jsx(Route, Object.assign({ path: r.path }, { children: r.page }), r.path);
                    }) }, void 0) }, void 0) }), void 0) }, void 0);
}
