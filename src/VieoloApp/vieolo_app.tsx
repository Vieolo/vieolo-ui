// React, Router
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Vieolo UI
import PageFrame, { PageFrameDrawerOptions, PageFrameNavbarOptions } from "../PageFrame";

export default function VieoloApp(props: {
    drawer?: PageFrameDrawerOptions,
    navbar?: PageFrameNavbarOptions,
    routes: {
        /** 
         * @example
         * ```js
         * "/blogs"
         * "/blogs/:id"
         * ```
         */
        path: string,
        page: React.ReactNode
    }[]
}) {
    return <Router>
        <PageFrame
            drawer={props.drawer}
            navbar={props.navbar}
        >
            <main>
                <Switch>
                    {
                        props.routes.map(r => {
                            if (r.path.includes("/:")) {
                                return <Route path={r.path} component={r.page as any} key={r.path} />
                            }
                            return <Route path={r.path} key={r.path}>
                                {r.page}
                            </Route>
                        })
                    }
                </Switch>
            </main>
        </PageFrame>
    </Router>
}