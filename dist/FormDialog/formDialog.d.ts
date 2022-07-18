/// <reference types="react" />
import { ColorOptionType, EmphasisType, BorderRadiusType } from "../types/types";
export declare type FormDialogAccessoryButton = {
    text: string;
    color: ColorOptionType;
    onClick: () => void;
    ariaLabel?: string;
};
export declare type FormDialogMainButton = {
    text?: string;
    color?: ColorOptionType;
    emphasis?: EmphasisType;
    borderRadius?: BorderRadiusType;
    ariaLabel?: string;
};
export default function FormDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onCancel: () => void;
    cancelButtonConfig?: FormDialogMainButton;
    saveButtonConfig?: FormDialogMainButton;
    /** defaults to 10 */
    padding?: number;
    width?: number | string;
    onSave: () => void;
    /** Passing true will cause the save button to be disabled. Usefull when preventing the user from submitting invalid form */
    saveButtonDisabled?: boolean;
    removeCancelButton?: boolean;
    removeSaveButton?: boolean;
    /** These buttons will be displayed between the cancel and save button */
    extraButtons?: FormDialogAccessoryButton[];
    children?: React.ReactNode;
    headerTitle: string;
    /** This component will be displayed on the right side of the header. You can either pass a component or pass 'close' which renders a close button */
    headerRightComponent?: 'close' | React.ReactNode;
    /** If true, will not display the dialog as a modal */
    inline?: boolean;
    ariaLabel?: string;
    className?: string;
    isLoading?: boolean;
}): JSX.Element;
