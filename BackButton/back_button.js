import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Material UI
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosRounded';
// Components
import IconButton from '../IconButton';
// Typography
import Typography from '../Typography';
export default function BackButton(props) {
    let icon = props.icon || _jsx(ArrowBackIcon, {});
    let backButtonText = props.backButtonText || 'Go Back';
    let onBack = props.onClick || window.history.back;
    return _jsxs("div", { className: "vieolo-back-button", children: [_jsx(IconButton, { icon: icon, color: 'primary', onClick: () => { onBack(); } }), _jsx(Typography, { type: 'title-medium', text: backButtonText })] });
}
