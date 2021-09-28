// React
import React, { useState } from 'react';

// Component
import FormDialog from '../../lib/dialog/formDialog';
import Button from '../../lib/button/button';

type FormDialogPropsType = React.ComponentProps<typeof FormDialog>;

export function formDialogOptions(): { [key: string]: FormDialogPropsType } {
    
    let baseProps: FormDialogPropsType = {
        headerTitle: "Sample Form Dialog",
        onCancel: () => {},
        onSave: () => alert("saved"),
        width: 500
    }

    return {
        "Basic": {
            ...baseProps
        }        
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
            >
                <p>The contents of the dialog</p>
            </FormDialog>
        }
    </div>

}

