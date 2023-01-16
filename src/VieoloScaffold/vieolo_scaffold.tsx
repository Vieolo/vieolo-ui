// React, Router
import { Switch, Route } from "react-router-dom";

// Vieolo UI
import PageFrame, { PageFrameDrawerOptions, PageFrameNavbarOptions } from "../PageFrame";

export default function VieoloScaffold(props: {
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
        page: React.ReactNode,
        key?: string
    }[]
}) {
    return <PageFrame
        drawer={props.drawer}
        navbar={props.navbar}
    >
        <main>
            <Switch>
                {
                    props.routes.map(r => {
                        if (r.path.includes("/:")) {
                            return <Route path={r.path} component={r.page as any} key={r.key || r.path} />
                        }
                        return <Route path={r.path} key={r.key || r.path}>
                            {r.page}
                        </Route>
                    })
                }
            </Switch>
        </main>
    </PageFrame>
}