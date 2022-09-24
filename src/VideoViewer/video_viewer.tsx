// React
import { useState } from "react";

// Vieolo UI
import Modal from "../Modal"
import FileViewerFrame from "../FileViewerFrame"

// Installed Packages
import { downloadBlob } from "@vieolo/file-management";

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