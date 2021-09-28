// React
import React, { useState } from 'react';

// Component
import PDFViewer from '../../lib/pdf_viewer/pdf_viewer';
import Input from '../../lib/form/input';

type ViewerPropsType = React.ComponentProps<typeof PDFViewer>;

export function pdfViewerEmbeddedOptions(): { [key: string]: ViewerPropsType } {

    let baseProps: ViewerPropsType = {
        filePath: 'http://localhost:3000/simple.pdf',
        context: 'embedded',
        heightDeduction: 105
    }

    return {
        "Simple": {
            ...baseProps
        },
        "Simple 2": {
            ...baseProps,
            filePath: 'http://localhost:3000/simple_2.pdf',
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


export function PDFViewerEmbeddedCreator(props: { p: ViewerPropsType }) {

    let [pageNumber, setPageNumber] = useState<string>("");

    return <div>
        <div className="flex-start">
            <Input
                onChange={v => setPageNumber(v)}
                value={pageNumber}
                error={false}
            />
            
        </div>
        <PDFViewer
            filePath={props.p.filePath}
            pageInFocus={parseInt(pageNumber) || null}
            context={props.p.context}
            heightDeduction={props.p.heightDeduction}
            onClose={props.p.onClose}
            expandable={props.p.expandable}
        />
    </div>

}

