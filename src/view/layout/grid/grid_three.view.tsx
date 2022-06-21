// React
import React from 'react';

// Component
import GridThree from '../../../GridThree';

// Types
import { ViewData } from '../../main/main';

type GridThreePropsType = React.ComponentProps<typeof GridThree>;

export function gridThreeOptions(): ViewData {

    return {
        constants: {

        } as Partial<GridThreePropsType>,
        variables: {
            rowGap: {
                options: ['none', 'half', 'one', 'two'],
                default: 'half'
            },
            columnGap: {
                options: ['none', 'half', 'one', 'two'],
                default: 'half'
            },
            responsiveBreakpoint: {
                options: ["", "lg", "md", "sm"],
                default: "",
            }
        }
    }
}


export function GridThreeCreator(props: { p: GridThreePropsType }) {

    let child = <div className="background-color--secondary-light">col</div>

    return <div className="width--pc-100 height--px-500">
        <GridThree
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
            {child}
            {child}
            {child}
        </GridThree>
    </div>
}