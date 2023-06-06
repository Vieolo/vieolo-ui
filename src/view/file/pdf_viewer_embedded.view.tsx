// React
import React, { useState } from 'react';

// Component
import PDFViewer from '../../PDFViewer';
import Input from '../../Input/input';

// Types
import { ViewData } from '../main/main';

type ViewerPropsType = React.ComponentProps<typeof PDFViewer>;

export function pdfViewerEmbeddedOptions(): ViewData {

    return {
        constants: {
            context: 'embedded',
            heightDeduction: 105
        } as Partial<ViewerPropsType>,
        variables: {
            filePath: {
                options: [
                    '/simple.pdf',                    
                    '/odd_shaped.pdf',
                    'non-existend file'
                ],
                default: '/simple.pdf'
            },
            expandable: {
                options: [false, true],
                default: true
            }
        }
    }

}


export function PDFViewerEmbeddedCreator(props: { p: ViewerPropsType }) {

    let [pageNumber, setPageNumber] = useState<string>("");

    return <div>
        <div className="flex-start margin-bottom--half">
            <Input
                onChange={v => setPageNumber(v)}
                value={pageNumber}
                error={false}
            />
            
        </div>
        <PDFViewer
            key={props.p.filePath.toString()}
            filePath={props.p.filePath}
            pageInFocus={parseInt(pageNumber) || undefined}
            context={props.p.context}
            heightDeduction={props.p.heightDeduction}
            onClose={props.p.onClose}
            expandable={props.p.expandable}
            fileName={(props.p.filePath as string).split("/")[1]}
        />
    </div>

}

