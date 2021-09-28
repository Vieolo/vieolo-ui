// Typography
import TypographyTitleSmall from "../typography/typography_title_small"

// Vieolo UI
import { ColorOptionType } from "../private/types"
import Modal from "./modal"
import IconButton from "../button/icon_button"
import Button from '../button/button';

// Material UI
import CloseIcon from '@material-ui/icons/CloseRounded';

export type FormDialogButton = {
    text: string,
    color: ColorOptionType,
    onClick: () => void
}

export default function FormDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onCancel: () => void,
    /** The text to appear in the cancel button, defaults to 'Cancel' */
    cancelText?: string,
    /** The text to appear in the save button, defaults to 'Save' */
    saveText?: string,
    /** defaults to 10 */
    padding?: number,
    width: number | string,
    onSave: () => void,
    removeCancelButton?: boolean,
    removeSaveButton?: boolean,
    /** These buttons will be displayed between the cancel and save button */
    extraButtons?: FormDialogButton[],
    children?: React.ReactNode,
    headerTitle: string,
    /** This component will be displayed on the right side of the header. You can either pass a component or pass 'close' which renders a close button */
    headerRightComponent?: 'close' | React.ReactNode
}) {
    return <Modal
        onClose={props.onCancel}
    >
        <div className="vieolo-form-dialog">
            <div className="vieolo-form-dialog__header flex-row-space-between">
                <TypographyTitleSmall text={props.headerTitle} />
                {
                    props.headerRightComponent === 'close' &&
                    <IconButton
                        icon={<CloseIcon />}
                        onClick={props.onCancel}
                        color={'primary'}
                        size={'small'}
                    />
                }
                {
                    (props.headerRightComponent && props.headerRightComponent !== 'close') &&
                    props.headerRightComponent
                }
            </div>

            <div className="vieolo-form-dialog__content" style={{ width: props.width, padding: props.padding === undefined ? 10 : props.padding }}>
                {props.children}
            </div>            

            {
                (!props.removeCancelButton || !props.removeSaveButton || props.extraButtons || (props.extraButtons || []).length > 0) &&
                <div className="vieolo-form-dialog__footer">
                    <div className="vieolo-form-dialog__footer__spacer--left"></div>
                    {
                        !props.removeCancelButton &&
                        <>
                            <Button
                                onClick={props.onCancel}
                                color={"error"}
                                text={props.cancelText || 'Cancel'}
                            />
                            <div className="vieolo-form-dialog__footer__spacer--middle"></div>
                        </>
                    }

                    {
                        (props.extraButtons || []).map((e, i) => {
                            return <>
                                <Button
                                    key={`form_dialog_extra_button_button_${i}`}
                                    color={e.color}
                                    text={e.text}
                                    onClick={e.onClick}
                                />
                                <div className="vieolo-form-dialog__footer__spacer--middle" key={`form_dialog_extra_button_spacer_${i}`}></div>
                            </>
                        })
                    }

                    {
                        !props.removeSaveButton &&
                        <Button
                            onClick={props.onSave}
                            color={"primary"}
                            text={props.saveText || 'Save'}
                        />
                    }
                </div>
            }
        </div>
    </Modal>
}