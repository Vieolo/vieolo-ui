// React
import { useState } from "react";

// Vieolo UI
import Card from "./card";
import IconButton from "../button/icon_button";
import { TypographyParagraphMedium } from "../typography";

// Types
import { RowStyleType } from "../private/types";

// Icons
import {
    ArrowDown as ExpandIcon,
    ArrowUp as CollapseIcon
} from '../icons/icons';

export default function ExpandableCard(props: {
    /**
     * The expandable card is stateful. Meaning that it will control it's collapse or expansion
     * This prop sets the initial state
     */
    initialState?: 'expanded' | 'collapsed',
    /**
     * The optional callback when the card is expanded.
     * Implementing this callback is not necessary for the actual expansion of the card
     */
    onStateChage?: (s: 'expanded' | 'collapsed') => void,
    /** The title displayed in the header of the card */
    title: string,
    /** The style of the card when collapsed */
    collapsedCardStyle?: RowStyleType,
    /** The style of the card when expanded */
    expandedCardStyle?: RowStyleType,
    /** 
     * The components appearing on the right side of the card when collapsed
     */
    actions?: React.ReactNode,
    children?: React.ReactNode
}) {

    let [state, setState] = useState<"expanded" | 'collapsed'>(props.initialState || 'collapsed');

    let cardStyle = state === 'collapsed' ? (props.collapsedCardStyle || {}) : (props.expandedCardStyle || {});

    return <Card
        borderRadius={cardStyle.borderRadius}
        color={cardStyle.color}
        elevation={cardStyle.elevation}
        emphasis={cardStyle.emphasis}
        padding="none"
    >
        <div className="vieolo-expandable-card">

            <div className={`vieolo-expandable-card__header vieolo-expandable-card__header--${state} row-height--${cardStyle.height || 'medium'}`}>
                <IconButton
                    icon={state === 'expanded' ? <CollapseIcon /> : <ExpandIcon />}
                    size={cardStyle.height === 'small' ? 'extra-small' : 'small'}
                    borderRadius={cardStyle.borderRadius || 'default'}
                    emphasis={'none'}
                    onClick={() => {
                        let newState: 'collapsed' | 'expanded' = state === 'expanded' ? 'collapsed' : 'expanded';
                        setState(newState);
                        if (props.onStateChage) props.onStateChage(newState);
                    }}
                />

                <div className="padding-horizontal--half"></div>

                <TypographyParagraphMedium text={props.title} fontWeight={'bold'} />

                {
                    props.actions &&
                    <div className="vieolo-expandable-card__header__actions">
                        {props.actions}
                    </div>
                }
            </div>

            {
                state === 'expanded' &&
                <div className="vieolo-expandable-card__body">
                    {props.children}
                </div>
            }

        </div>
    </Card>

}