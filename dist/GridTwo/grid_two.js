import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import GridContainer from "../GridContainer";
import Grid from "../Grid";
export default function GridTwo(props) {
    function getFlex(b) {
        if (b === 'lg') {
            return ['lg'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        }
        else if (b === 'md') {
            return ['lg', 'md'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        }
        else {
            return ['lg', 'md', 'sm'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        }
    }
    return _jsx(GridContainer, { rowGap: props.rowGap, columnGap: props.columnGap, children: props.children.map((c, i) => {
            return _jsx(Grid, { xl: 6, lg: getFlex('lg'), md: getFlex('md'), sm: getFlex('sm'), children: c }, i);
        }) });
}
