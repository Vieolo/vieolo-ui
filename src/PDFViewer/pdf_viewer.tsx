// React
import { useState, useEffect, useRef } from 'react';

// Components
import Modal from '../Modal/modal';

// Installed Packages
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';
import Device, { DeviceSizeCategory } from '@vieolo/device-js';

// Vieolo UI
import { getPDFDocument, renderPDFPageAsCanvas } from './pdf_renderer';
import Typography from '../Typography';
import Spinner from '../Spinner/spinner';
import Spacer from '../Spacer';
import FileViewerFrame from '../FileViewerFrame';






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
	errorMessage?: string,
	disableDownload?: boolean,
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

	let focusRef = useRef<HTMLDivElement>(null);

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


	let state: 'error' | 'loading' | 'done' = documentLoadError ? 'error' : !doc ? 'loading' : 'done';
	let pages = [];

	if (state === 'done' && focusRef.current) {
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
					containerWidth={(focusRef.current || { offsetWidth: 0 }).offsetWidth}
					containerHeight={(focusRef.current || { offsetHeight: 0 }).offsetHeight}
					onGainFocus={fn => setCurrentPage(fn)}
					onSizeChange={(width, height) => {
						if (height !== pageHeight) setPageHeight(height);
					}}
					pageHeight={pageHeight}
				/>
			)
		}
	}



	let viewerClass = `vieolo-pdf-viewer-component vieolo-pdf-viewer-component--${state}`;

	if (mode === 'full screen') viewerClass += " vieolo-pdf-viewer-component--full"

	let viewer = <div
		className={viewerClass}
		style={mode === 'embedded' ? { height: `calc(100vh - ${props.heightDeduction}px)` } : undefined}
	>

		<FileViewerFrame
			context={props.context}
			expandable={props.expandable || false}
			mode={mode}
			disableDownload={props.disableDownload}
			onDownload={async () => {
				let { downloadBlob } = await import("@vieolo/file-management/download");
				if (typeof props.filePath === 'string') {
					let blob = await (await fetch(props.filePath)).blob();
					downloadBlob(blob, fileName)
				} else {
					downloadBlob(props.filePath, fileName)
				}
			}}
			onModeChange={(m) => {
				if (m === 'full screen') {
					setMode('full screen');
					if (props.onExpandToggle) props.onExpandToggle("full screen");
				}
				else {
					setMode('embedded');
					if (props.onExpandToggle) props.onExpandToggle("embedded");
				}
			}}
			onShare={async () => {
				try {
					await window.navigator.share({
						files: typeof props.filePath === 'string'
							? [new File([await (await fetch(props.filePath)).blob()], fileName)]
							: [props.filePath],
					} as ShareData);
				} catch (error) {

				}
			}}
			isLoading={state !== "done"}
			onClose={props.onClose}
			onRotationChange={r => setRotation(r === '-' ? rotation - 90 : rotation + 90)}
			onZoomChange={z => setZoomMultiple(z === "-" ? zoomMultiple - 0.1 : zoomMultiple + 0.1)}
			page={state === 'done' ? `${currentPage} / ${totalPage}` : ""}
		/>


		<div
			className={`vieolo-pdf-viewer-component__canvas-container ${mode === 'full screen' ? 'vieolo-pdf-viewer-component__canvas-container--full' : ''}`}
			ref={focusRef}
			style={mode === 'embedded' ? { height: `calc(100vh - ${props.heightDeduction + (Device.sizeCategory() === DeviceSizeCategory.mobile ? 40 : 30)}px)` } : undefined}
		>

			{
				state === 'error' &&
				<span className='vieolo-pdf-viewer-component__content'>
					<Typography text={props.errorMessage || "There was a problem loading the PDF file!"} color={'error'} />
				</span>
			}

			{
				state === 'loading' &&
				<span className='vieolo-pdf-viewer-component__content'>
					<Spinner />
					<Spacer height='one' />
					<Typography text={fileName} />
				</span>
			}

			{
				pages.length > 0 &&
				pages
			}
		</div>


	</div>

	if (mode === 'embedded') return viewer;
	else return <Modal
		onClose={() => {
			// Here, we are handling the browser back button.
			// Since the PDF Viewer is full screen, the only way to close the `Modal` is to
			// click the back button
			// 
			// If the viewer started as `embedded` and has been set to `full screen` by the user,
			// we set the mode to `embedded`
			//
			// Else if the viewer start as `full screen` (which means will remain `full screen` in its lifetime)
			// and there is a a `onClose` callback, we trigger the `onClose`
			if (props.context === 'embedded' && mode === 'full screen') {
				setMode('embedded');
			} else if (props.context === 'full screen' && mode === 'full screen' && props.onClose) {
				props.onClose()
			}
		}}
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

