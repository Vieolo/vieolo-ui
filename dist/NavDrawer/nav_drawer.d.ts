/// <reference types="react" />
export type DrawerItem = {
    title: string;
    icon?: React.ReactNode;
    selected?: boolean;
    href?: string;
    onClick?: () => void;
    height?: 'medium' | 'large' | 'small';
    newGroup?: boolean;
};
export default function NavDrawer(props: {
    state: 'open' | 'closed';
    topContent?: React.ReactNode;
    mainItems: DrawerItem[];
    bottomItems?: DrawerItem[];
    onDrawerClose: () => void;
    footPrint?: React.ReactNode;
    /** Defaults to two */
    itemPaddingLeft?: 'none' | 'half' | 'one' | 'two';
}): JSX.Element;
