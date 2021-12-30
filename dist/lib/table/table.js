import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// React
import { useState } from 'react';
import IconButton from '../button/icon_button';
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyTitleSmall from '../typography/typography_title_small';
// Material UI
import LeftArrowIcon from '@mui/icons-material/ArrowLeft';
import RightArrowIcon from '@mui/icons-material/ArrowRight';
import Checkbox from '../form/checkbox';
export default function Table(props) {
    let [allChecked, setAllChecked] = useState(false);
    let style = {};
    let contentStyle = {};
    if (props.width) {
        style.width = `${props.width}`;
    }
    if (props.maxHeight) {
        contentStyle.maxHeight = props.maxHeight;
        contentStyle.overflowY = 'scroll';
    }
    let columnGrid = props.columnGrid;
    if (props.isCheckable)
        columnGrid = `30px ${columnGrid}`;
    return _jsxs("div", Object.assign({ className: `vieolo-table ${props.removeHeaderRow ? 'vieolo-table--headless' : ''}`, style: style }, { children: [_jsxs("div", Object.assign({ className: "vieolo-table__content", style: contentStyle }, { children: [(props.removeHeaderRow !== true || Array.isArray(props.headers)) &&
                        _jsxs("div", Object.assign({ className: `vieolo-table__header-row ${props.stickyHeader ? 'position--sticky--top-0' : ''}`, style: { gridTemplateColumns: columnGrid } }, { children: [props.isCheckable &&
                                    _jsx("div", Object.assign({ className: 'center-by-flex-row' }, { children: _jsx(Checkbox, { onChange: (v) => {
                                                if (props.onCheckAll)
                                                    props.onCheckAll(v);
                                                setAllChecked(v);
                                            }, value: allChecked }, void 0) }), void 0),
                                (props.headers || []).map((h, i) => {
                                    return _jsxs("div", Object.assign({ className: "vieolo-table__header-row__cell", style: { cursor: (props.disableSort || !props.sortBy || !props.onSortChange || !props.sortDirection) ? 'default' : 'pointer' }, onClick: () => {
                                            if (!props.disableSort && props.onSortChange && props.sortBy && props.sortDirection) {
                                                props.onSortChange(h, props.sortBy === h ? props.sortDirection === 'ascending' ? 'descending' : 'ascending' : (props.defaultDirection || 'ascending'));
                                            }
                                        } }, { children: [_jsx(TypographyTitleSmall, { text: h }, void 0),
                                            (props.sortBy === h && !props.disableSort) &&
                                                _jsx(_Fragment, { children: props.sortDirection === 'ascending'
                                                        ? _jsx("p", { children: "\u2193" }, void 0)
                                                        : _jsx("p", { children: "\u2191" }, void 0) }, void 0)] }), `table_header_row_${i}`);
                                })] }), void 0),
                    _jsx("div", Object.assign({ className: (props.maxHeight && props.pagination) && "padding-bottom--40" }, { children: props.rows.map((row, i) => {
                            let baseClass = 'vieolo-table__content-row';
                            let className = `${baseClass}`;
                            if (props.isDense)
                                className += ` ${baseClass}--dense`;
                            if (row.checked)
                                className += ` ${baseClass}--checked`;
                            if (row.onClick)
                                className += ' clickable';
                            return _jsxs("div", Object.assign({ className: className, style: { gridTemplateColumns: columnGrid }, onClick: () => {
                                    if (row.onClick)
                                        row.onClick();
                                } }, { children: [props.isCheckable &&
                                        _jsx("div", Object.assign({ className: 'center-by-flex-row' }, { children: _jsx(Checkbox, { onChange: (v) => {
                                                    if (row.onCheckChange) {
                                                        row.onCheckChange();
                                                        setAllChecked(false);
                                                    }
                                                }, value: row.checked || false }, void 0) }), void 0),
                                    row.items.map((r, z) => {
                                        return _jsx("div", Object.assign({ className: "vieolo-table__content-row__cell" }, { children: typeof r === 'string'
                                                ? _jsx(TypographyParagraphMedium, { text: r }, void 0)
                                                : r }), `table_row_${row.id}_${z}_div`);
                                    })] }), `table_row_${row.id}`);
                        }) }), void 0)] }), void 0),
            props.pagination &&
                _jsx("div", Object.assign({ className: `vieolo-table__pagination-row ${props.maxHeight && 'position--sticky--bottom-0'}` }, { children: _jsxs("div", Object.assign({ className: "width--px-150 flex flex--space-around flex--align-items-center" }, { children: [_jsx(IconButton, { icon: _jsx(LeftArrowIcon, {}, void 0), onClick: () => props.pagination.onPageChange(props.pagination.pageNumber - 1), color: 'primary', size: 'small', disabled: props.pagination.pageNumber === 1 }, void 0),
                            _jsx("div", Object.assign({ className: "width--px-100 border-radius--half background-color--primary-normal padding-vertical--5 center-by-flex-row" }, { children: _jsx(TypographyParagraphMedium, { text: `${props.pagination.startIndex} - ${props.pagination.endIndex}`, className: "color--primary-text" }, void 0) }), void 0),
                            _jsx(IconButton, { icon: _jsx(RightArrowIcon, {}, void 0), onClick: () => props.pagination.onPageChange(props.pagination.pageNumber + 1), color: 'primary', size: 'small', disabled: !props.pagination.hasNextPage }, void 0)] }), void 0) }), void 0)] }), void 0);
}
