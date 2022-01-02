// React
import React, { useState } from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';

// Component
import FileInput from '../../lib/form/file_input';

// Types
import { ViewData } from '../main/main';

type FileInputPropsType = React.ComponentProps<typeof FileInput>;

export function fileInputOptions(): ViewData {

    return {
        constants: {

        } as Partial<FileInputPropsType>,
        variables: {
            withIcon: 'boolean',
            withBrowseButton: 'boolean',
            multiple: 'boolean'
        }
    }
}


export function FileInputCreator(props: { p: FileInputPropsType }) {

    let [files, setFiles] = useState<File[]>([]);

    return <div className="width--px-400 height--px-300">
        <FileInput
            onChange={f => {
                let fs = [];
                for (let i = 0; i < f.length; i++) {
                    fs.push(f.item(i));
                }
                setFiles(fs)
            }}
            onError={(e) => { }}
            accept='application/pdf'
            icon={(props.p as any).withIcon ? <IconOne /> : undefined}
            multiple={props.p.multiple}
            text='Please drop your files here'
            browseButtonConfig={(props.p as any).withBrowseButton ? {
                color: 'primary',
                emphasis: 'medium',
                text: "Browse From Files"
            } : undefined}
        />
    </div>
}