// React
import React, { useState } from 'react';

// Component
import FormDialog from '../../FormDialog';
import IconButton from '../../IconButton';
import DatePicker from '../../DatePicker';
import Select from '../../Select';
import Input from '../../Input';

// Material UI
import SampleIcon from '@mui/icons-material/RefreshRounded';

// Installed Packages
import VDate from '@vieolo/vdate';

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
            padding: {
                options: ["10", "20", "30"],
                default: 10,
                type: "number"
            },
            saveButtonDisabled: 'boolean',
            headerRightComponent: {
                options: ['close', "Custom Component"],
                default: "close"
            },
            removeCancelButton: 'boolean',
            removeSaveButton: 'boolean',
            withExtraButtons: 'boolean',
            isLoading: 'boolean',
            disableOverflowScroll: 'boolean',
            smFullScreen: 'booleanTrueDefault',
        }
    }
}


export function FormDialogCreator(props: { p: FormDialogPropsType }) {

    let [inline, setInline] = useState<boolean>(true)
    let [date, setDate] = useState<VDate>(new VDate())

    return <div className="background-color--primary-light padding--one center-by-flex-row">
        <FormDialog
            inline={inline}
            headerTitle={props.p.headerTitle}
            onCancel={() => setInline(!inline)}
            onSave={props.p.onSave}
            extraButtons={(props.p as any).withExtraButtons ? [
                { color: 'alert', text: 'Extra 1', onClick: () => alert("You clicked on extra 1") },
                { color: 'secondary', text: 'Extra 2', onClick: () => alert("You clicked on extra 2") },
            ] : undefined}
            headerRightComponent={props.p.headerRightComponent === "close" ? "close" : <IconButton
                icon={<SampleIcon />}
                onClick={() => { }}
                color={'primary'}
                size={"small"}
            />}
            isLoading={props.p.isLoading}
            padding={props.p.padding}
            removeCancelButton={props.p.removeCancelButton}
            removeSaveButton={props.p.removeSaveButton}
            saveButtonDisabled={props.p.saveButtonDisabled}
            disableOverflowScroll={props.p.disableOverflowScroll}
            smFullScreen={props.p.smFullScreen}
        >

            <DatePicker 
                onDateSelect={v => setDate(v)} 
                selectedDate={date}
            />
            
            <Input 
                error={false}
                onChange={() => {}}
                value=''
            />
            <p>The contents of the dialog</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <p>Click on the cancel button to see toggle the inline mode</p>
            <Input value='xcxc' error={false} onChange={v => {}} />
            <Select 
                error={false}
                items={[{title: "One", value: "One"}, {title: "Two", value: "Two"}]}
                selectedItems={["One"]}
                onSelect={v => {}}
            />
        </FormDialog>
    </div>

}

