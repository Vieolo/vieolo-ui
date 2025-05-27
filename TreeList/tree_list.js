import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
// React
import { useEffect, useState } from "react";
// Vieolo UI
import Card from "../Card";
import Typography from "../Typography";
import Flex from "../Flex";
import IconButton from "../IconButton";
// Icons
import { ArrowDown as ExpandIcon, ArrowUp as CollapseIcon } from '../icons/icons';
export default function TreeList(props) {
    return _jsx("div", { className: "vieolo-tree-list", children: _jsx(Flex, { direction: "column", rowGap: "half", children: props.items.map(item => {
                return _jsx(SingleParent, { item: item, onItemSelected: props.onItemSelect, selectedId: props.selectedID }, item.title);
            }) }) });
}
function SingleParent(props) {
    let [mode, setMode] = useState("collapsed");
    useEffect(() => {
        function loop(children) {
            for (let i = 0; i < children.length; i++) {
                const ch = children[i];
                if (ch.id === props.selectedId) {
                    setMode("expanded");
                    break;
                }
                else {
                    if (ch.children) {
                        loop(ch.children);
                    }
                }
            }
        }
        if (props.item.children && props.item.children.length > 0) {
            loop(props.item.children);
        }
    }, [props.selectedId, props.item.children]);
    let hasChildren = props.item.children && props.item.children.length > 0;
    let isSelected = props.item.selected || (props.selectedId && props.item.id === props.selectedId);
    return _jsxs(_Fragment, { children: [props.item.group &&
                _jsxs(Card, { ...(props.item.group.card || {}), className: "margin-top--one", children: [_jsx(Typography, { text: props.item.group.title, type: 'title-small' }), props.item.group.description &&
                            _jsx(Typography, { text: props.item.group.description, type: 'paragraph-small' })] }), _jsxs(Card, { className: "vieolo-tree-list-item", padding: "none", children: [_jsxs(Flex, { alignItems: "center", children: [hasChildren &&
                                _jsx(IconButton, { icon: mode === 'collapsed' ? _jsx(ExpandIcon, {}) : _jsx(CollapseIcon, {}), onClick: () => setMode(mode === 'collapsed' ? 'expanded' : 'collapsed'), size: 'extra-small' }), _jsx(Card, { emphasis: isSelected ? "medium" : "none-background", padding: 'half', className: "height--pc-100 width--pc-100 vieolo-tree-list-item__row", onClick: (isSelected || props.item.blockOnClick) ? undefined : () => {
                                    props.onItemSelected(props.item.id, props.item.title);
                                }, children: _jsxs(Flex, { className: "height--pc-100", justifyContent: "space-between", alignItems: "center", children: [_jsxs(Flex, { alignItems: "center", columnGap: "half", children: [props.item.startIcon &&
                                                    props.item.startIcon, _jsx(Typography, { text: props.item.title, type: 'title-small', color: isSelected ? "primary" : undefined, colorType: isSelected ? 'text-light' : undefined })] }), props.item.endIcon &&
                                            props.item.endIcon] }) })] }), mode === 'expanded' &&
                        _jsx("div", { className: "vieolo-tree-list-item__children-container", children: props.item.children.map(c => {
                                return _jsx(SingleParent, { onItemSelected: (id, p) => props.onItemSelected(id, `${props.item.title}/${p}`), item: c, selectedId: props.selectedId }, c.title);
                            }) })] })] });
}
