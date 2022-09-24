// React
import { useState } from "react";

// Vieolo UI
import Modal from "../Modal"
import FileViewerFrame from "../FileViewerFrame"

export default function VideoViewer(props: {
    file: string | File,
    context: 'embedded' | 'full screen',
    onClose?: () => void
}) {

    let [mode, setMode] = useState<'full screen' | 'embedded'>(props.context);

    let frame = <FileViewerFrame
        context={props.context}
        expandable
        mode={mode}
        onDownload={() => { }}
        onModeChange={m => setMode(m)}
        onShare={() => { }}
        onClose={props.onClose}
    />

    let video = <div className="vieolo-video-viewer__video-container" >
        <video
            src={typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file)}
            controls
        />
    </div>

    if (mode === 'full screen') return <Modal onClose={() => { if (props.onClose) props.onClose() }}>
        <div className={`vieolo-video-viewer vieolo-video-viewer--${mode.replace(" ", "-")}`}>
            {frame}
            {video}
        </div>
    </Modal>

    return <div className={`vieolo-video-viewer vieolo-video-viewer--${mode.replace(" ", "-")}`}>
        {frame}
        {video}
    </div>
}