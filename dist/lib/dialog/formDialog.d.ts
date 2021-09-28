/// <reference types="react" />
import { ColorOptionType } from "../private/types";
export declare type FormDialogButton = {
    text: string;
    color: ColorOptionType;
    onClick: () => void;
};
export default function FormDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onCancel: () => void;
    /** The text to appear in the cancel button, defaults to 'Cancel' */
    cancelText?: string;
    /** The text to appear in the save button, defaults to 'Save' */
    saveText?: string;
    /** defaults to 10 */
    padding?: number;
    width: number | string;
    onSave: () => void;
    /** Passing true will cause the save button to be disabled. Usefull when preventing the user from submitting invalid form */
    saveButtonDisabled?: boolean;
    removeCancelButton?: boolean;
    removeSaveButton?: boolean;
    /** These buttons will be displayed between the cancel and save button */
    extraButtons?: FormDialogButton[];
    children?: React.ReactNode;
    headerTitle: string;
    /** This component will be displayed on the right side of the header. You can either pass a component or pass 'close' which renders a close button */
    headerRightComponent?: 'close' | React.ReactNode;
}): JSX.Element;
