import { jsx as _jsx } from "react/jsx-runtime";
// React, Router
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider as ReactReduxProvider } from "react-redux";
export default function VieoloApp(props) {
    let c = props.children || _jsx("div", {});
    let one;
    let two;
    let three;
    if (!props.removeStrictMode) {
        one = _jsx(React.StrictMode, { children: c });
    }
    else
        one = c;
    if (props.store) {
        two = _jsx(ReactReduxProvider, { store: props.store, children: one });
    }
    else
        two = one;
    if (!props.removeRouter) {
        three = _jsx(Router, { children: two });
    }
    else
        three = two;
    return three;
}
