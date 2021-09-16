// React
import React, { useState } from 'react';

// Component
import PDFViewer from '../../lib/pdf_viewer/pdf_viewer';
import Button from '../../lib/button/button';

type ViewerPropsType = React.ComponentProps<typeof PDFViewer>;

export function pdfViewerFullScreenOptions(): { [key: string]: ViewerPropsType } {

    let baseProps: ViewerPropsType = {
        filePath: 'http://localhost:3000/simple.pdf',
        context: 'full screen',
        heightDeduction: 0
    }

    return {
        "Simple": {
            ...baseProps
        },
        "Simple, Full functionality": {
            ...baseProps,
            onClose: () => {},
            expandable: true
        },
        "Odd Shaped": {
            ...baseProps,
            filePath: 'http://localhost:3000/odd_shaped.pdf'
        },
        "Many Pages": {
            ...baseProps,
            filePath: 'http://localhost:3000/many_pages.pdf'
        },
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

