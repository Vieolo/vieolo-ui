import { jsx as _jsx } from "react/jsx-runtime";
// React
import { useEffect, useState } from 'react';
import ImageViewer from '../ImageViewer';
import PDFViewer from '../PDFViewer';
import Spinner from '../Spinner';
import Typography from '../Typography';
import VideoViewer from '../VideoViewer';
export default function FileViewer(props) {
    let [file, setFile] = useState(undefined);
    // let [fileURL, setFileURL] = useState<string | undefined>(undefined)
    useEffect(() => {
        if (file === undefined) {
            let contentTypeMap = {
                "pdf": "application/pdf",
                "jpg": "image/jpeg",
                "jpeg": "image/jpeg",
                "mp3": "audio/mpeg",
                "mp4": "video/mp4",
                "webm": "video/webm"
            };
            if (typeof props.file === 'string') {
                fetch(props.file).then(res => {
                    res.blob().then(blob => {
                        let headerContentType = res.headers.get("Content-Type");
                        setFile(new File([blob], props.fileName, {
                            type: (!headerContentType || headerContentType === 'binary/octet-stream' || headerContentType.includes("multipart/form-data")) ? contentTypeMap[props.file.split("?")[0].split(".").slice(-1)[0].toLowerCase()] : headerContentType
                        }));
                    });
                }).catch(() => setFile(null));
            }
            else {
                setFile(props.file);
            }
        }
    }, [props.file, file, props.fileName]);
    if (file === undefined)
        return _jsx(Spinner, {});
    else if (file === null)
        return _jsx("div", { children: _jsx(Typography, { text: 'The file does not exist' }) });
    let fileType = file.type;
    if (fileType === 'application/pdf')
        return _jsx(PDFViewer, { ...props, filePath: file, heightDeduction: props.heightDeduction === undefined ? 100 : props.heightDeduction });
    else if (["image/jpg", "image/jpeg", "image/png"].includes(fileType))
        return _jsx(ImageViewer, { file: file, fileName: props.fileName, context: props.context, onClose: props.onClose, disableDownload: props.disableDownload });
    else if (["audio/mpeg"].includes(fileType))
        return _jsx("div", {});
    else if (["video/mp4", "video/webm"].includes(fileType))
        return _jsx(VideoViewer, { file: file, context: props.context, onClose: props.onClose, disableDownload: props.disableDownload });
    else
        return _jsx("div", { children: props.fileNotSupportedComponent ||
                _jsx(Typography, { text: 'The given file is not supported!' }) });
}
