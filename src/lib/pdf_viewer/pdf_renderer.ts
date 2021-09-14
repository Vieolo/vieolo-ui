// Installed Packages
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import { PDFDocumentProxy, RenderParameters, TypedArray } from 'pdfjs-dist/types/display/api';
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'

pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker

//pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js";


export function readFileRawContent(file: File) : Promise<TypedArray> {
	const reader = new FileReader()
	return new Promise((resolve, reject) => {

		reader.onload = event => resolve((event.target as any).result)
		reader.onerror = error => reject(error)
		reader.readAsDataURL(file)
	})
}


export async function getPDFDocument(url: string | File) : Promise<PDFDocumentProxy> {
	let finalURL : TypedArray | string;
	if (url instanceof File) {
		let temp = await readFileRawContent(url);
		finalURL = temp;
	}else finalURL = url;
	let rawPDF = await pdfjsLib.getDocument(finalURL).promise;
	return rawPDF;
}



export async function renderPDFPageAsCanvas(doc: PDFDocumentProxy, pageNumber: number, canvasID: string, scale = 1.5) : Promise<[string, number, number]> {
	
	let page = await doc.getPage(pageNumber);
	
	let viewport = page.getViewport({scale: scale});
	
	// Prepare canvas using PDF page dimensions
	let canvas = document.createElement('canvas'); //document.getElementById(canvasID) as HTMLCanvasElement;
	let context = canvas.getContext('2d');
	canvas.height = viewport.height;
	canvas.width = viewport.width;
	
	// Render PDF page into canvas context
	let renderOptions: RenderParameters = {
		canvasContext: context as any,
		viewport: viewport,
		intent: 'display',
		renderInteractiveForms: true
	};
	
	//let renderTask = await page.render(renderOptions).promise;
	await page.render(renderOptions).promise;
	return [canvas.toDataURL(), viewport.height, viewport.width];
}