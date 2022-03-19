import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Card from "./card";
import IconButton from "../button/icon_button";
// Meterial UI
import ExpandIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CollapseIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useState } from "react";
import { TypographyParagraphMedium } from "../typography";
export default function ExpandableCard(props) {
    let [state, setState] = useState(props.initialState || 'collapsed');
    let cardStyle = state === 'collapsed' ? (props.collapsedCardStyle || {}) : (props.expandedCardStyle || {});
    return _jsx(Card, Object.assign({ borderRadius: cardStyle.borderRadius, color: cardStyle.color, elevation: cardStyle.elevation, emphasis: cardStyle.emphasis, padding: "none" }, { children: _jsxs("div", Object.assign({ className: "vieolo-expandable-card" }, { children: [_jsxs("div", Object.assign({ className: `vieolo-expandable-card__header vieolo-expandable-card__header--${state} row-height--${cardStyle.height || 'medium'}` }, { children: [_jsx(IconButton, { icon: state === 'expanded' ? _jsx(CollapseIcon, {}, void 0) : _jsx(ExpandIcon, {}, void 0), size: cardStyle.height === 'small' ? 'extra-small' : 'small', borderRadius: cardStyle.borderRadius || 'default', emphasis: 'none', onClick: () => {
                                let newState = state === 'expanded' ? 'collapsed' : 'expanded';
                                setState(newState);
                                if (props.onStateChage)
                                    props.onStateChage(newState);
                            } }, void 0),
                        _jsx("div", { className: "padding-horizontal--half" }, void 0),
                        _jsx(TypographyParagraphMedium, { text: props.title, fontWeight: 'bold' }, void 0),
                        props.actions &&
                            _jsx("div", Object.assign({ className: "vieolo-expandable-card__header__actions" }, { children: props.actions }), void 0)] }), void 0),
                state === 'expanded' &&
                    _jsx("div", Object.assign({ className: "vieolo-expandable-card__body" }, { children: props.children }), void 0)] }), void 0) }), void 0);
}
