import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
// Vieolo UI
import List from '../List';
import Typography from '../Typography';
import SubNavbarRow from '../SubNavbarRow';
export default function SubDashboard(props) {
    let history = useHistory();
    useEffect(() => {
        if (props.handleSubPageInURL) {
            let selected = props.items.find(z => z.selected);
            if (selected) {
                history.replace({ pathname: window.location.pathname, search: `${window.location.search ? window.location.search.split("&").filter(z => !z.includes("sub-dash-page=")).join("&") + "&" : ""}sub-dash-page=${selected.id.replace(/ /g, "__")}` });
            }
            if (!selected && window.location.search.includes("sub-dash-page")) {
                let initial = props.items.find(z => z.id === window.location.search.split(`sub-dash-page=`)[1].split("&")[0].replace("__", " "));
                if (initial && initial.onClick)
                    initial.onClick();
            }
        }
    }, [props, history]);
    return _jsxs("div", Object.assign({ className: 'vieolo-sub-dashboard' }, { children: [props.subNavbarOptions &&
                _jsx(SubNavbarRow, { actions: props.subNavbarOptions ? props.subNavbarOptions.actions : undefined, backButtonText: props.subNavbarOptions ? props.subNavbarOptions.backButtonText : undefined, center: props.subNavbarOptions ? props.subNavbarOptions.center : undefined, midColumnSize: props.subNavbarOptions ? props.subNavbarOptions.midColumnSize : undefined, icon: props.subNavbarOptions ? props.subNavbarOptions.icon : undefined, onBack: props.subNavbarOptions ? props.subNavbarOptions.onBack : undefined, removeBackButton: props.subNavbarOptions ? props.subNavbarOptions.removeBackButton : undefined }, void 0),
            _jsxs("div", Object.assign({ className: `vieolo-sub-dashboard__grid  vieolo-sub-dashboard__grid--${props.subNavbarOptions ? "subnavbar" : 'bare'}` }, { children: [_jsx("div", Object.assign({ className: 'vieolo-sub-dashboard__grid__left-col' }, { children: _jsx(List, Object.assign({ height: '100%', itemStyle: props.itemStyle, items: props.items }, props.itemListOptions), void 0) }), void 0),
                    _jsx("div", Object.assign({ className: "sub-dashboard__grid__right-col" }, { children: props.children
                            ? props.children
                            : (props.emptyIcon || props.emptyText) &&
                                _jsxs("div", Object.assign({ className: "sub-dashboard__grid__right-col__empty" }, { children: [props.emptyIcon &&
                                            props.emptyIcon,
                                        props.emptyText &&
                                            _jsx(Typography, { type: 'title-medium', text: props.emptyText }, void 0)] }), void 0) }), void 0)] }), void 0)] }), void 0);
}
