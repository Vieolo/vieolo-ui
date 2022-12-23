// React, Router
import React from "react";
import { BrowserRouter as Router} from "react-router-dom";
import { Provider as ReactReduxProvider } from "react-redux";

export default function VieoloApp(props: {
    removeRouter?: boolean,
    removeStrictMode?: boolean,
    store?: any,
    children?: JSX.Element
}) : JSX.Element {
    let c = props.children || <div></div>;
    let one;
    let two;
    let three;

    if (!props.removeStrictMode) {
        one = <React.StrictMode>
            {c}
        </React.StrictMode>
    } else one = c

    if (props.store) {
        two = <ReactReduxProvider store={props.store}>
            {one}
        </ReactReduxProvider>
    } else two = one

    if (!props.removeRouter) {
        three = <Router>
            {two}
        </Router>
    } else three = two


    return three
}