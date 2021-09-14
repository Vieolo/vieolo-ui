// React
import React, { useState, useEffect, useRef } from 'react';


// Material UI
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import SVGRenderIcon from '@material-ui/icons/TextFieldsRounded';
import CanvasRenderIcon from '@material-ui/icons/ImageOutlined';
import RotateLeft from '@material-ui/icons/RotateLeftRounded';
import RotateRight from '@material-ui/icons/RotateRightRounded';


// Components
import IconButton from '../button/icon_button';

// Installed Packages
import { PDFDocumentProxy } from 'pdfjs-dist/types/display/api';


// Internal
import { getPDFDocument, renderPDFPageAsCanvas } from './pdf_renderer';





export default function PDFViewer(props: { url: string, fileName: string, context: 'page' | 'embedded', pageInFocus?: number }) {
	let [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
	let [totalPage, setTotalPage] = useState<number>(0);
	let [mounted, setMounted] = useState<boolean>(false);
	let [zoomMultiple, setZoomMultiple] = useState<number>(1);
	let [renderType, setRenderType] = useState<'canvas' | 'svg'>('canvas');
	let [rotation, setRotation] = useState<number>(0);
	// eslint-disable-next-line
	let [pageInFocus, setPageInFocus] = useState<number | null>(null);
	let [pageHeight, setPageHeight] = useState<number>(100);

	let [documentLoadError, setDocumentLoadError] = useState<boolean>(false);

	let focusRef = useRef<HTMLImageElement>(null);

	useEffect(() => {
		if (!mounted) {
			setMounted(true);

			getPDFDocument(props.url).then((d: PDFDocumentProxy) => {
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
		}

		if (mounted && props.pageInFocus) {
			setPageInFocus(props.pageInFocus);
			(focusRef.current as any).scrollTo(0, 0);
			(focusRef.current as any).scrollBy({ top: (props.pageInFocus * ((pageHeight * zoomMultiple) + 34)) - ((pageHeight * zoomMultiple) + 34) }) // 30 px for padding-bottom and 4px for margin
		}
		// eslint-disable-next-line
	}, [props.pageInFocus]);




	if (documentLoadError) {
		return <div className="load-error">There was a problem loading the PDF file!</div>
	} else {
		if (doc === null) return <span></span>
		else {
			let pages = [];

			for (let i = 1; i <= totalPage; i++) {
				pages.push(
					<PDFPage
						pageNumber={i}
						pdf={doc}
						fileName={props.fileName}
						context={props.context}
						zoomMultiple={zoomMultiple}
						renderType={renderType}
						rotation={rotation}
						onSizeChange={(width, height) => {
							if (height !== pageHeight) setPageHeight(height);
						}}
					/>
				)
			}

			return <div className={props.context === "page" ? "pdf-viewer-component" : "pdf-viewer-component pdf-viewer-component-embed"}>
				<div className="pdf-viewer-toolbar">
					<IconButton
						icon={<ZoomOutIcon />}
						onClick={() => { setZoomMultiple(zoomMultiple - 0.1) }}
					/>

					<IconButton
						icon={<DownloadIcon />}
						onClick={() => {
							var link = document.createElement("a");
							link.download = props.fileName.split('___')[1];
							link.href = props.url;
							document.body.appendChild(link);
							link.click();
							document.body.removeChild(link);
						}}
					/>

					<IconButton
						icon={<RotateLeft />}
						onClick={() => setRotation(rotation - 90)}
					/>

					<IconButton
						icon={<RotateRight />}
						onClick={() => setRotation(rotation + 90)}
					/>

					<IconButton
						icon={renderType === 'canvas' ? <SVGRenderIcon /> : <CanvasRenderIcon />}
						onClick={() => {
							if (renderType === 'canvas') setRenderType('svg');
							else setRenderType('canvas');
						}}
					/>

					<IconButton
						icon={<ZoomInIcon />}
						onClick={() => { setZoomMultiple(zoomMultiple + 0.1) }}
					/>
				</div>
				<div className="canvas-container" ref={focusRef}>
					{pages}
				</div>
			</div>
		}
	}


}


function PDFPage(props: {
	pdf: any,
	pageNumber: number,
	fileName: string,
	context: 'page' | 'embedded',
	zoomMultiple: number,
	renderType: 'canvas' | 'svg',
	rotation: number,
	onSizeChange: (width: number, height: number) => void
}) {

	let canvasID = `${props.fileName.replace(".", "")}_canvas_${props.pageNumber}`;
	let [width, setWidth] = useState<number>(100);
	let [height, setHeight] = useState<number>(100);
	let [canvas, setCanvas] = useState<string>('');
	let [currentRenderType, setCurrentRenderType] = useState<'canvas' | 'svg' | null>(null);
	let [currentZoomMultiple, setCurrentZoomMultiple] = useState<number>(1);
	let [currentRotation, setCurrentRotation] = useState<number>(0);

	function resizeSVGs(thisHeight?: number, thisWidth?: number) {

		let h = thisHeight || height;
		let w = thisWidth || width;

		let container = document.getElementById(canvasID);

		if (container) container.querySelectorAll('svg').forEach(svg => {
			svg.style.height = h * props.zoomMultiple + 'px';
			svg.style.width = w * props.zoomMultiple + 'px';
		})
	}

	useEffect(() => {
		if (currentRenderType !== props.renderType) {
			setCurrentRenderType(props.renderType);

			if (props.renderType === 'canvas') {
				renderPDFPageAsCanvas(props.pdf, props.pageNumber, canvasID, props.context === 'page' ? document.body.clientWidth > 1400 ? document.body.clientWidth > 2000 ? 1.8 : 1.6 : 1.3 : 1).then(([canvasURL, newHeight, newWidth]) => {
					//dispatch(clearLoading());
					props.onSizeChange(newWidth, newHeight);
					setCanvas(canvasURL);
					setWidth(newWidth);
					setHeight(newHeight);
				}).catch((error: any) => {
					//setDocumentLoadError(true)
				});
			} 
		}

		if (props.zoomMultiple !== currentZoomMultiple) {
			setCurrentZoomMultiple(props.zoomMultiple);
			if (props.renderType === 'svg') {
				resizeSVGs();
			}
		}

		if (props.rotation !== currentRotation) {
			setCurrentRotation(props.rotation);
		}
		// eslint-disable-next-line
	}, [props.renderType, props.zoomMultiple, props.rotation])

	if (props.renderType === 'canvas') return <img src={canvas} width={width * props.zoomMultiple} height={height * props.zoomMultiple} key={canvasID} style={{ transform: `rotateZ(${currentRotation}deg)` }} alt="pdf page" />
	else return <div id={canvasID} style={{ height: height * props.zoomMultiple, width: width * props.zoomMultiple, backgroundColor: 'white', transform: `rotateZ(${currentRotation}deg)` }} ></div>
}