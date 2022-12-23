import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Vieolo UI
import Card from "../Card";
import Typography from "../Typography";
// Icons
// Icons
import { ArrowDown as ExpandIcon, ArrowUp as CollapseIcon } from '../icons/icons';
import { useState } from "react";
import Flex from "../Flex";
import IconButton from "../IconButton";
export default function TreeList(props) {
    return _jsx("div", { className: "vieolo-tree-list", children: _jsx(Flex, { direction: "column", rowGap: "half", children: props.items.map(item => {
                return _jsx(SingleParent, { item: item, onItemSelected: props.onItemSelect, selectedId: props.selectedID }, item.title);
            }) }) });
}
function SingleParent(props) {
    let [mode, setMode] = useState("collapsed");
    let hasChildren = props.item.children && props.item.children.length > 0;
    let isSelected = props.item.selected || (props.selectedId && props.item.id === props.selectedId);
    return _jsxs(Card, { className: "vieolo-tree-list-item", padding: "none", children: [_jsxs(Flex, { alignItems: "center", children: [hasChildren &&
                        _jsx(IconButton, { icon: mode === 'collapsed' ? _jsx(ExpandIcon, {}) : _jsx(CollapseIcon, {}), onClick: () => setMode(mode === 'collapsed' ? 'expanded' : 'collapsed'), size: 'extra-small' }), _jsx(Card, { emphasis: isSelected ? "medium" : "none-background", padding: 'half', className: "height--pc-100 width--pc-100 vieolo-tree-list-item__row", onClick: isSelected ? undefined : () => {
                            props.onItemSelected(props.item.id, props.item.title);
                        }, children: _jsxs(Flex, { className: "height--pc-100", justifyContent: "space-between", alignItems: "center", children: [_jsx(Typography, { text: props.item.title, type: 'title-small', color: isSelected ? "primary" : undefined, colorType: isSelected ? 'text-light' : undefined }), props.item.icon &&
                                    props.item.icon] }) })] }), mode === 'expanded' &&
                _jsx("div", { className: "vieolo-tree-list-item__children-container", children: props.item.children.map(c => {
                        return _jsx(SingleParent, { onItemSelected: (id, p) => props.onItemSelected(id, `${props.item.title}/${p}`), item: c, selectedId: props.selectedId }, c.title);
                    }) })] });
}
