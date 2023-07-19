// React
import { useEffect, useState } from "react"

// Vieolo UI
import { ColorOptionType, EmphasisType, BorderRadiusType } from "../types/types"
import Typography from "../Typography"
import Modal from "../Modal/modal"
import IconButton from "../IconButton"
import Button from '../Button/button';
import Flex from "../Flex"

//Installed Packages
import Device from '@vieolo/device-js';

// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';

export type FormDialogAccessoryButton = {
    text: string,
    color: ColorOptionType,
    onClick: () => void,
    ariaLabel?: string,
    emphasis?: EmphasisType,
    borderRadius?: BorderRadiusType,
    startIcon?: React.ReactNode
}

export type FormDialogMainButton = {
    text?: string,
    color?: ColorOptionType,
    emphasis?: EmphasisType,
    borderRadius?: BorderRadiusType,
    ariaLabel?: string,
    startIcon?: React.ReactNode
}

export default function FormDialog(props: {
    /** Function to be triggered when the user clicks cancel or closes the modal */
    onCancel: () => void,
    cancelButtonConfig?: FormDialogMainButton,
    saveButtonConfig?: FormDialogMainButton,
    /** defaults to 10 */
    padding?: number,
    /** 
     * @deprecated
     * Add the width to the content
     */
    width?: number | string,
    onSave: () => void,
    /** Passing true will cause the save button to be disabled. Usefull when preventing the user from submitting invalid form */
    saveButtonDisabled?: boolean,
    removeCancelButton?: boolean,
    removeSaveButton?: boolean,
    /** These buttons will be displayed on the left side of the save button */
    extraButtons?: FormDialogAccessoryButton[],
    /** These buttons will be displayed on the right side of the cancel button */
    extraButtonsLeft?: FormDialogAccessoryButton[],
    children?: React.ReactNode,
    headerTitle: string,
    /** This component will be displayed on the right side of the header. You can either pass a component or pass 'close' which renders a close button */
    headerRightComponent?: 'close' | React.ReactNode,
    /** If true, will not display the dialog as a modal */
    inline?: boolean,
    ariaLabel?: string,
    className?: string,
    isLoading?: boolean
}) {

    let [virtKeyboardOffset, setVirtKeyboardOffset] = useState<number>(0);

    useEffect(() => {
        const handleVirtualKeyboard = (event: Event) => {
            const viewport = window.visualViewport!;
            let value = viewport.offsetTop ? viewport.offsetTop : window.innerHeight - viewport.height
            setVirtKeyboardOffset(value)
            if (value && Device.isAnAppleDevice()) window.scrollBy({ top: -viewport.offsetTop })
        }

        if (Device.isTouchOnlyDevice && window.visualViewport) {
            window.visualViewport.addEventListener("resize", handleVirtualKeyboard);
            // window.visualViewport.addEventListener("scroll", handleVirtualKeyboard);
        }

        return () => {
            if (Device.isTouchOnlyDevice && window.visualViewport) {
                window.visualViewport.removeEventListener("resize", handleVirtualKeyboard);
                // window.visualViewport.removeEventListener("scroll", handleVirtualKeyboard);
            }
        }
    }, [])

    let dClass = "vieolo-form-dialog";
    let footerButtonSize: 'small' | "medium" = "medium"

    if (!props.inline && virtKeyboardOffset > 0) {
        dClass += " vieolo-form-dialog--keyboard-open"
        footerButtonSize = "small"
    }

    let dialog = <div className={dClass} aria-label={props.ariaLabel}>
        <div className="vieolo-form-dialog__header flex-row-space-between">
            <Typography type="title-small" text={props.headerTitle} />
            {
                props.headerRightComponent === 'close' &&
                <IconButton
                    icon={<CloseIcon />}
                    onClick={() => {
                        if (!props.isLoading) props.onCancel()
                    }}
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
                <Flex justifyContent="start" alignItems="center" columnGap="half">
                    {
                        !props.removeCancelButton &&
                        <Button
                            height={footerButtonSize}
                            onClick={props.onCancel}
                            color={(props.cancelButtonConfig && props.cancelButtonConfig.color) ? props.cancelButtonConfig.color : "error"}
                            text={(props.cancelButtonConfig && props.cancelButtonConfig.text) ? props.cancelButtonConfig.text : "Cancel"}
                            borderRadius={(props.cancelButtonConfig && props.cancelButtonConfig.borderRadius) ? props.cancelButtonConfig.borderRadius : undefined}
                            emphasis={(props.cancelButtonConfig && props.cancelButtonConfig.emphasis) ? props.cancelButtonConfig.emphasis : "none"}
                            ariaLabel={getButtonAriaLabel(props.headerTitle, "cancel button", props.ariaLabel, props.cancelButtonConfig)}
                            disabled={props.isLoading}
                            startIcon={(props.cancelButtonConfig || {}).startIcon}
                        />
                    }

                    {
                        (props.extraButtonsLeft || []).map((e, i) => {
                            return <Button
                                key={`form_dialog_extra_button_button_${i}`}
                                color={e.color}
                                text={e.text}
                                onClick={e.onClick}
                                ariaLabel={getButtonAriaLabel(props.headerTitle, e.text, props.ariaLabel, e)}
                                disabled={props.isLoading}
                                height={footerButtonSize}
                                emphasis={e.emphasis}
                                borderRadius={e.borderRadius}
                                startIcon={e.startIcon}
                            />
                        })
                    }
                </Flex>

                <Flex alignItems="center" justifyContent="end" columnGap="half">
                    {
                        (props.extraButtons || []).map((e, i) => {
                            return <Button
                                key={`form_dialog_extra_button_button_${i}`}
                                color={e.color}
                                text={e.text}
                                onClick={e.onClick}
                                ariaLabel={getButtonAriaLabel(props.headerTitle, e.text, props.ariaLabel, e)}
                                disabled={props.isLoading}
                                height={footerButtonSize}
                                emphasis={e.emphasis}
                                borderRadius={e.borderRadius}
                                startIcon={e.startIcon}
                            />
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
                            ariaLabel={getButtonAriaLabel(props.headerTitle, "save button", props.ariaLabel, props.saveButtonConfig)}
                            disabled={props.saveButtonDisabled || props.isLoading}
                            isLoading={props.isLoading}
                            height={footerButtonSize}
                            startIcon={(props.saveButtonConfig || {}).startIcon}
                        />
                    }
                </Flex>
            </div>
        }
    </div>

    if (props.inline) return dialog;

    return <Modal
        onClose={() => {
            if (!props.isLoading) props.onCancel()
        }}
        position={virtKeyboardOffset > 0 ? 'top' : 'center'}
    >
        {dialog}
    </Modal>
}

function getButtonAriaLabel(headerTitle: string, buttonType: string, dialogAL?: string, buttonConfig?: { ariaLabel?: string },): string {
    if (buttonConfig && buttonConfig.ariaLabel) return buttonConfig.ariaLabel
    if (dialogAL) return `${dialogAL} ${buttonType}`
    return `${headerTitle} ${buttonType}`
}