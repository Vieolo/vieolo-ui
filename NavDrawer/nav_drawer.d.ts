/// <reference types="react" />
export type DrawerSubItem = {
    title: string;
    icon?: React.ReactNode;
    selected?: boolean;
    href?: string;
    onClick?: () => void;
};
export type DrawerItem = {
    /** The title of the item. If custom component is also provided, the title acts as key */
    title: string;
    icon?: React.ReactNode;
    selected?: boolean;
    href?: string;
    onClick?: () => void;
    height?: 'medium' | 'large' | 'small';
    newGroup?: boolean;
    customComponent?: React.ReactNode;
    children?: DrawerSubItem[];
};
export default function NavDrawer(props: {
    state: 'open' | 'closed';
    topContent?: React.ReactNode;
    mainItems: DrawerItem[];
    bottomItems?: DrawerItem[];
    onDrawerClose?: () => void;
    footPrint?: React.ReactNode;
    alwaysOpen?: {
        responsiveBreakpoint: 'xl' | 'lg' | 'md' | 'sm';
    };
    /** Defaults to two */
    itemPaddingLeft?: 'none' | 'half' | 'one' | 'two';
    openItems?: string[];
    onOpenItemsChange?: (oi: string[]) => void;
}): JSX.Element;
