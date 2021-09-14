// React
import React from 'react';

// Component
import PDFViewer from '../../lib/pdf_viewer/pdf_viewer';

type ViewerPropsType = React.ComponentProps<typeof PDFViewer>;

export function pdfViewerOptions(): { [key: string]: ViewerPropsType } {
    
    let baseProps: ViewerPropsType = {        
        filePath: 'http://localhost:3000/sample.pdf',
        context: 'embedded',
    }

    return {
        "Simple": {
            ...baseProps
        },        
    }
}


export function PDFViewerCreator(props: {p: ViewerPropsType}) {

    return <PDFViewer
        filePath={props.p.filePath}        
        pageInFocus={props.p.pageInFocus}
        context={props.p.context}
    />

}

