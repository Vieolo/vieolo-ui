/// <reference types="react" />
import { ColorOptionType, EmphasisType, BorderRadiusType } from "../types/types";
export type FormDialogAccessoryButton = {
    text: string;
    color: ColorOptionType;
    onClick: () => void;
    ariaLabel?: string;
    emphasis?: EmphasisType;
    borderRadius?: BorderRadiusType;
    startIcon?: React.ReactNode;
};
export type FormDialogMainButton = {
    text?: string;
    color?: ColorOptionType;
    emphasis?: EmphasisType;
    borderRadius?: BorderRadiusType;
    ariaLabel?: string;
    startIcon?: React.ReactNode;
};
export default function FormDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onCancel: () => void;
    cancelButtonConfig?: FormDialogMainButton;
    saveButtonConfig?: FormDialogMainButton;
    /** defaults to 10 */
    padding?: number;
    /**
     * @deprecated
     * Add the width to the content
     */
    width?: number | string;
    onSave: () => void;
    /** Passing true will cause the save button to be disabled. Usefull when preventing the user from submitting invalid form */
    saveButtonDisabled?: boolean;
    removeCancelButton?: boolean;
    removeSaveButton?: boolean;
    /** These buttons will be displayed on the left side of the save button */
    extraButtons?: FormDialogAccessoryButton[];
    /** These buttons will be displayed on the right side of the cancel button */
    extraButtonsLeft?: FormDialogAccessoryButton[];
    children?: React.ReactNode;
    headerTitle: string;
    /** This component will be displayed on the right side of the header. You can either pass a component or pass 'close' which renders a close button */
    headerRightComponent?: 'close' | React.ReactNode;
    /** If true, will not display the dialog as a modal */
    inline?: boolean;
    ariaLabel?: string;
    className?: string;
    isLoading?: boolean;
    disableOverflowScroll?: boolean;
    /** If set to true, the dialog will be set to full screen in the mobile (sm) layout */
    smFullScreen?: boolean;
}): JSX.Element;
