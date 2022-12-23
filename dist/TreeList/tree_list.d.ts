/// <reference types="react" />
export type TreeListItem = {
    title: string;
    id: string;
    icon?: React.ReactNode;
    selected?: boolean;
    children?: TreeListItem[];
};
export default function TreeList(props: {
    items: TreeListItem[];
    selectedID?: string;
    onItemSelect: (id: string, path: string) => void;
}): JSX.Element;
