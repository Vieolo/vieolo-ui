// React
import React, { useState } from 'react';

// Component
import PDFViewer from '../../PDFViewer';
import Button from '../../Button';

// Types
import { ViewData } from '../main/main';

type ViewerPropsType = React.ComponentProps<typeof PDFViewer>;

export function pdfViewerFullScreenOptions(): ViewData {

    return {
        constants: {
            context: 'full screen',
            heightDeduction: 0
        } as Partial<ViewerPropsType>,
        variables: {
            filePath: {
                options: [
                    '/simple.pdf',
                    '/odd_shaped.pdf',
                    'non-existend file'
                ],
                default: '/simple.pdf'
            }
        }
    }  
}


export function PDFViewerFullScreenCreator(props: { p: ViewerPropsType }) {

    let [showViewer, setShowViewer] = useState<boolean>(false);

    return <div>
        <Button
            color='primary'
            text='Show Viewer'
            onClick={() => setShowViewer(true)}
        />

        {
            showViewer &&
            <PDFViewer
                key={props.p.filePath.toString()}
                filePath={props.p.filePath}
                context={props.p.context}
                heightDeduction={props.p.heightDeduction}
                onClose={() => setShowViewer(false)}
                fileName={(props.p.filePath as string).split("/")[1]}
            />
        }

    </div>

}

