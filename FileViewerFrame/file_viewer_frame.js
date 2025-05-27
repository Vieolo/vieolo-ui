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
    return _jsxs("div", { className: `vieolo-file-viewer-frame vieolo-file-viewer-frame--${props.mode.replace(" ", "-")}`, children: [_jsx(Flex, { children: (props.onClose || props.mode === 'full screen') &&
                    _jsx(IconButton, { size: "extra-small", icon: _jsx(CloseIcon, {}), color: "error", disabled: !props.onClose, onClick: () => {
                            if (props.context === 'embedded' && props.mode === 'full screen') {
                                props.onModeChange('embedded');
                            }
                            else {
                                if (props.onClose)
                                    props.onClose();
                            }
                        } }) }), props.page &&
                _jsx("div", { children: _jsx(Typography, { text: props.page }) }), props.onZoomChange &&
                _jsxs(Flex, { columnGap: 'half', children: [_jsx(IconButton, { size: "extra-small", icon: _jsx(ZoomOutIcon, {}), onClick: () => props.onZoomChange("-"), disabled: props.isLoading }), _jsx(IconButton, { size: "extra-small", icon: _jsx(ZoomInIcon, {}), onClick: () => props.onZoomChange("+"), disabled: props.isLoading })] }), _jsxs(Flex, { columnGap: 'half', children: [("share" in window.navigator) &&
                        _jsx(IconButton, { size: "extra-small", icon: _jsx(ShareIcon, {}), disabled: props.isLoading, onClick: async () => props.onShare() }), !props.disableDownload &&
                        _jsx(IconButton, { size: "extra-small", icon: _jsx(DownloadIcon, {}), disabled: props.isLoading, onClick: props.onDownload }), props.onRotationChange &&
                        _jsxs(_Fragment, { children: [_jsx(IconButton, { size: "extra-small", icon: _jsx(RotateLeft, {}), disabled: props.isLoading, onClick: () => props.onRotationChange("-") }), _jsx(IconButton, { size: "extra-small", icon: _jsx(RotateRight, {}), disabled: props.isLoading, onClick: () => props.onRotationChange("+") })] }), (props.expandable && props.context === 'embedded') &&
                        _jsx(IconButton, { size: "extra-small", icon: _jsx(ExpandIcon, {}), onClick: (e) => {
                                e.stopPropagation();
                                if (props.mode === 'embedded') {
                                    props.onModeChange("full screen");
                                }
                                else {
                                    props.onModeChange('embedded');
                                }
                            } })] })] });
}
