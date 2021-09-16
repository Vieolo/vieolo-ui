// React
import React, { useState, useEffect, useRef } from 'react';


// Material UI
import ZoomInIcon from '@material-ui/icons/AddRounded';
import ZoomOutIcon from '@material-ui/icons/RemoveRounded';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import RotateLeft from '@material-ui/icons/RotateLeftRounded';
import RotateRight from '@material-ui/icons/RotateRightRounded';
import CloseIcon from '@material-ui/icons/CloseRounded';
import ExpandIcon from '@material-ui/icons/FullscreenRounded';


// Components
import IconButton from '../button/icon_button';
import Modal from '../modal';

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
	heightDeduction: number,
	onClose?: () => void,
	expandable?: boolean
}) {
	let [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
	let [totalPage, setTotalPage] = useState<number>(0);
	let [currentPage, setCurrentPage] = useState<number>(1);
	let [zoomMultiple, setZoomMultiple] = useState<number>(0);
	let [rotation, setRotation] = useState<number>(0);
	let [mode, setMode] = useState<'full screen' | 'embedded'>(props.context);

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
			(focusRef.current as any).scrollBy({ top: (props.pageInFocus * ((pageHeight) + 15)) - ((pageHeight) + 15) }) // 30 px for padding-bottom and 4px for margin			
		}
		// eslint-disable-next-line
	}, [props.pageInFocus]);


	useEffect(() => {
		setTotalPage(0);
		setCurrentPage(1);
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
						containerHeight={focusRef.current!.offsetHeight}
						onGainFocus={fn => setCurrentPage(fn)}
						onSizeChange={(width, height) => {
							if (height !== pageHeight) setPageHeight(height);
						}}
						pageHeight={pageHeight}
					/>
				)
			}

			let viewer = <div
				className={props.context === "full screen" ? "vieolo-pdf-viewer-component" : "vieolo-pdf-viewer-component"}
				style={{ height: `calc(100vh - ${mode === 'embedded' ? props.heightDeduction : 0}px)` }}
			>
				<div className="vieolo-pdf-viewer-component__toolbar">

					<div className='flex-start'>
						{
							(props.onClose || mode === 'full screen') &&
							<IconButton
								size="small"
								icon={<CloseIcon />}
								color="error"
								disabled={!props.onClose}
								onClick={() => {
									if (props.context === 'embedded' && mode === 'full screen') {
										setMode('embedded');
									}else {
										if (props.onClose) props.onClose();
									}									
								}}
							/>
						}
					</div>

					<div>
						<p>{`${currentPage} / ${totalPage}`}</p>
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

						{
							(props.expandable && props.context === 'embedded') &&
							<IconButton
								size="small"
								icon={<ExpandIcon />}
								onClick={() => {
									if (mode === 'embedded') setMode('full screen');
									else setMode('embedded');
								}}
							/>
						}
					</div>


				</div>
				<div
					className="vieolo-pdf-viewer-component__canvas-container"
					ref={focusRef}
					style={{ height: `calc(100vh - ${mode === 'embedded' ? props.heightDeduction + 30 : 10}px)` }}
				>
					{pages}
				</div>
			</div>

			if (mode === 'embedded') return viewer;
			else return <Modal
				onClose={() => {}}
			>
				<div className="width--vw-100 height--vh-100">
					{viewer}
				</div>
			</Modal>
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
	containerWidth: number,
	containerHeight: number,
	onGainFocus: (pageNumber: number) => void,
	pageHeight: number,
}) {

	let canvasID = `${props.fileName.replace(".", "")}_canvas_${props.pageNumber}`;
	let textLayerID = canvasID.replace("canvas", 'text');
	let pageID = canvasID.replace("canvas", 'page');
	//let [width, setWidth] = useState<number>(100);
	let [height, setHeight] = useState<number>(100);
	//let [canvas, setCanvas] = useState<string>('');
	let [currentZoomMultiple, setCurrentZoomMultiple] = useState<number>(0);
	let [currentRotation, setCurrentRotation] = useState<number>(0);
	let [rendered, setRendered] = useState<boolean>(false);

	const isVisible = useOnScreen(canvasID, 0);
	const isInFocus = useOnScreen(canvasID, Math.min(props.containerHeight / height, 0.5));

	let onGainFocus = props.onGainFocus;
	let pageNumber = props.pageNumber;

	useEffect(() => {
		if (isInFocus && rendered) {
			onGainFocus(pageNumber);
		}
	}, [isInFocus, onGainFocus, pageNumber, rendered]);

	useEffect(() => {
		if (isVisible && !rendered) {
			setRendered(true);
			renderPDFPageAsCanvas(
				props.pdf,
				props.pageNumber,
				pageID,
				canvasID,
				textLayerID,
				props.containerWidth,
				currentZoomMultiple,
				currentRotation,
			).then(([newHeight, newWidth]) => {
				//dispatch(clearLoading());
				props.onSizeChange(newWidth, newHeight);
				//setCanvas(canvasURL);
				//setWidth(newWidth);
				setHeight(newHeight);
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

	return <div
		className={"vieolo-pdf-viewer-component__page"}
		id={pageID}
		style={{ height: rendered ? undefined : props.pageHeight }}
	>
		<canvas id={canvasID} key={canvasID} height={rendered ? undefined : props.pageHeight}></canvas>
		<div className="vieolo-pdf-viewer-component__page__text-layer" id={textLayerID} key={textLayerID}></div>
	</div>
	//return <img src={canvas} width={width * props.zoomMultiple} height={height * props.zoomMultiple} key={canvasID} style={{ transform: `rotateZ(${currentRotation}deg)` }} alt="pdf page" />
}



function useOnScreen(elementID: string, threshold = 0) {

	const [isIntersecting, setIntersecting] = useState(false)



	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIntersecting(entry.isIntersecting)
			, { threshold: threshold })
		observer.observe(document.getElementById(elementID)!);
		// Remove the observer as soon as the component is unmounted
		return () => { observer.disconnect() }
	}, [elementID, threshold])

	return isIntersecting
}

