// React
import React, { useState } from 'react';

// Component
import ConfirmationDialog from '../../ConfirmationDialog';
import Button from '../../Button';
import Typography from '../../Typography';


// Types
import { ViewData } from '../main/main';

type ConfirmationDialogPropsType = React.ComponentProps<typeof ConfirmationDialog>;

export function confirmationDialogOptions(): ViewData {

    return {
        constants: {
            onReject: () => { },
            onAccept: () => {
                alert("saved")
            },
        } as ConfirmationDialogPropsType,
        variables: {
            width: {
                options: ["500px", "30vw", "auto"],
                default: "auto"
            },
            padding: {
                options: ["10", "20", "30"],
                default: 10,
                type: "number"
            },
            removeRejectButton: {
                options: [false, true],
                default: false,
            },
            messageType: {
                options: ['string', 'component'],
                default: 'string'
            }
        }
    }
}


export function ConfirmationDialogCreator(props: { p: ConfirmationDialogPropsType }) {

    let [inline, setInline] = useState<boolean>(false);

    return <div className="background-color--primary-light padding--one center-by-flex-row">
        <ConfirmationDialog
            inline={inline}
            onReject={() => setInline(!inline)}
            onAccept={props.p.onAccept}
            width={props.p.width === "auto" ? undefined : props.p.width}
            padding={props.p.padding}
            removeRejectButton={props.p.removeRejectButton}
            message={
                (props.p as any).messageType === 'string'
                    ? "Are you sure you want to continue? This is a long message to see the effect of such long messages in responsiveness of the confirmation dialog"
                    : <div>
                        <Typography text='Are you sure you want to continue?' />
                        <div className="padding--half"></div>
                        <Typography type='caption-large' text='This action is not reversible' />
                        <div className="padding--half"></div>
                        <Button 
                            color='secondary'
                            text='Know More'
                            emphasis='none'
                        />
                    </div>
            }
        />
    </div>

}

