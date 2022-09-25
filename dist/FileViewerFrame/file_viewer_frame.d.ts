/// <reference types="react" />
declare type FileViewerMode = "full screen" | "embedded";
export default function FileViewerFrame(props: {
    onClose?: () => void;
    mode: FileViewerMode;
    context: FileViewerMode;
    onModeChange: (m: FileViewerMode) => void;
    page?: string;
    isLoading?: boolean;
    onZoomChange?: (c: "+" | "-") => void;
    onRotationChange?: (c: "+" | "-") => void;
    onShare: () => void;
    onDownload: () => void;
    expandable: boolean;
}): JSX.Element;
export {};
