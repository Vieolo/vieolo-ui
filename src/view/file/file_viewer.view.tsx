// React
import React from 'react';

// Material UI
import IconOne from '@mui/icons-material/Assignment';
import IconTwo from '@mui/icons-material/Backup';
import IconThree from '@mui/icons-material/Cake';
import IconFour from '@mui/icons-material/DataUsage';

// Vieolo UI
import FileViewer from '../../FileViewer';

// Types
import { ViewData } from '../main/main';

type FileViewerPropsType = React.ComponentProps<typeof FileViewer>;

export function fileViewerOptions(): ViewData {

    return {
        constants: {

        } as Partial<FileViewerPropsType>,
        variables: {

        }
    }
}


export function FileViewerCreator(props: {p: FileViewerPropsType}) {

    return <div></div>

    // return <FileViewer

    // />
}