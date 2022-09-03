import { jsx as _jsx } from "react/jsx-runtime";
import Modal from "../Modal";
export default function ImageViewer(props) {
    let imgSrc = typeof props.file === 'string' ? props.file : window.URL.createObjectURL(props.file);
    let content = _jsx("div", { className: `vieolo-image-viewer`, style: { backgroundImage: `url(${imgSrc})` } }, void 0);
    if (props.context === 'full screen')
        return _jsx(Modal, Object.assign({ onClose: () => { if (props.onClose)
                props.onClose(); } }, { children: _jsx("div", Object.assign({ className: "height--vh-80 width--vw-90" }, { children: content }), void 0) }), void 0);
    return content;
}
