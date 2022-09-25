// React
import { useState } from "react";

// Vieolo UI
import Modal from "../Modal";
import FileViewerFrame from "../FileViewerFrame";

// Installed Packages
import { downloadBlob } from "@vieolo/file-management";

export default function ImageViewer(props: {
    file: string | File,
    fileName: string,
    context: 'embedded' | 'full screen',
    onClose?: () => void
}) {

    let imgSrc = typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file)
    let [mode, setMode] = useState<'full screen' | 'embedded'>(props.context);

    let frame = <FileViewerFrame
        context={props.context}
        expandable
        mode={mode}
        onDownload={async () => {
            if (typeof props.file === 'string') {
                let blob = await (await fetch(props.file)).blob();
                downloadBlob(blob, props.file.split("?")[0].split("___").slice(-1)[0])
            } else {
                downloadBlob(props.file, props.file.name)
            }
        }}
        onModeChange={m => setMode(m)}
        onShare={() => { }} // TODO: add share functionality
        onClose={props.onClose}
    />

    let content = <div
        className={`vieolo-image-viewer__image`}
        style={{ backgroundImage: `url(${imgSrc})` }}
    >
    </div>

    if (mode === 'full screen') return <Modal onClose={() => { if (props.onClose) props.onClose() }}>
        <div className={`vieolo-image-viewer vieolo-image-viewer--full-screen`}>
            {frame}
            <div className="vieolo-image-viewer__container">
                {content}
            </div>
        </div>
    </Modal>

    return <div className={`vieolo-image-viewer vieolo-image-viewer--embedded`}>
        {frame}
        {content}
    </div>
}