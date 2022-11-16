import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Card from "../Card";
import Divider from "../Divider";
import Typography from "../Typography";
import Spacer from "../Spacer";
import IconButton from "../IconButton";
// Icons
import { ArrowDown, ArrowUp } from "../icons";
// Installed Packages
import VDate from "@vieolo/date";
import { useState } from "react";
export default function TitlePeriodCard(props) {
    let [state, setState] = useState(props.initialState);
    let finalStart = typeof props.start === 'string' ? new VDate(props.start) : props.start;
    let finalEnd = typeof props.end === 'string' ? new VDate(props.end) : props.end;
    let difference = Math.floor((new VDate(finalEnd.getTime()).setToDateStart().getTime() - new VDate(finalStart.getTime()).setToDateStart().getTime()) / 86400000) + (props.excludeLastDay ? 0 : 1);
    let differenceText = difference === 1 ? props.singleDayText || "Day" : props.multipleDayText || "Days";
    return _jsx(Card, { borderRadius: props.borderRadius, elevation: props.elevation, padding: 'half', emphasis: props.emphasis, color: props.color, ariaLabel: props.ariaLabel, children: _jsxs("div", { className: "vieolo-title-period-card", children: [_jsxs("div", { className: "vieolo-title-period-card__header", children: [_jsxs("div", { className: "vieolo-title-period-card__header__text", children: [_jsx(Typography, { type: 'paragraph-medium', text: props.title, ariaLabel: `${props.ariaLabel || props.title} title` }), _jsxs("div", { className: "vieolo-title-period-card__header__text__date", children: [_jsx(Typography, { type: "paragraph-medium", text: `${difference} ${differenceText}`, fontWeight: "bold", ariaLabel: `${props.ariaLabel || props.title} day difference` }), _jsx(Typography, { type: "paragraph-small", text: `${finalStart.formatDate(props.dateDisplayFormat)} - ${finalEnd.formatDate(props.dateDisplayFormat)}`, ariaLabel: `${props.ariaLabel || props.title} dates` })] })] }), _jsxs("div", { className: "vieolo-title-period-card__header__action", children: [(props.initialState && props.description) &&
                                    _jsx(IconButton, { onClick: () => setState(state === 'expanded' ? 'collapsed' : "expanded"), icon: state === 'expanded' ? _jsx(ArrowUp, {}) : _jsx(ArrowDown, {}), size: "extra-small", emphasis: "none", ariaLabel: `${props.ariaLabel || props.title} expand button` }), props.actions &&
                                    props.actions.map(a => {
                                        return _jsx(IconButton, { icon: a.icon, onClick: a.onClick, color: a.color, size: 'extra-small', emphasis: "none", ariaLabel: a.ariaLabel }, a.id);
                                    })] })] }), (props.description && state !== 'collapsed') &&
                    _jsxs("div", { className: "vieolo-title-period-card__description", children: [_jsx(Spacer, { height: "half" }), _jsx(Divider, { direction: "horizontal", length: "pc-50", position: "center" }), _jsx(Spacer, { height: "half" }), _jsx(Typography, { type: "paragraph-medium", text: props.description, ariaLabel: `${props.ariaLabel || props.title} description` })] })] }) });
}
