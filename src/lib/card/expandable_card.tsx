// Vieolo UI
import Card from "./card";
import IconButton from "../button/icon_button";

// Types
import { RowStyleType } from "../private/types";

// Meterial UI
import ExpandIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CollapseIcon from "@mui/icons-material/KeyboardArrowUpRounded";
import { useState } from "react";
import { TypographyParagraphMedium } from "../typography";

export default function ExpandableCard(props: {
    initialState?: 'expanded' | 'collapsed',
    onStateChage?: (s: 'expanded' | 'collapsed') => void,
    title: string,
    collapsedCardStyle?: RowStyleType,
    expandedCardStyle?: RowStyleType,
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