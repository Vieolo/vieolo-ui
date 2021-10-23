// React
import React, { useState } from 'react';

// Component
import FormDialog, { FormDialogButton } from '../../lib/dialog/formDialog';
import Button from '../../lib/button/button';
import IconButton from '../../lib/button/icon_button';

// Material UI
import SampleIcon from '@mui/icons-material/RefreshRounded';

type FormDialogPropsType = React.ComponentProps<typeof FormDialog>;

export function formDialogOptions(): { [key: string]: FormDialogPropsType } {
    
    let baseProps: FormDialogPropsType = {
        headerTitle: "Sample Form Dialog",
        onCancel: () => {},
        onSave: () => alert("saved"),
        width: 500
    }

    let extraButtons: FormDialogButton[] = [
        {color: 'alert', text: 'Extra 1', onClick: () => alert("You clicked on extra 1")},
        {color: 'secondary', text: 'Extra 2', onClick: () => alert("You clicked on extra 2")},
    ];

    return {
        "Basic": {
            ...baseProps
        },
        "With responsinve width": {
            ...baseProps,
            width: '80vw'
        },
        "With custom padding": {
            ...baseProps,
            padding: 30
        },
        "With Disabled Save": {
            ...baseProps,
            saveButtonDisabled: true
        },
        "With Close Button": {
            ...baseProps,
            headerRightComponent: 'close'
        },
        "Without Footer": {
            ...baseProps,
            removeCancelButton: true,
            removeSaveButton: true
        },
        "With Extra Buttons": {
            ...baseProps,
            extraButtons: extraButtons
        },
        "Without Cancel Button": {
            ...baseProps,
            headerRightComponent: 'close',
            removeCancelButton: true,
            saveText: "Yes"
        },
        "Without Save Button": {
            ...baseProps,
            headerRightComponent: 'close',
            removeSaveButton: true,
            cancelText: "No"
        },
        "Only Extra Buttons": {
            ...baseProps,
            removeCancelButton: true,
            removeSaveButton: true,
            extraButtons: extraButtons
        },
        "With Custom Component": {
            ...baseProps,
            headerRightComponent: <IconButton 
                icon={<SampleIcon />}
                onClick={() => {}}
                color={'primary'}
                size={"small"}
            />
        },

    }
}


export function FormDialogCreator(props: {p: FormDialogPropsType}) {

    let [open, setOpen] = useState<boolean>(false);
    
    return <div>
        <Button 
            color={'primary'}
            text={"Open Dialog"}
            onClick={() => setOpen(true)}            
        />

        {
            open &&
            <FormDialog 
                headerTitle={props.p.headerTitle}
                onCancel={() => setOpen(false)}
                onSave={props.p.onSave}
                width={props.p.width}
                cancelText={props.p.cancelText}
                extraButtons={props.p.extraButtons}
                headerRightComponent={props.p.headerRightComponent}
                padding={props.p.padding}
                removeCancelButton={props.p.removeCancelButton}
                removeSaveButton={props.p.removeSaveButton}
                saveText={props.p.saveText}
                saveButtonDisabled={props.p.saveButtonDisabled}
            >
                <p>The contents of the dialog</p>
            </FormDialog>
        }
    </div>

}

