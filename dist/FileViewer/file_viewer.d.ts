/// <reference types="react" />
export default function FileViewer(props: {
    file: string | File;
    fileName: string;
    context: 'full screen' | 'embedded';
    /** Used for PDF files */
    pageInFocus?: number;
    /**
     * The vertical pixels that has to be deducted to fit the viewer in the page.
     * The given value will be added as a style. e.g. calc(100vh - 100px)
     * This prop is only used for PDFViewer
     */
    heightDeduction?: number;
    onClose?: () => void;
    /** Whether an `embedded` viewer can be expanded to full screen */
    expandable?: boolean;
    /**
     * This callback function informs the parent that the view mode of the viewer is changed
     */
    onExpandToggle?: (mode: 'full screen' | 'embedded') => void;
    /**
     * This error message apears when there is an issue with loading the file.
     * If nothing provided, the default message is displayed
     */
    errorMessage?: string;
}): JSX.Element;
