// React
import React from 'react';

// Material UI
// import IconOne from '@mui/icons-material/Assignment';
// import IconTwo from '@mui/icons-material/Backup';
// import IconThree from '@mui/icons-material/Cake';
// import IconFour from '@mui/icons-material/DataUsage';

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
            file: {
                options: [
                    '/simple.pdf',
                    '/simple_2.pdf',
                    '/odd_shaped.pdf',
                    '/many_pages.pdf',
                    '/rotated.pdf',
                    '/annotated.pdf',
                    "/flower.mp4",
                    "/flower.webm",
                    "/portrait_image.jpg",
                    "/landscape_image.jpg",
                    "/square_image.jpg",
                    'non-existend file',
                ],
                default: '/flower.mp4'
            },
            context: {
                options: ["embedded", "full screen"],
                default: "embedded"
            },
            expandable: {
                options: [false, true],
                default: true
            }
        }
    }
}


export function FileViewerCreator(props: { p: FileViewerPropsType }) {


    return <div className='height--vh-80'>
        <FileViewer
            key={props.p.file.toString()}
            file={props.p.file}
            context={props.p.context}
            heightDeduction={105}
            onClose={props.p.onClose}
            expandable={props.p.expandable}
            fileName={(props.p.file as string).split("/")[1]}
        />
    </div>
}