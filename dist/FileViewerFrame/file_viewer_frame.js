import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// Material UI
import ZoomInIcon from '@mui/icons-material/AddRounded';
import ZoomOutIcon from '@mui/icons-material/RemoveRounded';
import DownloadIcon from '@mui/icons-material/CloudDownload';
import RotateLeft from '@mui/icons-material/RotateLeftRounded';
import RotateRight from '@mui/icons-material/RotateRightRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import ExpandIcon from '@mui/icons-material/FullscreenRounded';
// Icons
import { ShareIcon } from '../icons/icons';
// Vieolo UI
import IconButton from "../IconButton";
import Typography from '../Typography';
import Flex from '../Flex';
export default function FileViewerFrame(props) {
    return _jsxs("div", Object.assign({ className: `vieolo-file-viewer-frame vieolo-file-viewer-frame--${props.mode.replace(" ", "-")}` }, { children: [_jsx(Flex, { children: (props.onClose || props.mode === 'full screen') &&
                    _jsx(IconButton, { size: "extra-small", icon: _jsx(CloseIcon, {}, void 0), color: "error", disabled: !props.onClose, onClick: () => {
                            if (props.context === 'embedded' && props.mode === 'full screen') {
                                props.onModeChange('embedded');
                            }
                            else {
                                if (props.onClose)
                                    props.onClose();
                            }
                        } }, void 0) }, void 0),
            props.page &&
                _jsx("div", { children: _jsx(Typography, { text: props.page }, void 0) }, void 0),
            props.onZoomChange &&
                _jsxs(Flex, Object.assign({ columnGap: 'half' }, { children: [_jsx(IconButton, { size: "extra-small", icon: _jsx(ZoomOutIcon, {}, void 0), onClick: () => props.onZoomChange("-"), disabled: props.isLoading }, void 0),
                        _jsx(IconButton, { size: "extra-small", icon: _jsx(ZoomInIcon, {}, void 0), onClick: () => props.onZoomChange("+"), disabled: props.isLoading }, void 0)] }), void 0),
            _jsxs(Flex, Object.assign({ columnGap: 'half' }, { children: [("share" in window.navigator) &&
                        _jsx(IconButton, { size: "extra-small", icon: _jsx(ShareIcon, {}, void 0), disabled: props.isLoading, onClick: async () => props.onShare() }, void 0),
                    _jsx(IconButton, { size: "extra-small", icon: _jsx(DownloadIcon, {}, void 0), disabled: props.isLoading, onClick: props.onDownload }, void 0),
                    props.onRotationChange &&
                        _jsxs(_Fragment, { children: [_jsx(IconButton, { size: "extra-small", icon: _jsx(RotateLeft, {}, void 0), disabled: props.isLoading, onClick: () => props.onRotationChange("-") }, void 0),
                                _jsx(IconButton, { size: "extra-small", icon: _jsx(RotateRight, {}, void 0), disabled: props.isLoading, onClick: () => props.onRotationChange("+") }, void 0)] }, void 0),
                    (props.expandable && props.context === 'embedded') &&
                        _jsx(IconButton, { size: "extra-small", icon: _jsx(ExpandIcon, {}, void 0), onClick: () => {
                                if (props.mode === 'embedded') {
                                    props.onModeChange("full screen");
                                }
                                else {
                                    props.onModeChange('embedded');
                                }
                            } }, void 0)] }), void 0)] }), void 0);
}
