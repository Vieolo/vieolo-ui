// React
import { Fragment } from "react"

// Typography

// Vieolo UI
import { ColorOptionType, EmphasisType, BorderRadiusType } from "../types/types"
import Modal from "../Modal"
import Button from '../Button';
import Typography from "../Typography";


export type ConfirmationDialogMainButton = {
    text?: string,
    color?: ColorOptionType,
    emphasis?: EmphasisType,
    borderRadius?: BorderRadiusType,
    ariaLabel?: string
}

export default function ConfirmationDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onReject?: () => void,
    rejectButtonConfig?: ConfirmationDialogMainButton,
    acceptButtonConfig?: ConfirmationDialogMainButton,
    /** defaults to 10 */
    padding?: number,
    width: number | string,
    onAccept: () => void,
    removeRejectButton?: boolean,
    message?: string | React.ReactNode,
    /** If true, will not display the dialog as a modal */
    inline?: boolean
}) {

    let dialog = <div className="vieolo-confirmation-dialog" aria-label="Confirmation Dialog">

        <div className="vieolo-form-dialog__message" style={{ width: props.width, padding: props.padding === undefined ? 10 : props.padding }}>
            {
                typeof props.message === 'string'
                    ? <Typography type="paragraph-large" text={props.message} />
                    : <>
                        {props.message}
                    </>
            }
        </div>

        <div className="vieolo-confirmation-dialog__footer">
            <div className="vieolo-confirmation-dialog__footer__spacer--left"></div>
            {
                !props.removeRejectButton &&
                <>
                    <Button
                        onClick={() => {
                            if (props.onReject) props.onReject();
                        }}
                        color={(props.rejectButtonConfig && props.rejectButtonConfig.color) ? props.rejectButtonConfig.color : "error"}
                        text={(props.rejectButtonConfig && props.rejectButtonConfig.text) ? props.rejectButtonConfig.text : "Cancel"}
                        borderRadius={(props.rejectButtonConfig && props.rejectButtonConfig.borderRadius) ? props.rejectButtonConfig.borderRadius : undefined}
                        emphasis={(props.rejectButtonConfig && props.rejectButtonConfig.emphasis) ? props.rejectButtonConfig.emphasis : "none"}
                        ariaLabel={props.rejectButtonConfig ? props.rejectButtonConfig.ariaLabel : undefined}
                    />
                    <div className="vieolo-form-dialog__footer__spacer--middle"></div>
                </>
            }

            <Button
                onClick={props.onAccept}
                color={(props.acceptButtonConfig && props.acceptButtonConfig.color) ? props.acceptButtonConfig.color : "primary"}
                text={(props.acceptButtonConfig && props.acceptButtonConfig.text) ? props.acceptButtonConfig.text : "Ok"}
                borderRadius={(props.acceptButtonConfig && props.acceptButtonConfig.borderRadius) ? props.acceptButtonConfig.borderRadius : undefined}
                emphasis={(props.acceptButtonConfig && props.acceptButtonConfig.emphasis) ? props.acceptButtonConfig.emphasis : undefined}
                ariaLabel={props.acceptButtonConfig ? props.acceptButtonConfig.ariaLabel : undefined}
            />
        </div>
    </div>

    if (props.inline) return dialog;

    return <Modal
        onClose={() => {
            if (props.onReject) props.onReject();
        }}
    >
        {dialog}
    </Modal>
}