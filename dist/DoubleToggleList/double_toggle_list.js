import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Typography from '../Typography';
import Chip from '../Chip';
import Spacer from '../Spacer';
// Material UI
import CloseIcon from '@mui/icons-material/CloseRounded';
import DoneIcon from '@mui/icons-material/DoneRounded';
export default function DoubleToggleList(props) {
    let onList = [];
    let offList = [];
    for (let i = 0; i < props.items.length; i++) {
        const e = props.items[i];
        if (e.on)
            onList.push(e);
        else
            offList.push(e);
    }
    return _jsxs("div", Object.assign({ className: "vieolo-double-toggle-list" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-double-toggle-list__text-container" }, { children: [_jsx(Typography, { type: 'paragraph-large', text: props.title, fontWeight: 'bold' }, void 0),
                    _jsx(Spacer, { height: 'half' }, void 0),
                    _jsx(Typography, { type: 'paragraph-medium', text: props.description }, void 0)] }), void 0),
            _jsxs("div", Object.assign({ className: "vieolo-double-toggle-list__list-container" }, { children: [_jsx(SingleList, { list: onList, on: true, onItemToggle: props.onItemToggle, chipSize: props.chipSize }, void 0),
                    _jsx(SingleList, { list: offList, on: false, onItemToggle: props.onItemToggle, chipSize: props.chipSize }, void 0)] }), void 0)] }), void 0);
}
function SingleList(props) {
    return _jsx("div", Object.assign({ className: `vieolo-double-toggle-list__list vieolo-double-toggle-list__list--${props.on ? "on" : "off"}` }, { children: props.list.map(i => {
            return _jsx(Chip, { label: i.title, id: i.id, color: props.on ? 'success' : 'error', emphasis: 'medium', size: props.chipSize, icon: props.on ? _jsx(DoneIcon, {}, void 0) : _jsx(CloseIcon, {}, void 0), onChipSelect: () => props.onItemToggle(i.id, !props.on), disabled: i.disabled }, i.id);
        }) }), void 0);
}
