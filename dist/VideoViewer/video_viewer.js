import { jsx as _jsx } from "react/jsx-runtime";
import Modal from "../Modal";
export default function VideoViewer(props) {
    let video = _jsx("video", { src: typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file), controls: true }, void 0);
    if (props.context === 'full screen')
        return _jsx(Modal, Object.assign({ onClose: () => { if (props.onClose)
                props.onClose(); } }, { children: video }), void 0);
    return _jsx("div", Object.assign({ className: `vieolo-video-viewer vieolo-video-viewer--${props.context}` }, { children: video }), void 0);
}
