/// <reference types="react" />
import { ColorOptionType, EmphasisType, BorderRadiusType } from "../types/types";
export type ConfirmationDialogMainButton = {
    text?: string;
    color?: ColorOptionType;
    emphasis?: EmphasisType;
    borderRadius?: BorderRadiusType;
    ariaLabel?: string;
};
export default function ConfirmationDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onReject?: () => void;
    rejectButtonConfig?: ConfirmationDialogMainButton;
    acceptButtonConfig?: ConfirmationDialogMainButton;
    /** defaults to 10 */
    padding?: number;
    width: number | string;
    onAccept: () => void;
    removeRejectButton?: boolean;
    message?: string | React.ReactNode;
    /** If true, will not display the dialog as a modal */
    inline?: boolean;
}): JSX.Element;
