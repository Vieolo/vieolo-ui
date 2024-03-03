// React, Router
import { Switch, Route } from "react-router-dom";

// Vieolo UI
import PageFrame, { PageFrameDrawerOptions, PageFrameNavbarOptions } from "../PageFrame";
import ConfirmationDialog from "../ConfirmationDialog";

type ConfirmationDialogPropType = React.ComponentProps<typeof ConfirmationDialog>;

export default function VieoloScaffold(props: {
    confirmation?: ConfirmationDialogPropType,
    drawer?: PageFrameDrawerOptions,
    navbar?: PageFrameNavbarOptions,
    hideNavbar?: boolean,
    routes: {
        /** 
         * @example
         * ```js
         * "/blogs"
         * "/blogs/:id"
         * ```
         */
        path: string,
        page: React.ReactNode | React.ComponentType<any>,
        key?: string
    }[]
}) {
    return <PageFrame
        drawer={props.drawer}
        navbar={props.navbar}
        hideNavbar={props.hideNavbar}
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
        
        {
			props.confirmation &&
			<ConfirmationDialog
                {...props.confirmation}
			/>
		}
    </PageFrame>
}