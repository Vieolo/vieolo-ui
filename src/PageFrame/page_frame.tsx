// React
import { useState } from 'react';

// Vieolo UI
import Navbar from '../NavBar';
import NavDrawer, { DrawerItem } from '../NavDrawer';

// Types
import { ElevationType } from "../types"

export type PageFrameDrawerOptions = {
    mainItems: DrawerItem[],
    bottomItems?: DrawerItem[],
    topContent?: React.ReactNode,
    footPrint?: React.ReactNode,
}

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
}) {

    let [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return <div className="vieolo-page-frame">
        {
            props.navbar &&
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
            />
        }

        {
            props.drawer &&
            <NavDrawer
                state={drawerOpen ? "open" : 'closed'}
                mainItems={props.drawer.mainItems}
                bottomItems={props.drawer.bottomItems}
                topContent={props.drawer.topContent}
                footPrint={props.drawer.footPrint}
                onDrawerClose={() => setDrawerOpen(false)}
            />
        }

        {props.children}
    </div>
}