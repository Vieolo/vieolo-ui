import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from "react";
// Vieolo UI
import Modal from "../Modal";
import FileViewerFrame from "../FileViewerFrame";
export default function VideoViewer(props) {
    let [mode, setMode] = useState(props.context);
    let frame = _jsx(FileViewerFrame, { context: props.context, expandable: true, mode: mode, onDownload: async () => {
            let { downloadBlob } = await import("@vieolo/file-management/download");
            if (typeof props.file === 'string') {
                let blob = await (await fetch(props.file)).blob();
                downloadBlob(blob, props.file.split("?")[0].split("___").slice(-1)[0]);
            }
            else {
                downloadBlob(props.file, props.file.name);
            }
        }, onModeChange: m => setMode(m), onShare: () => { }, onClose: props.onClose }, void 0);
    let video = _jsx("div", Object.assign({ className: "vieolo-video-viewer__video-container" }, { children: _jsx("video", { src: typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file), controls: true }, void 0) }), void 0);
    if (mode === 'full screen')
        return _jsx(Modal, Object.assign({ onClose: () => { if (props.onClose)
                props.onClose(); } }, { children: _jsxs("div", Object.assign({ className: `vieolo-video-viewer vieolo-video-viewer--${mode.replace(" ", "-")}` }, { children: [frame,
                    video] }), void 0) }), void 0);
    return _jsxs("div", Object.assign({ className: `vieolo-video-viewer vieolo-video-viewer--${mode.replace(" ", "-")}` }, { children: [frame,
            video] }), void 0);
}