// Vieolo UI
import GridContainer from "./grid_container";
import Grid from "./grid";
import { GridGapType } from "../../private/types";

export default function GridTwo(props: {
    children: React.ReactNode[],
    responsiveBreakpoint?: 'lg' | 'md' | 'sm',
    rowGap?: GridGapType,
    columnGap?: GridGapType,
}) {
    function getFlex(b: 'lg' | 'md' | 'sm') {
        if (b === 'lg') {
            return ['lg'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        } else if (b === 'md') {
            return ['lg', 'md'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        } else {
            return ['lg', 'md', 'sm'].includes(props.responsiveBreakpoint || '') ? 12 : 6;
        }
    }

    return <GridContainer rowGap={props.rowGap} columnGap={props.columnGap} >
        {
            props.children.map((c, i) => {
                return <Grid key={i} xl={6} lg={getFlex('lg')} md={getFlex('md')} sm={getFlex('sm')} >{c}</Grid>
            })
        }
    </GridContainer>
}