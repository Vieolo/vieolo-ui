// React
import React, { useState } from 'react';

// Component
import PDFViewer from '../../lib/pdf_viewer/pdf_viewer';
import Button from '../../lib/button/button';

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
                    '/simple_2.pdf',
                    '/odd_shaped.pdf',
                    '/many_pages.pdf'
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
                filePath={props.p.filePath}
                context={props.p.context}
                heightDeduction={props.p.heightDeduction}
                onClose={() => setShowViewer(false)}
            />
        }

    </div>

}

