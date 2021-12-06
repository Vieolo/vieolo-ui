// React
import React, { useState } from 'react';

// Component
import PDFViewer from '../../lib/pdf_viewer/pdf_viewer';
import Input from '../../lib/form/input';

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
                    '/simple_2.pdf',
                    '/odd_shaped.pdf',
                    '/many_pages.pdf'
                ],
                default: '/simple.pdf'
            },
            expandable: {
                options: [false, true],
                default: false
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
            filePath={props.p.filePath}
            pageInFocus={parseInt(pageNumber) || null}
            context={props.p.context}
            heightDeduction={props.p.heightDeduction}
            onClose={props.p.onClose}
            expandable={props.p.expandable}
        />
    </div>

}

