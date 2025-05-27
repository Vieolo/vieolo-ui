/// <reference types="react" />
import { PageFrameDrawerOptions, PageFrameNavbarOptions } from "../PageFrame";
import ConfirmationDialog from "../ConfirmationDialog";
type ConfirmationDialogPropType = React.ComponentProps<typeof ConfirmationDialog>;
export default function VieoloScaffold(props: {
    confirmation?: ConfirmationDialogPropType;
    drawer?: PageFrameDrawerOptions;
    navbar?: PageFrameNavbarOptions;
    hideNavbar?: boolean;
    routes: {
        /**
         * @example
         * ```js
         * "/blogs"
         * "/blogs/:id"
         * ```
         */
        path: string;
        page: React.ReactNode | React.ComponentType<any>;
        key?: string;
    }[];
}): JSX.Element;
export {};
