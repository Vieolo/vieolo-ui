// React
import React from 'react';

// Component
import GridTwo from '../../../lib/layout/grid/grid_two';

// Types
import { ViewData } from '../../main/main';

type GridTwoPropsType = React.ComponentProps<typeof GridTwo>;

export function gridTwoOptions(): ViewData {

    return {
        constants: {

        } as Partial<GridTwoPropsType>,
        variables: {
            rowGap: {
                options: ['none', 'half', 'one', 'two'],
                default: 'none'
            },
            columnGap: {
                options: ['none', 'half', 'one', 'two'],
                default: 'none'
            },
            responsiveBreakpoint: {
                options: ["", "lg", "md", "sm"],
                default: "",
            }
        }
    }
}


export function GridTwoCreator(props: { p: GridTwoPropsType }) {

    let child = <div className="background-color--secondary-light">col</div>

    return <div className="width--pc-100 height--px-500">
        <GridTwo
            columnGap={props.p.columnGap}
            rowGap={props.p.rowGap}
            responsiveBreakpoint={props.p.responsiveBreakpoint}
            key={new Date().getTime()}
        >
            {child}
            {child}
            {child}
            {child}
            {child}
        </GridTwo>
    </div>
}