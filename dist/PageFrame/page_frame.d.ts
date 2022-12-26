/// <reference types="react" />
import { DrawerItem } from '../NavDrawer';
import { ElevationType } from "../types";
export type PageFrameDrawerOptions = {
    mainItems: DrawerItem[];
    bottomItems?: DrawerItem[];
    topContent?: React.ReactNode;
    footPrint?: React.ReactNode;
};
export type PageFrameNavbarOptions = {
    elevation?: ElevationType;
    logo?: React.ReactNode;
    /** The URL that the user is redirected to when clicked on the logo */
    logoRedirectURL?: string;
    title?: string;
    drawerButton?: React.ReactNode;
    onDrawerButtonClicked?: () => void;
    onSearchSubmit?: (query: string) => void;
    rightComponents?: React.ReactNode[];
    searchPlaceholder?: string;
};
export default function PageFrame(props: {
    children?: React.ReactNode;
    navbar?: PageFrameNavbarOptions;
    drawer?: PageFrameDrawerOptions;
}): JSX.Element;
