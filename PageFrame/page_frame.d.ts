/// <reference types="react" />
import NavDrawer from '../NavDrawer';
import { ElevationType } from "../types";
export type PageFrameDrawerOptions = Omit<React.ComponentProps<typeof NavDrawer>, "state" | "onDrawerClose" | 'openItems' | "onOpenItemsChange">;
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
    hideNavbar?: boolean;
}): JSX.Element;
