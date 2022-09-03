// React
import React, { useEffect, useState } from 'react';
import ImageViewer from '../ImageViewer';
import PDFViewer from '../PDFViewer';
import Spinner from '../Spinner';
import Typography from '../Typography';
import VideoViewer from '../VideoViewer';


export default function FileViewer(props: {
    file: string | File,
    fileName: string,
    context: 'full screen' | 'embedded',
    /** Used for PDF files */
	pageInFocus?: number,
	/** 
	 * The vertical pixels that has to be deducted to fit the viewer in the page. 
	 * The given value will be added as a style. e.g. calc(100vh - 100px)
     * This prop is only used for PDFViewer
	 */
	heightDeduction?: number,
	onClose?: () => void,
    /** Whether an `embedded` viewer can be expanded to full screen */
	expandable?: boolean,
	/**
	 * This callback function informs the parent that the view mode of the viewer is changed
	 */
	onExpandToggle?: (mode: 'full screen' | 'embedded') => void,
	/**
	 * This error message apears when there is an issue with loading the file.
	 * If nothing provided, the default message is displayed
	 */
	errorMessage?: string
}) {

    let [file, setFile] = useState<File | undefined | null>(undefined);
    // let [fileURL, setFileURL] = useState<string | undefined>(undefined)

    useEffect(() => {
        if (file === undefined) {
            let contentTypeMap: {[key: string]: string} = {
                "pdf": "application/pdf",
                "jpg": "image/jpeg",
                "jpeg": "image/jpeg",
                "mp3": "audio/mpeg",
                "mp4": "video/mp4",
                "webm": "video/webm"
            }

            if (typeof props.file === 'string') {
                fetch(props.file).then(res => {
                    res.blob().then(blob => {
                        setFile(new File([blob], props.fileName, {
                            type: res.headers.get("Content-Type") || contentTypeMap[(props.file as string).split(".").slice(-1)[0].toLowerCase()]
                        }))
                    })  
                }).catch(() => setFile(null))
            } else {
                setFile(props.file)
            }
        }
    }, [props.file, file, props.fileName])    

    if (file === undefined) return <Spinner />
    else if (file === null) return <div>
        <Typography text='The file does not exist' />
    </div>

    let fileType = file.type;    

    if (fileType === 'application/pdf') return <PDFViewer {...props} filePath={file} heightDeduction={props.heightDeduction === undefined ? 100 : props.heightDeduction} />
    else if (["image/jpg", "image/jpeg", "image/png"].includes(fileType)) return <ImageViewer file={file} fileName={props.fileName} context={props.context} />
    else if (["audio/mpeg"].includes(fileType)) return <div></div>
    else if (["video/mp4", "video/webm"].includes(fileType)) return <VideoViewer file={file} context={props.context} onClose={props.onClose} />
    else return <div>
        <Typography text='The given file is not supported!' />
    </div>
}