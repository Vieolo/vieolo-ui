import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Card from "./card";
import Typography from "../typography/typography";
import Divider from "../layout/auxiliary/divider";
import Spacer from "../layout/auxiliary/spacer";
import IconButton from "../button/icon_button";
// Icons
import { ArrowDown, ArrowUp } from "../icons/icons";
// Installed Packages
import VDate from "@vieolo/date";
import { useState } from "react";
export default function TitlePeriodCard(props) {
    let [state, setState] = useState(props.initialState);
    let finalStart = typeof props.start === 'string' ? new VDate(props.start) : props.start;
    let finalEnd = typeof props.end === 'string' ? new VDate(props.end) : props.end;
    let difference = Math.floor((new VDate(finalEnd.getTime()).setToDateStart().getTime() - new VDate(finalStart.getTime()).setToDateStart().getTime()) / 86400000) + (props.excludeLastDay ? 0 : 1);
    let differenceText = difference === 1 ? props.singleDayText || "Day" : props.multipleDayText || "Days";
    return _jsx(Card, Object.assign({ borderRadius: props.borderRadius, elevation: props.elevation, padding: 'half', emphasis: props.emphasis, color: props.color, ariaLabel: props.ariaLabel }, { children: _jsxs("div", Object.assign({ className: "vieolo-title-period-card" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-title-period-card__header" }, { children: [_jsxs("div", Object.assign({ className: "vieolo-title-period-card__header__text" }, { children: [_jsx(Typography, { type: 'paragraph-medium', text: props.title, ariaLabel: `${props.ariaLabel || props.title} title` }, void 0),
                                _jsxs("div", Object.assign({ className: "vieolo-title-period-card__header__text__date" }, { children: [_jsx(Typography, { type: "paragraph-medium", text: `${difference} ${differenceText}`, fontWeight: "bold", ariaLabel: `${props.ariaLabel || props.title} day difference` }, void 0),
                                        _jsx(Typography, { type: "paragraph-small", text: `${finalStart.formatDate(props.dateDisplayFormat)} - ${finalEnd.formatDate(props.dateDisplayFormat)}`, ariaLabel: `${props.ariaLabel || props.title} dates` }, void 0)] }), void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "vieolo-title-period-card__header__action" }, { children: [(props.initialState && props.description) &&
                                    _jsx(IconButton, { onClick: () => setState(state === 'expanded' ? 'collapsed' : "expanded"), icon: state === 'expanded' ? _jsx(ArrowUp, {}, void 0) : _jsx(ArrowDown, {}, void 0), size: "extra-small", emphasis: "none", ariaLabel: `${props.ariaLabel || props.title} expand button` }, void 0),
                                props.actions &&
                                    props.actions.map(a => {
                                        return _jsx(IconButton, { icon: a.icon, onClick: a.onClick, color: a.color, size: 'extra-small', emphasis: "none", ariaLabel: a.ariaLabel }, a.id);
                                    })] }), void 0)] }), void 0),
                (props.description && state !== 'collapsed') &&
                    _jsxs("div", Object.assign({ className: "vieolo-title-period-card__description" }, { children: [_jsx(Spacer, { height: "half" }, void 0),
                            _jsx(Divider, { direction: "horizontal", length: "pc-50", position: "center" }, void 0),
                            _jsx(Spacer, { height: "half" }, void 0),
                            _jsx(Typography, { type: "paragraph-medium", text: props.description, ariaLabel: `${props.ariaLabel || props.title} description` }, void 0)] }), void 0)] }), void 0) }), void 0);
}
