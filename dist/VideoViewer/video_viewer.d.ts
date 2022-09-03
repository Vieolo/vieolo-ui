/// <reference types="react" />
export default function VideoViewer(props: {
    file: string | File;
    context: 'embedded' | 'full screen';
    onClose?: () => void;
}): JSX.Element;
