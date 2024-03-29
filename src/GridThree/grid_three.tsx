// Vieolo UI
import GridContainer from "../GridContainer";
import Grid from "../Grid";
import { GridGapType } from "../types/types";

export default function GridThree(props: {
    children: React.ReactNode[],
    responsiveBreakpoint?: 'lg' | 'md' | 'sm',
    rowGap?: GridGapType,
    columnGap?: GridGapType,
}) {
    function getFlex(b: 'lg' | 'md' | 'sm') {
        if (b === 'lg') {
            return ['lg'].includes(props.responsiveBreakpoint || '') ? 12 : 4;
        } else if (b === 'md') {
            return ['lg', 'md'].includes(props.responsiveBreakpoint || '') ? 12 : 4;
        } else {
            return ['lg', 'md', 'sm'].includes(props.responsiveBreakpoint || '') ? 12 : 4;
        }
    }

    return <GridContainer rowGap={props.rowGap} columnGap={props.columnGap} >
        {
            props.children.map((c, i) => {
                return <Grid key={i} xl={4} lg={getFlex('lg')} md={getFlex('md')} sm={getFlex('sm')} >{c}</Grid>
            })
        }
    </GridContainer>
}