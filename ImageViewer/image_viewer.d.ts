/// <reference types="react" />
export default function ImageViewer(props: {
    file: string | File;
    fileName: string;
    context: 'embedded' | 'full screen';
    onClose?: () => void;
    disableDownload?: boolean;
}): JSX.Element;
