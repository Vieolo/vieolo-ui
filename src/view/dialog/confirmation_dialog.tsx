// React
import React from 'react';

// Component
import ConfirmationDialog from '../../lib/dialog/confirmationDialog';
import Button from '../../lib/button/button';
import { TypographyCaptionLarge, TypographyParagraphMedium } from '../../lib/typography';


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
                options: ["500px", "30vw"],
                default: "500px"
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


    return <div className="background-color--primary-light padding--one center-by-flex-row">
        <ConfirmationDialog
            inline
            onReject={props.p.onReject}
            onAccept={props.p.onAccept}
            width={props.p.width}
            padding={props.p.padding}
            removeRejectButton={props.p.removeRejectButton}
            message={
                (props.p as any).messageType === 'string'
                    ? "Are you sure you want to continue?"
                    : <div>
                        <TypographyParagraphMedium text='Are you sure you want to continue?' />
                        <div className="padding--half"></div>
                        <TypographyCaptionLarge text='This action is not reversible' />
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

