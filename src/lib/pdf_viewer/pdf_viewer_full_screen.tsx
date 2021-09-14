// React
import React, { useState, useEffect } from 'react';

// Material UI
import CloseIcon from '@material-ui/icons/CloseRounded';

// Component
import PDFViewer from './pdf_viewer';
import Button from '../button/button';
import BackButtonRow from '../navigation/back_button_row';

// Logics and Utils
import { readFileRawContent } from './pdf_renderer';


export default function PDFRenderFullScreen(props: { filePath: string | File, onExit: () => void }) {

    let [documentURL, setDocumentURL] = useState<any>(null);

    let [documentLoadError, setDocumentLoadError] = useState<boolean>(false);

    let fileName = typeof props.filePath === 'string' ? props.filePath.split('___')[1] : props.filePath.name;


    useEffect(() => {

        if (typeof props.filePath === 'string') {            
            setDocumentURL(props.filePath);
        } else {
            readFileRawContent(props.filePath).then((url: any) => {
                setDocumentURL(url);
            }).catch((error: any) => {
                console.log(error);
                setDocumentLoadError(true)
            });
        }

        // eslint-disable-next-line
    }, []);


    if (documentLoadError) {
        return <div>
            <h3>There was an error loading the file!</h3>
            <Button
                color={'secondary'}
                text={"Go Back"}
                onClick={props.onExit}
            />
        </div>
    }

    if (documentURL === null) return <div>Loading...</div>

    return <div className="pdf-renderer-page">
        <div className="pdf-renderer-container">
            <BackButtonRow
                actions={[<div className="file-name">{fileName}</div>]}
                backButtonText={"Close"}
                icon={<CloseIcon />}
                onBack={props.onExit}
            />
            <PDFViewer url={documentURL} fileName={fileName} context="full screen" />
        </div>
    </div>
}