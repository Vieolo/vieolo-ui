// React
import React, { useState, useEffect, useRef } from 'react';


// Material UI
import ZoomInIcon from '@material-ui/icons/AddRounded';
import ZoomOutIcon from '@material-ui/icons/RemoveRounded';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import RotateLeft from '@material-ui/icons/RotateLeftRounded';
import RotateRight from '@material-ui/icons/RotateRightRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';


// Components
import IconButton from '../button/icon_button';

// Installed Packages
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';


// Internal
import { getPDFDocument, renderPDFPageAsCanvas } from './pdf_renderer';





export default function PDFViewer(props: {
	filePath: string | File,
	context: 'full screen' | 'embedded',
	pageInFocus?: number,
	/** 
	 * The vertical pixels that has to be deducted to fit the viewer in the page. 
	 * The given value will be added as a style. e.g. calc(100vh - 100px)
	*/
	heightDeduction: number
}) {
	let [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
	let [totalPage, setTotalPage] = useState<number>(0);
	let [zoomMultiple, setZoomMultiple] = useState<number>(0);
	let [rotation, setRotation] = useState<number>(0);

	// eslint-disable-next-line
	let [pageInFocus, setPageInFocus] = useState<number | null>(null);
	let [pageHeight, setPageHeight] = useState<number>(100);

	let [documentLoadError, setDocumentLoadError] = useState<boolean>(false);

	let focusRef = useRef<HTMLImageElement>(null);

	let fileName = typeof props.filePath === 'string' ? props.filePath.split('___').slice(-1)[0] : props.filePath.name;

	useEffect(() => {
		if (props.pageInFocus) {
			setPageInFocus(props.pageInFocus);
			(focusRef.current as any).scrollTo(0, 0);
			(focusRef.current as any).scrollBy({ top: (props.pageInFocus * ((pageHeight * zoomMultiple) + 34)) - ((pageHeight * zoomMultiple) + 34) }) // 30 px for padding-bottom and 4px for margin			
		}
		// eslint-disable-next-line
	}, [props.pageInFocus]);


	useEffect(() => {
		setTotalPage(0);
		getPDFDocument(props.filePath).then((d: PDFDocumentProxy) => {
			setDoc(d);
			setTotalPage(d.numPages);
			/*renderPDFPage(doc.pdf, currentPage, 'pdf_render_page_canvas', 1.3).then((rendered: boolean) => {
				dispatch(clearLoading());
			}).catch((error: any) => setDocumentLoadError(true));*/

			if (props.pageInFocus && props.pageInFocus <= totalPage) {
				setPageInFocus(props.pageInFocus);
			}
		}).catch((error: any) => {
			console.log(error);
			setDocumentLoadError(true);
		});
		// eslint-disable-next-line
	}, [props.filePath]);



	if (documentLoadError) {
		return <div className="load-error">There was a problem loading the PDF file!</div>
	} else {
		if (doc === null) return <span></span>
		else {
			let pages = [];

			for (let i = 1; i <= totalPage; i++) {
				pages.push(
					<PDFPage
						key={`pdf_page_${i}`}
						pageNumber={i}
						pdf={doc}
						fileName={fileName}
						context={props.context}
						zoomMultiple={zoomMultiple}
						rotation={rotation}
						containerWidth={focusRef.current!.offsetWidth}
						onSizeChange={(width, height) => {
							if (height !== pageHeight) setPageHeight(height);
						}}
					/>
				)
			}

			return <div
				className={props.context === "full screen" ? "vieolo-pdf-viewer-component" : "vieolo-pdf-viewer-component"}
				style={{ height: `calc(100vh - ${props.heightDeduction}px)` }}
			>
				<div className="vieolo-pdf-viewer-component__toolbar">

					<div className='flex-start'>
						<IconButton
							size="small"
							icon={<CloseIcon />}
							color="error"
							onClick={() => { setZoomMultiple(zoomMultiple - 0.1) }}
						/>
					</div>

					<div className="flex-start">
						<IconButton
							size="small"
							icon={<ZoomOutIcon />}
							onClick={() => { setZoomMultiple(zoomMultiple - 0.1) }}
						/>

						<IconButton
							size="small"
							icon={<ZoomInIcon />}
							onClick={() => { setZoomMultiple(zoomMultiple + 0.1) }}
						/>
					</div>

					<div className="flex-start">
						<IconButton
							size="small"
							icon={<DownloadIcon />}
							onClick={() => {
								var link = document.createElement("a");
								link.download = fileName.split('___')[1];
								link.href = props.filePath as string;
								document.body.appendChild(link);
								link.click();
								document.body.removeChild(link);
							}}
						/>

						<IconButton
							size="small"
							icon={<RotateLeft />}
							onClick={() => setRotation(rotation - 90)}
						/>

						<IconButton
							size="small"
							icon={<RotateRight />}
							onClick={() => setRotation(rotation + 90)}
						/>
					</div>


				</div>
				<div
					className="vieolo-pdf-viewer-component__canvas-container"
					ref={focusRef}
					style={{ height: `calc(100vh - ${props.heightDeduction + 30}px)` }}
				>
					{pages}
				</div>
			</div>
		}
	}


}


function PDFPage(props: {
	pdf: PDFDocumentProxy,
	pageNumber: number,
	fileName: string,
	context: 'full screen' | 'embedded',
	zoomMultiple: number,
	rotation: number,
	onSizeChange: (width: number, height: number) => void,
	containerWidth: number
}) {

	let canvasID = `${props.fileName.replace(".", "")}_canvas_${props.pageNumber}`;
	//let [width, setWidth] = useState<number>(100);
	//let [height, setHeight] = useState<number>(100);
	//let [canvas, setCanvas] = useState<string>('');
	let [currentZoomMultiple, setCurrentZoomMultiple] = useState<number>(0);
	let [currentRotation, setCurrentRotation] = useState<number>(0);
	let [rendered, setRendered] = useState<boolean>(false);

	const isVisible = useOnScreen(canvasID, 0);

	useEffect(() => {
		if (isVisible && (!rendered)) {
			setRendered(true);
			renderPDFPageAsCanvas(
				props.pdf,
				props.pageNumber,
				canvasID,
				props.containerWidth,
				//props.context === 'full screen' ? document.body.clientWidth > 1400 ? document.body.clientWidth > 2000 ? 1.8 : 1.6 : 1.3 : 1,			
				1,
				currentZoomMultiple,
				currentRotation
			).then(([canvasURL, newHeight, newWidth]) => {
				//dispatch(clearLoading());
				props.onSizeChange(newWidth, newHeight);
				//setCanvas(canvasURL);
				//setWidth(newWidth);
				//setHeight(newHeight);
			}).catch((error: any) => {
				//setDocumentLoadError(true)
			});
		}
		// eslint-disable-next-line
	}, [isVisible, renderPDFPageAsCanvas, canvasID, currentZoomMultiple, currentRotation]);

	useEffect(() => {
		if (props.zoomMultiple !== currentZoomMultiple) {
			setRendered(false);
			setCurrentZoomMultiple(props.zoomMultiple);
		}

		if (props.rotation !== currentRotation) {
			setRendered(false);
			setCurrentRotation(props.rotation);
		}
		// eslint-disable-next-line
	}, [props.zoomMultiple, props.rotation, setRendered])

	return <canvas id={canvasID} key={canvasID}></canvas>
	//return <img src={canvas} width={width * props.zoomMultiple} height={height * props.zoomMultiple} key={canvasID} style={{ transform: `rotateZ(${currentRotation}deg)` }} alt="pdf page" />
}



function useOnScreen(elementID: string, threshold = 0) {

	const [isIntersecting, setIntersecting] = useState(false)

	

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIntersecting(entry.isIntersecting)
		, {threshold: threshold})
		observer.observe(document.getElementById(elementID)!);
		// Remove the observer as soon as the component is unmounted
		return () => { observer.disconnect() }
	}, [elementID])

	return isIntersecting
}

