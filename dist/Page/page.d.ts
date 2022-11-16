/// <reference types="react" />
import SubNavbarRow from "../SubNavbarRow";
type SubNavbarRowPropsType = React.ComponentProps<typeof SubNavbarRow>;
export default function Page(props: {
    hasSubNavbarRow?: boolean;
    children?: React.ReactNode;
    className?: string;
    subNavbarOptions?: SubNavbarRowPropsType;
}): JSX.Element;
export {};
