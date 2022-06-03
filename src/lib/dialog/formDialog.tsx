// React
import { Fragment } from "react"

// Vieolo UI
import { ColorOptionType, EmphasisType, BorderRadiusType } from "../private/types"
import Typography from "../typography/typography"
import Modal from "./modal"
import IconButton from "../button/icon_button"
import Button from '../button/button';

// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';

export type FormDialogAccessoryButton = {
    text: string,
    color: ColorOptionType,
    onClick: () => void,
    ariaLabel?: string
}

export type FormDialogMainButton = {
    text?: string,
    color?: ColorOptionType,
    emphasis?: EmphasisType,
    borderRadius?: BorderRadiusType,
    ariaLabel?: string
}

export default function FormDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onCancel: () => void,
    cancelButtonConfig?: FormDialogMainButton,
    saveButtonConfig?: FormDialogMainButton,
    /** defaults to 10 */
    padding?: number,
    width?: number | string,
    onSave: () => void,
    /** Passing true will cause the save button to be disabled. Usefull when preventing the user from submitting invalid form */
    saveButtonDisabled?: boolean,
    removeCancelButton?: boolean,
    removeSaveButton?: boolean,
    /** These buttons will be displayed between the cancel and save button */
    extraButtons?: FormDialogAccessoryButton[],
    children?: React.ReactNode,
    headerTitle: string,
    /** This component will be displayed on the right side of the header. You can either pass a component or pass 'close' which renders a close button */
    headerRightComponent?: 'close' | React.ReactNode,
    /** If true, will not display the dialog as a modal */
    inline?: boolean,
    ariaLabel?: string,
    className?: string
}) {

    let dialog = <div className="vieolo-form-dialog" aria-label={props.ariaLabel}>
        <div className="vieolo-form-dialog__header flex-row-space-between">
            <Typography type="title-small" text={props.headerTitle} />
            {
                props.headerRightComponent === 'close' &&
                <IconButton
                    icon={<CloseIcon />}
                    onClick={props.onCancel}
                    color={'primary'}
                    size={'small'}
                    aria-label={props.ariaLabel ? `${props.ariaLabel} close button` : undefined}
                />
            }
            {
                (props.headerRightComponent && props.headerRightComponent !== 'close') &&
                props.headerRightComponent
            }
        </div>

        <div className={`vieolo-form-dialog__content ${props.className || ''}`} style={{ width: props.width, padding: props.padding === undefined ? 10 : props.padding }}>
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
                            color={(props.cancelButtonConfig && props.cancelButtonConfig.color) ? props.cancelButtonConfig.color : "error"}
                            text={(props.cancelButtonConfig && props.cancelButtonConfig.text) ? props.cancelButtonConfig.text : "Cancel"}
                            borderRadius={(props.cancelButtonConfig && props.cancelButtonConfig.borderRadius) ? props.cancelButtonConfig.borderRadius : undefined}
                            emphasis={(props.cancelButtonConfig && props.cancelButtonConfig.emphasis) ? props.cancelButtonConfig.emphasis : "none"}
                            ariaLabel={props.cancelButtonConfig ? props.cancelButtonConfig.ariaLabel : undefined}
                        />
                        <div className="vieolo-form-dialog__footer__spacer--middle"></div>
                    </>
                }

                {
                    (props.extraButtons || []).map((e, i) => {
                        return <Fragment key={`form_dialog_extra_button_fragment_${i}`} >
                            <Button
                                key={`form_dialog_extra_button_button_${i}`}
                                color={e.color}
                                text={e.text}
                                onClick={e.onClick}
                                ariaLabel={e.ariaLabel}
                            />
                            <div className="vieolo-form-dialog__footer__spacer--middle" key={`form_dialog_extra_button_spacer_${i}`}></div>
                        </Fragment>
                    })
                }

                {
                    !props.removeSaveButton &&
                    <Button
                        onClick={props.onSave}
                        color={(props.saveButtonConfig && props.saveButtonConfig.color) ? props.saveButtonConfig.color : "primary"}
                        text={(props.saveButtonConfig && props.saveButtonConfig.text) ? props.saveButtonConfig.text : "Save"}
                        borderRadius={(props.saveButtonConfig && props.saveButtonConfig.borderRadius) ? props.saveButtonConfig.borderRadius : undefined}
                        emphasis={(props.saveButtonConfig && props.saveButtonConfig.emphasis) ? props.saveButtonConfig.emphasis : undefined}
                        ariaLabel={props.saveButtonConfig ? props.saveButtonConfig.ariaLabel : undefined}
                        disabled={props.saveButtonDisabled}
                    />
                }
            </div>
        }
    </div>

    if (props.inline) return dialog;

    return <Modal
        onClose={props.onCancel}
    >
        {dialog}
    </Modal>
}