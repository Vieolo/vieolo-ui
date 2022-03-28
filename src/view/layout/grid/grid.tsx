// React
import React from 'react';

// Component
import GridContainer from '../../../lib/layout/grid/grid_container';
import Grid from '../../../lib/layout/grid/grid';

// Types
import { ViewData } from '../../main/main';
import Spacer from '../../../lib/layout/auxiliary/spacer';

type GridContainerPropsType = React.ComponentProps<typeof GridContainer>;

export function gridOptions(): ViewData {

    return {
        constants: {

        } as Partial<GridContainerPropsType>,
        variables: {
            direction: {
                options: ['column', 'row'],
                default: 'column'
            },
            rowGap: {
                options: ['none', 'half', 'one', 'two'],
                default: 'half'
            },
            columnGap: {
                options: ['none', 'half', 'one', 'two'],
                default: 'half'
            }
        }
    }
}


export function GridCreator(props: { p: GridContainerPropsType }) {

    let child = <div className="background-color--secondary-light">col</div>

    return <div>
        <GridContainer
            itemDirection={(props.p as any).direction}
            height={(props.p as any).direction === 'row' ? "1500px" : "0"}
            rowGap={props.p.rowGap}
            columnGap={props.p.columnGap}
            key={new Date().getTime()}
        >
            <Grid xl={3} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={3} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={3} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={3} direction={(props.p as any).direction} >{child}</Grid>

            <Grid xl={3} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={1} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={2} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={6} direction={(props.p as any).direction} >{child}</Grid>

            <Grid xl={6} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={6} direction={(props.p as any).direction} >{child}</Grid>

            <Grid xl={6} direction={(props.p as any).direction} >{child}</Grid>
            <Grid xl={6} lg={0} direction={(props.p as any).direction} >{child}</Grid>

            <Grid xl={0} lg={6} direction={(props.p as any).direction} >hidden in XL</Grid>
            <Grid xl={12} lg={6} direction={(props.p as any).direction} >{child}</Grid>
        </GridContainer>        
    </div>
}