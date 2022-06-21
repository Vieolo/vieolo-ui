import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from "react";
// Vieolo UI
import Card from "../Card/card";
import IconButton from "../IconButton";
import Typography from "../Typography";
// Icons
import { ArrowDown as ExpandIcon, ArrowUp as CollapseIcon } from '../icons/icons';
export default function ExpandableCard(props) {
    let [internalState, setInternalState] = useState(props.state ? undefined : props.initialState || 'collapsed');
    let state = props.state || internalState;
    let cardStyle = (props.state || state) === 'collapsed' ? (props.collapsedCardStyle || {}) : (props.expandedCardStyle || {});
    return _jsx(Card, Object.assign({ borderRadius: cardStyle.borderRadius, color: cardStyle.color, elevation: cardStyle.elevation, emphasis: cardStyle.emphasis, padding: "none", ariaLabel: props.ariaLabel }, { children: _jsxs("div", Object.assign({ className: "vieolo-expandable-card" }, { children: [_jsxs("div", Object.assign({ className: `vieolo-expandable-card__header vieolo-expandable-card__header--${state} row-height--${cardStyle.height || 'medium'}` }, { children: [_jsx(IconButton, { icon: state === 'expanded' ? _jsx(CollapseIcon, {}, void 0) : _jsx(ExpandIcon, {}, void 0), size: cardStyle.height === 'small' ? 'extra-small' : 'small', borderRadius: cardStyle.borderRadius || 'default', emphasis: 'none', ariaLabel: `${props.ariaLabel || props.title} expand button`, onClick: () => {
                                let newState = state === 'expanded' ? 'collapsed' : 'expanded';
                                if (props.state && props.onStateChange) {
                                    props.onStateChange(newState);
                                }
                                else {
                                    setInternalState(newState);
                                    if (props.onStateChange)
                                        props.onStateChange(newState);
                                }
                            } }, void 0),
                        _jsx("div", { className: "padding-horizontal--half" }, void 0),
                        _jsx(Typography, { type: 'paragraph-medium', text: props.title, fontWeight: 'bold', ariaLabel: `${props.ariaLabel || props.title} title` }, void 0),
                        props.actions &&
                            _jsx("div", Object.assign({ className: "vieolo-expandable-card__header__actions" }, { children: props.actions }), void 0)] }), void 0),
                state === 'expanded' &&
                    _jsx("div", Object.assign({ className: "vieolo-expandable-card__body" }, { children: props.children }), void 0)] }), void 0) }), void 0);
}
