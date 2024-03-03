// React
import { useState } from 'react';

// Vieolo UI
import Navbar from '../NavBar';
import NavDrawer from '../NavDrawer';

// Types
import { ElevationType } from "../types"

export type PageFrameDrawerOptions = Omit<React.ComponentProps<typeof NavDrawer>, "state" | "onDrawerClose" | 'openItems' | "onOpenItemsChange"> 

export type PageFrameNavbarOptions = {
    elevation?: ElevationType,
    logo?: React.ReactNode,
    /** The URL that the user is redirected to when clicked on the logo */
    logoRedirectURL?: string,
    title?: string,
    drawerButton?: React.ReactNode,
    onDrawerButtonClicked?: () => void,
    onSearchSubmit?: (query: string) => void,
    rightComponents?: React.ReactNode[],
    searchPlaceholder?: string
}


export default function PageFrame(props: {
    children?: React.ReactNode,
    navbar?: PageFrameNavbarOptions,
    drawer?: PageFrameDrawerOptions,
    hideNavbar?: boolean,
}) {

    let [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    let [openItems, setOpenItems] = useState<string[]>(
        props.drawer 
            ? props.drawer.mainItems.filter(z => z.children && z.children.length > 0 && z.children.some(x => x.selected)).map(z => z.title)
            : []
    );


    return <div className="vieolo-page-frame">
        {
            (props.navbar && !props.hideNavbar)  &&
            <Navbar
                drawerButton={props.navbar.drawerButton}
                elevation={props.navbar.elevation}
                logoRedirectURL={props.navbar.logoRedirectURL}
                hasDrawerButton={props.drawer !== undefined}
                logo={props.navbar.logo}
                onDrawerButtonClicked={props.drawer === undefined ? undefined : () => {
                    setDrawerOpen(!drawerOpen);
                    if (props.navbar?.onDrawerButtonClicked) props.navbar.onDrawerButtonClicked()
                }}
                onSearchSubmit={props.navbar.onSearchSubmit}
                rightComponents={props.navbar.rightComponents}
                searchPlaceholder={props.navbar.searchPlaceholder}
                title={props.navbar.title}
                drawerState={drawerOpen ? 'open' : 'close'}
                alwaysOpen={props.drawer?.alwaysOpen}
            />
        }

        {
            props.drawer &&
            <NavDrawer
                {...props.drawer}
                state={drawerOpen ? "open" : 'closed'}                
                onDrawerClose={() => setDrawerOpen(false)}
                openItems={openItems}
                onOpenItemsChange={n => setOpenItems(n)}
            />
        }

        {
            (!props.drawer || !props.drawer.alwaysOpen)
                ? props.children
                : <div className={`vieolo-page-frame--with-always-open-drawer vieolo-page-frame--with-always-open-drawer--responsive-${props.drawer.alwaysOpen.responsiveBreakpoint}`}>
                    {props.children}
                </div>
        }
    </div>
}