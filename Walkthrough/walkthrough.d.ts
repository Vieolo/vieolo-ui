/// <reference types="react" />
import { FormDialogMainButton } from "../FormDialog";
import { ColorOptionType } from "../types";
export type WalkthroughSinglePage = {
    /**
     * The number of the page in the walkthrough
     * The index is shown before the title of the page
     * index 0 (zero) won't be shown before the title, making it
     * suitable for introduction page of the walkthrough
     */
    index: number;
    /**
     * The title of the page of the walkthrough. Should be short
     */
    title: string;
    /**
     * For a better UX, the content of all of the pages should
     * have the same max height and width to have a consistent
     * look and feel
     */
    content: React.ReactNode;
    /**
     * Prevent the user from skipping the page
     */
    preventSkip?: boolean;
    /**
     * Prevent the user from going to the previous page
     */
    preventBack?: boolean;
};
export default function Walkthrough(props: {
    ariaLabel?: string;
    isLoading?: boolean;
    className?: string;
    displayType?: "modal" | "inline";
    currentPage: number;
    totalPage: number;
    backButtonConfig?: FormDialogMainButton;
    skipButtonConfig?: FormDialogMainButton;
    nextButtonConfig?: FormDialogMainButton;
    startButtonConfig?: FormDialogMainButton;
    doneButtonConfig?: FormDialogMainButton;
    disableNextButton?: boolean;
    pages: WalkthroughSinglePage[];
    progressBarConfig?: {
        color?: ColorOptionType;
        colorType?: "text" | "normal" | "light" | undefined;
        thickness?: "1" | "2";
    };
    /**
     * If this function is omited, there won't be a way for the user to cancel the walkthrough entirely
     */
    onCancel?: () => void;
    onSkip: () => void;
    onBack: () => void;
    onNext: () => void;
}): JSX.Element;
