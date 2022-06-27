/// <reference types="react" />
import { PageFrameDrawerOptions, PageFrameNavbarOptions } from "../PageFrame";
export default function VieoloApp(props: {
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
    }[];
}): JSX.Element;
