// React
import React from 'react';

// Component
import FormDialog from '../../FormDialog';
import IconButton from '../../IconButton';

// Material UI
import SampleIcon from '@mui/icons-material/RefreshRounded';

// Types
import { ViewData } from '../main/main';

type FormDialogPropsType = React.ComponentProps<typeof FormDialog>;

export function formDialogOptions(): ViewData {

    return {
        constants: {
            headerTitle: "Sample Form Dialog",
            onCancel: () => { },
            onSave: () => alert("saved"),
        } as FormDialogPropsType,
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
            saveButtonDisabled: {
                options: [false, true],
                default: false,
            },
            headerRightComponent: {
                options: ['close', "Custom Component"],
                default: "close"
            },
            removeCancelButton: {
                options: [false, true],
                default: false,
            },
            removeSaveButton: {
                options: [false, true],
                default: false,
            },
            withExtraButtons: {
                options: [false, true],
                default: false,
            }
        }
    }
}


export function FormDialogCreator(props: { p: FormDialogPropsType }) {


    return <div className="background-color--primary-light padding--one center-by-flex-row">
        <FormDialog
            inline
            headerTitle={props.p.headerTitle}
            onCancel={() => {}}
            onSave={props.p.onSave}
            width={props.p.width}
            extraButtons={(props.p as any).withExtraButtons ? [
                { color: 'alert', text: 'Extra 1', onClick: () => alert("You clicked on extra 1") },
                { color: 'secondary', text: 'Extra 2', onClick: () => alert("You clicked on extra 2") },
            ] : null}
            headerRightComponent={props.p.headerRightComponent === "close" ? "close" : <IconButton
                icon={<SampleIcon />}
                onClick={() => { }}
                color={'primary'}
                size={"small"}
            />}
            padding={props.p.padding}
            removeCancelButton={props.p.removeCancelButton}
            removeSaveButton={props.p.removeSaveButton}
            saveButtonDisabled={props.p.saveButtonDisabled}
        >
            <p>The contents of the dialog</p>
        </FormDialog>
    </div>

}

