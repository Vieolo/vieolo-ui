import { jsx as _jsx } from "react/jsx-runtime";
// Vieolo UI
import GridContainer from "./grid_container";
import Grid from "./grid";
export default function GridTwo(props) {
    function getFlex(b) {
        if (b === 'lg') {
            console.log("lg", ['lg'].includes(props.responsiveBreakpoint || '') ? 12 : 6);
            return ['lg'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        }
        else if (b === 'md') {
            return ['lg', 'md'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        }
        else {
            return ['lg', 'md', 'sm'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        }
    }
    return _jsx(GridContainer, Object.assign({ rowGap: props.rowGap, columnGap: props.columnGap }, { children: props.children.map((c, i) => {
            return _jsx(Grid, Object.assign({ xl: 6, lg: getFlex('lg'), md: getFlex('md'), sm: getFlex('sm') }, { children: c }), i);
        }) }), void 0);
}
