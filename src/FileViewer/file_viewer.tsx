// React
import React from 'react';
import PDFViewer from '../PDFViewer';
import Typography from '../Typography';


export default function FileViewer(props: {
    file: File,
    fileName: string,
    context: 'full screen' | 'embedded',
    /** Used for PDF files */
	pageInFocus?: number,
	/** 
	 * The vertical pixels that has to be deducted to fit the viewer in the page. 
	 * The given value will be added as a style. e.g. calc(100vh - 100px)
	 */
	heightDeduction: number,
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


    let fileType = props.file.type;

    if (fileType === 'application/pdf') return <PDFViewer {...props} filePath={props.file} />
    else if (["image/jpg", "image/jpeg", "image/png"].includes(fileType)) return <div></div>
    else if (["audio/mpeg"].includes(fileType)) return <div></div>
    else if (["video/mp4", "video/webm"].includes(fileType)) return <div></div>
    else return <div>
        <Typography text='The given file is not supported!' />
    </div>
}