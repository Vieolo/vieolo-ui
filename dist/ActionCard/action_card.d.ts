/// <reference types="react" />
import Card from "../Card";
import { DropDownMenuItemType } from "../DropDownMenu";
declare type CardPropsType = React.ComponentProps<typeof Card>;
export default function ActionCard(props: {
    headerTitle: string;
    headerIcon?: React.ReactNode;
    dropDownMenu?: {
        items: DropDownMenuItemType[];
        onItemSelect: (v: string) => void;
    };
    footerComponents?: React.ReactNode[];
} & CardPropsType): JSX.Element;
export {};
