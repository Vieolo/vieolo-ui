import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
// Typography
import TypographyParagraphMedium from '../typography/typography_paragraph_medium';
import TypographyTitleSmall from '../typography/typography_title_small';
export default function Table(props) {
    let style = {};
    if (props.width) {
        style.width = `${props.width}`;
    }
    return _jsxs("div", Object.assign({ className: `vieolo-table ${props.removeHeaderRow ? 'vieolo-table--headless' : ''}`, style: style }, { children: [props.removeHeaderRow !== true &&
                _jsx("div", Object.assign({ className: "vieolo-table__header-row", style: { gridTemplateColumns: props.columnGrid } }, { children: props.headers.map((h, i) => {
                        return _jsxs("div", Object.assign({ className: "vieolo-table__header-row__cell", style: { cursor: props.disableSort ? 'default' : 'pointer' }, onClick: () => {
                                if (!props.disableSort) {
                                    props.onSortChange(h, props.sortBy === h ? props.sortDirection === 'ascending' ? 'descending' : 'ascending' : (props.defaultDirection || 'ascending'));
                                }
                            } }, { children: [_jsx(TypographyTitleSmall, { text: h }, void 0),
                                (props.sortBy === h && !props.disableSort) &&
                                    _jsx(_Fragment, { children: props.sortDirection === 'ascending'
                                            ? _jsx("p", { children: "\u2193" }, void 0)
                                            : _jsx("p", { children: "\u2191" }, void 0) }, void 0)] }), `table_header_row_${i}`);
                    }) }), void 0),
            props.rows.map((row, i) => {
                return _jsx("div", Object.assign({ className: `vieolo-table__content-row ${props.onRowClick ? "clickable" : ''}`, style: { gridTemplateColumns: props.columnGrid }, onClick: () => {
                        if (props.onRowClick)
                            props.onRowClick(i);
                    } }, { children: row.map((r, z) => {
                        return _jsx("div", Object.assign({ className: "vieolo-table__content-row__cell" }, { children: typeof r === 'string'
                                ? _jsx(TypographyParagraphMedium, { text: r }, void 0)
                                : r }), `table_row_${i}_${z}_div`);
                    }) }), `table_row_${i}`);
            })] }), void 0);
}
