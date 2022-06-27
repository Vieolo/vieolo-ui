/// <reference types="react" />
export declare type DrawerItem = {
    title: string;
    icon?: React.ReactNode;
    selected?: boolean;
    href?: string;
    onClick?: () => void;
};
export default function NavDrawer(props: {
    state: 'open' | 'closed';
    topContent?: React.ReactNode;
    mainItems: DrawerItem[];
    bottomItems?: DrawerItem[];
    onDrawerClose: () => void;
}): JSX.Element;
