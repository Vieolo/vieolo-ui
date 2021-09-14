// React
import React, { useState, useEffect } from 'react';

// Material UI
import CloseIcon from '@material-ui/icons/CloseRounded';
import FullScreenIcon from '@material-ui/icons/FullscreenRounded';

// Component
import PDFViewer from './pdf_viewer';
import Button from '../button/button';
import IconButton from '../button/icon_button';
import BackButtonRow from '../navigation/back_button_row';

// Internal
import { readFileRawContent } from './pdf_renderer';


export default function PDFRenderEmbedded(props: { filePath: string | File, onExit?: () => void, onPDFFullpage?: () => void, pageInFocus?: number }) {

    let [documentURL, setDocumentURL] = useState<any>(null);

    let [documentLoadError, setDocumentLoadError] = useState<boolean>(false);

    let fileName = typeof props.filePath === 'string' ? props.filePath.split('___').slice(-1)[0] : props.filePath.name;


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

    return <div className="pdf-embedded-container">

        {
            (props.onExit || props.onPDFFullpage) &&
            <BackButtonRow
                removeBackButton={props.onExit ? false : true}
                backButtonText={"Close"}
                icon={<CloseIcon />}
                actions={props.onPDFFullpage ? [
                    <IconButton
                        icon={<FullScreenIcon />}
                        color={'primary'}
                        onClick={props.onPDFFullpage}
                        tooltip={"Full Screen"}
                        tooltipPosition='left'
                    />
                ] : []}
                onBack={() => {
                    if (props.onExit) props.onExit()
                }}
            />
        }

        <PDFViewer url={documentURL} fileName={fileName} context={"embedded"} pageInFocus={props.pageInFocus} />

    </div>
}