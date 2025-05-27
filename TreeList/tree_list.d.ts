/// <reference types="react" />
import Card from "../Card";
type CardPropType = Omit<React.ComponentProps<typeof Card>, "children" | "onClick">;
export type TreeListItem = {
    title: string;
    id: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    selected?: boolean;
    children?: TreeListItem[];
    /**
     * In some cases, the parent row is just a placeholder for the children and has
     * no actual functionality beside expanding and collapsing the list of children.
     * It should be used for row that have children
     */
    blockOnClick?: boolean;
    /**
     * If this string is provided, this item will have this title on the top, slightly
     * seperating it from the rest of the items. This is useful when you need the user
     * to be ablt to differentiate some of the items from the rest.
     */
    group?: {
        title: string;
        description?: string;
        card?: CardPropType;
    };
};
export default function TreeList(props: {
    items: TreeListItem[];
    selectedID?: string;
    onItemSelect: (id: string, path: string) => void;
}): JSX.Element;
export {};
