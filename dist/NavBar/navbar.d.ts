/// <reference types="react" />
import { ElevationType } from "../types";
export default function Navbar(props: {
    elevation?: ElevationType;
    logo?: React.ReactNode;
    title?: string;
    /** The URL that the user is redirected to when clicked on the logo */
    logoRedirectURL?: string;
    hasDrawerButton?: boolean;
    drawerButton?: React.ReactNode;
    onDrawerButtonClicked?: () => void;
    onSearchSubmit?: (query: string) => void;
    rightComponents?: React.ReactNode[];
    searchPlaceholder?: string;
    drawerState?: 'open' | 'close';
}): JSX.Element;
