import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';
// Vieolo UI
import IconButton from '../button/icon_button';
export default function ItemRowSearch(props) {
    let className = "vieolo-item-row";
    if (props.cardStyle)
        className += " " + props.cardStyle;
    return _jsx("div", Object.assign({ className: className }, { children: _jsxs("div", Object.assign({ className: "vieolo-item-row__item-content vieolo-item-row__item-without-icon" }, { children: [_jsx("input", { value: props.query, onChange: e => props.onChange(e.target.value), placeholder: "Search..." }, void 0),
                props.query.trim() &&
                    _jsx("div", Object.assign({ className: "vieolo-item-row__button-col" }, { children: _jsx(IconButton, { icon: _jsx(CloseIcon, {}, void 0), onClick: () => props.onChange(''), color: 'error', size: 'small' }, void 0) }), void 0)] }), void 0) }), void 0);
}
