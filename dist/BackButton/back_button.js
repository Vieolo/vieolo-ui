import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
// Components
import IconButton from '../IconButton';
// Typography
import Typography from '../Typography';
export default function BackButton(props) {
    let icon = props.icon || _jsx(ArrowBackIcon, {}, void 0);
    let backButtonText = props.backButtonText || 'Go Back';
    let onBack = props.onClick || window.history.back;
    return _jsxs("div", Object.assign({ className: "vieolo-back-button" }, { children: [_jsx(IconButton, { icon: icon, color: 'primary', onClick: () => { onBack(); } }, void 0),
            _jsx(Typography, { type: 'title-medium', text: backButtonText }, void 0)] }), void 0);
}
