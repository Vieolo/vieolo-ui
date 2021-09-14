// React
import React from 'react';

// Component
import PDFViewerEmbedded from '../../lib/pdf_viewer/pdf_viewer_embedded';

type ViewerPropsType = React.ComponentProps<typeof PDFViewerEmbedded>;

export function pdfViewerEmbeddedOptions(): { [key: string]: ViewerPropsType } {
    
    let baseProps: ViewerPropsType = {        
        filePath: 'http://localhost:3000/sample.pdf',
        onExit: () => {},
    }

    return {
        "Simple": {
            ...baseProps
        },        
    }
}


export function PDFViewerEmbeddedCreator(props: {p: ViewerPropsType}) {

    return <PDFViewerEmbedded
        filePath={props.p.filePath}
        onExit={props.p.onExit}
        onPDFFullpage={props.p.onPDFFullpage}
        pageInFocus={props.p.pageInFocus}
    />

}

