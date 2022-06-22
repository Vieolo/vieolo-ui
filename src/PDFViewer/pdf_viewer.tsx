// React
import React, { useState, useEffect, useRef } from 'react';


// Material UI
import ZoomInIcon from '@mui/icons-material/AddRounded';
import ZoomOutIcon from '@mui/icons-material/RemoveRounded';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import RotateLeft from '@mui/icons-material/RotateLeftRounded';
import RotateRight from '@mui/icons-material/RotateRightRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ExpandIcon from '@mui/icons-material/FullscreenRounded';

// Icons
import { ShareIcon } from '../icons/icons';

// Components
import IconButton from '../IconButton';
import Modal from '../Modal/modal';

// Installed Packages
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import Device, { DeviceSizeCategory } from '@vieolo/device-js';


// Vieolo UI
import { getPDFDocument, renderPDFPageAsCanvas } from './pdf_renderer';
import Typography from '../Typography';
import Spinner from '../Spinner/spinner';
import Spacer from '../Spacer';






export default function PDFViewer(props: {
	filePath: string | File,
	fileName?: string,
	context: 'full screen' | 'embedded',
	pageInFocus?: number,
	/** 
	 * The vertical pixels that has to be deducted to fit the viewer in the page. 
	 * The given value will be added as a style. e.g. calc(100vh - 100px)
	 */
	heightDeduction: number,
	onClose?: () => void,
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

	let fileName = (props.fileName || (typeof props.filePath === 'string' ? props.filePath.split('___').slice(-1)[0] : props.filePath.name)).trim();

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
			console.error(error);
			setDocumentLoadError(true);
		});
		// eslint-disable-next-line
	}, [props.filePath]);

	function handlePopState(e: PopStateEvent) {
		if (props.context === 'full screen') {
			if (props.onClose) {
				e.preventDefault()
				props.onClose();
			}
		} else {
			e.preventDefault()
			setMode("embedded");
			if (props.onExpandToggle) props.onExpandToggle("embedded");
		}
		window.removeEventListener('popstate', handlePopState);
	}


	function handleBrowserBack() {
		let u = new URL(window.location as any);
		let f = (props.fileName || (typeof props.filePath === 'string' ? props.filePath.split('___').slice(-1)[0] : props.filePath.name)).trim();
		u.searchParams.set('pdf_file_in_view', f);
		window.history.pushState({}, '', u.toString());
		window.addEventListener("popstate", handlePopState);
	}


	useEffect(() => {
		if (props.context === 'full screen') {
			handleBrowserBack();
		}

		return () => {
			if (window.location.search.includes("pdf_file_in_view")) {
				window.history.back();
			}
		}
		// eslint-disable-next-line
	}, [props.fileName, props.filePath, props.onClose, props.context])

	let content;

	let state: 'error' | 'loading' | 'done' = documentLoadError ? 'error' : !doc ? 'loading' : 'done';

	if (state === 'error') {
		content = <span className='vieolo-pdf-viewer-component__content'>
			<Typography text={props.errorMessage || "There was a problem loading the PDF file!"} color={'error'} />
		</span>
	} else {
		if (state === 'loading') content = <span className='vieolo-pdf-viewer-component__content'>
			<Spinner />
			<Spacer height='one' />
			<Typography text={fileName} />
		</span>
		else {
			let pages = [];

			for (let i = 1; i <= totalPage; i++) {
				pages.push(
					<PDFPage
						key={`pdf_page_${i}`}
						pageNumber={i}
						pdf={doc!}
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

			content = <>
				<div
					className={`vieolo-pdf-viewer-component__canvas-container ${mode === 'full screen' ? 'vieolo-pdf-viewer-component__canvas-container--full' : ''}`}
					ref={focusRef}
					style={mode === 'embedded' ? { height: `calc(100vh - ${props.heightDeduction + (Device.sizeCategory() === DeviceSizeCategory.mobile ? 40 : 30)}px)` } : undefined}
				>
					{pages}
				</div>
			</>
		}
	}

	let viewerClass = `vieolo-pdf-viewer-component vieolo-pdf-viewer-component--${state}`;

	if (mode === 'full screen') viewerClass += " vieolo-pdf-viewer-component--full"	

	let viewer = <div
		className={viewerClass}
		style={mode === 'embedded' ? { height: `calc(100vh - ${props.heightDeduction}px)` } : undefined}
	>
		<div className="vieolo-pdf-viewer-component__toolbar">

			<div className='flex-start'>
				{
					(props.onClose || mode === 'full screen') &&
					<IconButton
						size="extra-small"
						icon={<CloseIcon />}
						color="error"
						disabled={!props.onClose}
						onClick={() => {
							if (props.context === 'embedded' && mode === 'full screen') {
								setMode('embedded');
								if (props.onExpandToggle) props.onExpandToggle("embedded");
							} else {
								if (window.location.search.includes("pdf_file_in_view")) {
									window.history.back();
								} else {
									if (props.onClose) props.onClose();
								}
							}
						}}
					/>
				}
			</div>

			<div>
				<Typography text={state === 'done' ? `${currentPage} / ${totalPage}` : ""} />
			</div>

			<div className="flex-start column-gap--half">
				<IconButton
					size="extra-small"
					icon={<ZoomOutIcon />}
					onClick={() => { setZoomMultiple(zoomMultiple - 0.1) }}
					disabled={state !== 'done'}
				/>

				<IconButton
					size="extra-small"
					icon={<ZoomInIcon />}
					onClick={() => { setZoomMultiple(zoomMultiple + 0.1) }}
					disabled={state !== 'done'}
				/>
			</div>

			<div className="flex-start column-gap--half">
				{
					("share" in window.navigator) &&
					<IconButton
						size="extra-small"
						icon={<ShareIcon />}
						disabled={state !== 'done'}
						onClick={async () => {
							try {
								await window.navigator.share({
									files: typeof props.filePath === 'string'
										? [new File([await (await fetch(props.filePath)).blob()], fileName)]
										: [props.filePath],
								} as ShareData);
							} catch (error) {

							}
						}}
					/>
				}

				<IconButton
					size="extra-small"
					icon={<DownloadIcon />}
					disabled={state !== 'done'}
					onClick={() => {
						var link = document.createElement("a");
						link.download = fileName.split('___').slice(-1)[0];
						link.href = props.filePath as string;
						document.body.appendChild(link);
						link.click();
						document.body.removeChild(link);
					}}
				/>

				<IconButton
					size="extra-small"
					icon={<RotateLeft />}
					disabled={state !== 'done'}
					onClick={() => setRotation(rotation - 90)}
				/>

				<IconButton
					size="extra-small"
					icon={<RotateRight />}
					disabled={state !== 'done'}
					onClick={() => setRotation(rotation + 90)}
				/>

				{
					(props.expandable && props.context === 'embedded') &&
					<IconButton
						size="extra-small"
						icon={<ExpandIcon />}
						onClick={() => {
							if (mode === 'embedded') {
								setMode('full screen');
								if (props.onExpandToggle) props.onExpandToggle("full screen");
								handleBrowserBack();
							}
							else {
								if (window.location.search.includes("pdf_file_in_view")) {
									window.history.back();
								}
								setMode('embedded');
								if (props.onExpandToggle) props.onExpandToggle("embedded");
							}
						}}
					/>
				}
			</div>


		</div>


		{content}

	</div>

	if (mode === 'embedded') return viewer;
	else return <Modal
		onClose={() => { }}
	>
		<div className="width--vw-100 height--vh-100">
			{viewer}
		</div>
	</Modal>



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
	let annotationLayerID = canvasID.replace("canvas", 'annotation');
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
				annotationLayerID,
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
		<div className="vieolo-pdf-viewer-component__page__annotation-layer" id={annotationLayerID} key={annotationLayerID}></div>
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
