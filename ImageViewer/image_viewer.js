import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from "react";
// Vieolo UI
import Modal from "../Modal";
import FileViewerFrame from "../FileViewerFrame";
export default function ImageViewer(props) {
    let imgSrc = typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file);
    let [mode, setMode] = useState(props.context);
    let frame = _jsx(FileViewerFrame, { context: props.context, expandable: true, disableDownload: props.disableDownload, mode: mode, onDownload: async () => {
            let { downloadBlob } = await import("@vieolo/file-management/download");
            if (typeof props.file === 'string') {
                let blob = await (await fetch(props.file)).blob();
                downloadBlob(blob, props.file.split("?")[0].split("___").slice(-1)[0]);
            }
            else {
                downloadBlob(props.file, props.file.name);
            }
        }, onModeChange: m => setMode(m), onShare: () => { }, onClose: props.onClose });
    let content = _jsx("div", { className: `vieolo-image-viewer__image`, style: { backgroundImage: `url(${imgSrc})` } });
    if (mode === 'full screen') {
        return _jsx(Modal, { onClose: () => {
                // Here, we are handling the browser back button.
                // Since the Viewer is full screen, the only way to close the `Modal` is to
                // click the back button
                // 
                // If the viewer started as `embedded` and has been set to `full screen` by the user,
                // we set the mode to `embedded`
                //
                // Else if the viewer start as `full screen` (which means will remain `full screen` in its lifetime)
                // and there is a a `onClose` callback, we trigger the `onClose`
                if (props.context === 'embedded' && mode === 'full screen') {
                    setMode('embedded');
                }
                else if (props.context === 'full screen' && mode === 'full screen' && props.onClose) {
                    props.onClose();
                }
            }, children: _jsxs("div", { className: `vieolo-image-viewer vieolo-image-viewer--full-screen`, children: [frame, _jsx("div", { className: "vieolo-image-viewer__container", children: content })] }) });
    }
    return _jsxs("div", { className: `vieolo-image-viewer vieolo-image-viewer--embedded`, children: [frame, content] });
}
