/// <reference types="react" />
import { PageFrameDrawerOptions, PageFrameNavbarOptions } from "../PageFrame";
export default function VieoloScaffold(props: {
    drawer?: PageFrameDrawerOptions;
    navbar?: PageFrameNavbarOptions;
    routes: {
        /**
         * @example
         * ```js
         * "/blogs"
         * "/blogs/:id"
         * ```
         */
        path: string;
        page: React.ReactNode;
        key?: string;
    }[];
}): JSX.Element;
