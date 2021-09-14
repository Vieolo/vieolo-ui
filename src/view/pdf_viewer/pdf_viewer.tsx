// React
import React from 'react';

// Component
import PDFViewer from '../../lib/pdf_viewer/pdf_viewer';

type ViewerPropsType = React.ComponentProps<typeof PDFViewer>;

export function pdfViewerOptions(): { [key: string]: ViewerPropsType } {
    
    let baseProps: ViewerPropsType = {        
        filePath: 'http://localhost:3000/simple.pdf',
        context: 'embedded',
        heightDeduction: 65
    }

    return {
        "Simple": {
            ...baseProps
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


export function PDFViewerCreator(props: {p: ViewerPropsType}) {

    return <PDFViewer
        filePath={props.p.filePath}        
        pageInFocus={props.p.pageInFocus}
        context={props.p.context}
        heightDeduction={props.p.heightDeduction}
    />

}

