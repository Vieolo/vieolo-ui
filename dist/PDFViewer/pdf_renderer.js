// Installed Packages
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry';
pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJSWorker;
//pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.9.359/build/pdf.worker.min.js";
export function readFileRawContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
        reader.onload = event => resolve(event.target.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}
export async function getPDFDocument(url) {
    let finalURL;
    if (url instanceof File) {
        let temp = await readFileRawContent(url);
        finalURL = temp;
    }
    else
        finalURL = url;
    let rawPDF = await pdfjsLib.getDocument(finalURL).promise;
    return rawPDF;
}
export async function renderPDFPageAsCanvas(doc, pageNumber, pageID, canvasID, textLayerID, annotationLayerID, maximumWidth, zoom, rotation) {
    /**
     * Some PDF files come with an existing rotation
     * This function adjusts the rotation of the pages with the existing rotation in mind.
     * The `rotation` is the rotation given by the user, clicking on the rotate button
     * @param pg The PDF page
     * @returns The final adjusted rotation
     */
    function getFinalRotation(pg) {
        if (pg.rotate === 0)
            return rotation;
        else
            return rotation - (360 - page.rotate);
    }
    let page = await doc.getPage(pageNumber);
    // Prepare canvas using PDF page dimensions
    let canvas = document.getElementById(canvasID);
    let canvasContext = canvas.getContext('2d');
    let scalingFactor = 1;
    let orgWidth = page.getViewport({ scale: 1 }).width;
    if ((maximumWidth * 0.95) < orgWidth) {
        scalingFactor = ((maximumWidth * 0.95) / orgWidth);
    }
    let viewport = page.getViewport({
        scale: scalingFactor + zoom,
        rotation: getFinalRotation(page),
    });
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    let pageElement = document.getElementById(pageID);
    pageElement.style.height = viewport.height + 'px';
    pageElement.style.width = viewport.width + 'px';
    // Render PDF page into canvas context
    let renderOptions = {
        canvasContext: canvasContext,
        viewport: viewport,
        intent: 'display',
        renderInteractiveForms: false,
        includeAnnotationStorage: true,
    };
    //let renderTask = await page.render(renderOptions).promise;
    await page.render(renderOptions).promise;
    // Texts are separately rendered on the top of the canvas
    let textDivs = [];
    let textLayer = document.getElementById(textLayerID);
    textLayer.innerHTML = "";
    pdfjsLib.renderTextLayer({
        viewport: viewport,
        container: textLayer,
        enhanceTextSelection: true,
        textDivs: textDivs,
        textContent: await page.getTextContent(),
    });
    // Annotations are separately rendered on the top of the canvas
    let annotations = await page.getAnnotations();
    let annotationLayer = document.getElementById(annotationLayerID);
    annotationLayer.innerHTML = "";
    pdfjsLib.AnnotationLayer.render({
        annotations: annotations,
        div: annotationLayer,
        downloadManager: null,
        linkService: null,
        page: page,
        renderInteractiveForms: false,
        viewport: viewport,
    });
    return [viewport.height, viewport.width];
}
