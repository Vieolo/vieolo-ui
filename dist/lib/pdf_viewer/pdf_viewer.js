import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState, useEffect, useRef } from 'react';
// Material UI
import ZoomInIcon from '@mui/icons-material/AddRounded';
import ZoomOutIcon from '@mui/icons-material/RemoveRounded';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import RotateLeft from '@mui/icons-material/RotateLeftRounded';
import RotateRight from '@mui/icons-material/RotateRightRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ExpandIcon from '@mui/icons-material/FullscreenRounded';
// Components
import IconButton from '../button/icon_button';
import Modal from '../dialog/modal';
// Internal
import { getPDFDocument, renderPDFPageAsCanvas } from './pdf_renderer';
import { TypographyParagraphMedium } from '../typography';
export default function PDFViewer(props) {
    let [doc, setDoc] = useState(null);
    let [totalPage, setTotalPage] = useState(0);
    let [currentPage, setCurrentPage] = useState(1);
    let [zoomMultiple, setZoomMultiple] = useState(0);
    let [rotation, setRotation] = useState(0);
    let [mode, setMode] = useState(props.context);
    // eslint-disable-next-line
    let [pageInFocus, setPageInFocus] = useState(null);
    let [pageHeight, setPageHeight] = useState(100);
    let [documentLoadError, setDocumentLoadError] = useState(false);
    let focusRef = useRef(null);
    let fileName = props.fileName || (typeof props.filePath === 'string' ? props.filePath.split('___').slice(-1)[0] : props.filePath.name);
    useEffect(() => {
        if (props.pageInFocus) {
            setPageInFocus(props.pageInFocus);
            focusRef.current.scrollTo(0, 0);
            focusRef.current.scrollBy({ top: (props.pageInFocus * ((pageHeight) + 15)) - ((pageHeight) + 15) }); // 30 px for padding-bottom and 4px for margin			
        }
        // eslint-disable-next-line
    }, [props.pageInFocus]);
    useEffect(() => {
        setTotalPage(0);
        setCurrentPage(1);
        getPDFDocument(props.filePath).then((d) => {
            setDoc(d);
            setTotalPage(d.numPages);
            /*renderPDFPage(doc.pdf, currentPage, 'pdf_render_page_canvas', 1.3).then((rendered: boolean) => {
                dispatch(clearLoading());
            }).catch((error: any) => setDocumentLoadError(true));*/
            if (props.pageInFocus && props.pageInFocus <= totalPage) {
                setPageInFocus(props.pageInFocus);
            }
        }).catch((error) => {
            console.error(error);
            setDocumentLoadError(true);
        });
        // eslint-disable-next-line
    }, [props.filePath]);
    if (documentLoadError) {
        return _jsx("div", Object.assign({ className: "load-error" }, { children: "There was a problem loading the PDF file!" }), void 0);
    }
    else {
        if (doc === null)
            return _jsx("span", {}, void 0);
        else {
            let pages = [];
            for (let i = 1; i <= totalPage; i++) {
                pages.push(_jsx(PDFPage, { pageNumber: i, pdf: doc, fileName: fileName, context: props.context, zoomMultiple: zoomMultiple, rotation: rotation, containerWidth: focusRef.current.offsetWidth, containerHeight: focusRef.current.offsetHeight, onGainFocus: fn => setCurrentPage(fn), onSizeChange: (width, height) => {
                        if (height !== pageHeight)
                            setPageHeight(height);
                    }, pageHeight: pageHeight }, `pdf_page_${i}`));
            }
            let viewer = _jsxs("div", Object.assign({ className: props.context === "full screen" ? "vieolo-pdf-viewer-component" : "vieolo-pdf-viewer-component", style: { height: `calc(100vh - ${mode === 'embedded' ? props.heightDeduction : 0}px)` } }, { children: [_jsxs("div", Object.assign({ className: "vieolo-pdf-viewer-component__toolbar" }, { children: [_jsx("div", Object.assign({ className: 'flex-start' }, { children: (props.onClose || mode === 'full screen') &&
                                    _jsx(IconButton, { size: "extra-small", icon: _jsx(CloseIcon, {}, void 0), color: "error", disabled: !props.onClose, onClick: () => {
                                            if (props.context === 'embedded' && mode === 'full screen') {
                                                setMode('embedded');
                                            }
                                            else {
                                                if (props.onClose)
                                                    props.onClose();
                                            }
                                        } }, void 0) }), void 0),
                            _jsx("div", { children: _jsx(TypographyParagraphMedium, { text: `${currentPage} / ${totalPage}` }, void 0) }, void 0),
                            _jsxs("div", Object.assign({ className: "flex-start column-gap--half" }, { children: [_jsx(IconButton, { size: "extra-small", icon: _jsx(ZoomOutIcon, {}, void 0), onClick: () => { setZoomMultiple(zoomMultiple - 0.1); } }, void 0),
                                    _jsx(IconButton, { size: "extra-small", icon: _jsx(ZoomInIcon, {}, void 0), onClick: () => { setZoomMultiple(zoomMultiple + 0.1); } }, void 0)] }), void 0),
                            _jsxs("div", Object.assign({ className: "flex-start column-gap--half" }, { children: [_jsx(IconButton, { size: "extra-small", icon: _jsx(DownloadIcon, {}, void 0), onClick: () => {
                                            var link = document.createElement("a");
                                            link.download = fileName.split('___').slice(-1)[0];
                                            link.href = props.filePath;
                                            document.body.appendChild(link);
                                            link.click();
                                            document.body.removeChild(link);
                                        } }, void 0),
                                    _jsx(IconButton, { size: "extra-small", icon: _jsx(RotateLeft, {}, void 0), onClick: () => setRotation(rotation - 90) }, void 0),
                                    _jsx(IconButton, { size: "extra-small", icon: _jsx(RotateRight, {}, void 0), onClick: () => setRotation(rotation + 90) }, void 0),
                                    (props.expandable && props.context === 'embedded') &&
                                        _jsx(IconButton, { size: "extra-small", icon: _jsx(ExpandIcon, {}, void 0), onClick: () => {
                                                if (mode === 'embedded')
                                                    setMode('full screen');
                                                else
                                                    setMode('embedded');
                                            } }, void 0)] }), void 0)] }), void 0),
                    _jsx("div", Object.assign({ className: "vieolo-pdf-viewer-component__canvas-container", ref: focusRef, style: { height: `calc(100vh - ${mode === 'embedded' ? props.heightDeduction + 30 : 10}px)` } }, { children: pages }), void 0)] }), void 0);
            if (mode === 'embedded')
                return viewer;
            else
                return _jsx(Modal, Object.assign({ onClose: () => { } }, { children: _jsx("div", Object.assign({ className: "width--vw-100 height--vh-100" }, { children: viewer }), void 0) }), void 0);
        }
    }
}
function PDFPage(props) {
    let canvasID = `${props.fileName.replace(".", "")}_canvas_${props.pageNumber}`;
    let textLayerID = canvasID.replace("canvas", 'text');
    let pageID = canvasID.replace("canvas", 'page');
    //let [width, setWidth] = useState<number>(100);
    let [height, setHeight] = useState(100);
    //let [canvas, setCanvas] = useState<string>('');
    let [currentZoomMultiple, setCurrentZoomMultiple] = useState(0);
    let [currentRotation, setCurrentRotation] = useState(0);
    let [rendered, setRendered] = useState(false);
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
            renderPDFPageAsCanvas(props.pdf, props.pageNumber, pageID, canvasID, textLayerID, props.containerWidth, currentZoomMultiple, currentRotation).then(([newHeight, newWidth]) => {
                //dispatch(clearLoading());
                props.onSizeChange(newWidth, newHeight);
                //setCanvas(canvasURL);
                //setWidth(newWidth);
                setHeight(newHeight);
            }).catch((error) => {
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
    }, [props.zoomMultiple, props.rotation, setRendered]);
    return _jsxs("div", Object.assign({ className: "vieolo-pdf-viewer-component__page", id: pageID, style: { height: rendered ? undefined : props.pageHeight } }, { children: [_jsx("canvas", { id: canvasID, height: rendered ? undefined : props.pageHeight }, canvasID),
            _jsx("div", { className: "vieolo-pdf-viewer-component__page__text-layer", id: textLayerID }, textLayerID)] }), void 0);
    //return <img src={canvas} width={width * props.zoomMultiple} height={height * props.zoomMultiple} key={canvasID} style={{ transform: `rotateZ(${currentRotation}deg)` }} alt="pdf page" />
}
function useOnScreen(elementID, threshold = 0) {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting), { threshold: threshold });
        observer.observe(document.getElementById(elementID));
        // Remove the observer as soon as the component is unmounted
        return () => { observer.disconnect(); };
    }, [elementID, threshold]);
    return isIntersecting;
}
