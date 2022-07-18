// Types
import Flex, { FlexDirection, FlexAlignItems, FlexJustifyContent, FlexWrap } from '../Flex';
import { GridGapType } from '../types/types';

type GridSpanType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export default function Grid(props: {
    xl: GridSpanType,
    lg?: GridSpanType,
    md?: GridSpanType,
    sm?: GridSpanType,
    direction?: 'row' | 'column',
    children?: React.ReactNode,
    className?: string,
    /**
     * Will wrap the children in a `Flex` component
     * This is useful to be able to align the children of the `Grid` without the need to manually add a `div` or styling
     */
    flex?: {
        direction?: FlexDirection,
        justifyContent?: FlexJustifyContent,
        alignItems?: FlexAlignItems,
        rowGap?: GridGapType,
        columnGap?: GridGapType,
        wrap?: FlexWrap
        className?: string
    }
}) {

    let d = props.direction || 'column';
    let c = `vieolo-grid grid-${d}--xl--${props.xl}`;

    if (props.className) c += ` ${props.className}`;
    if (props.lg !== undefined) c += ` grid-${d}--lg--${props.lg}`;
    if (props.md !== undefined) c += ` grid-${d}--md--${props.md}`;
    if (props.sm !== undefined) c += ` grid-${d}--sm--${props.sm}`;

    return <div className={c}>
        {
            props.flex
                ? <Flex
                    alignItems={props.flex.alignItems}
                    className={props.flex.className}
                    columnGap={props.flex.columnGap}
                    direction={props.flex.direction}
                    justifyContent={props.flex.justifyContent}
                    rowGap={props.flex.rowGap}
                >
                    {props.children}
                </Flex>
                : props.children
        }
    </div>
}