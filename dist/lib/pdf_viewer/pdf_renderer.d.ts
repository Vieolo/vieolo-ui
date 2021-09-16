import { PDFDocumentProxy, TypedArray } from 'pdfjs-dist/types/display/api';
export declare function readFileRawContent(file: File): Promise<TypedArray>;
export declare function getPDFDocument(url: string | File): Promise<PDFDocumentProxy>;
export declare function renderPDFPageAsCanvas(doc: PDFDocumentProxy, pageNumber: number, pageID: string, canvasID: string, textLayerID: string, maximumWidth: number, zoom: number, rotation: number): Promise<[number, number]>;
