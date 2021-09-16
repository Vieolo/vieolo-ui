/// <reference types="react" />
export default function PDFViewer(props: {
    filePath: string | File;
    context: 'full screen' | 'embedded';
    pageInFocus?: number;
    /**
     * The vertical pixels that has to be deducted to fit the viewer in the page.
     * The given value will be added as a style. e.g. calc(100vh - 100px)
     */
    heightDeduction: number;
    onClose?: () => void;
    expandable?: boolean;
}): JSX.Element;
