// Vieolo UI
import Card from "./card";
import Typography from "../typography/typography";
import Divider from "../layout/auxiliary/divider";
import Spacer from "../layout/auxiliary/spacer";
import IconButton from "../button/icon_button";

// Icons
import { ArrowDown, ArrowUp } from "../icons/icons";

// Installed Packages
import VDate from "@vieolo/date";

// Types
import { BorderRadiusType, CardExtraActionType, ColorOptionType, ElevationType } from "../private/types";
import { useState } from "react";

export default function TitlePeriodCard(props: {
    /** 
     * If this prop is undefined, the card will not be collapsable 
     * upon expansion, the description is displayed
     */
    initialState?: 'collapsed' | 'expanded',
    title: string,
    /** */
    description?: string,
    start: VDate | string,
    end: VDate | string,
    dateDisplayFormat?: "yyyy-mm-dd" | "dd/mm/yyyy" | "mm/dd/yyyy" | "month dd, yyyy",
    /** default: "Day" */
    singleDayText?: string,
    /** default: "Days" */
    multipleDayText?: string,
    borderRadius?: BorderRadiusType,
    elevation?: ElevationType,
    emphasis?: "none" | "low",
    actions?: CardExtraActionType[],
    excludeLastDay?: boolean,
    color?: ColorOptionType,
    ariaLabel?: string
}) {

    let [state, setState] = useState<"collapsed" | "expanded" | undefined>(props.initialState);

    let finalStart = typeof props.start === 'string' ? new VDate(props.start) : props.start;
    let finalEnd = typeof props.end === 'string' ? new VDate(props.end) : props.end; 

    let difference = Math.floor((new VDate(finalEnd.getTime()).setToDateStart().getTime() - new VDate(finalStart.getTime()).setToDateStart().getTime()) / 86_400_000) + (props.excludeLastDay ? 0 : 1);
    let differenceText = difference === 1 ? props.singleDayText || "Day" : props.multipleDayText || "Days";

    return <Card borderRadius={props.borderRadius} elevation={props.elevation} padding='half' emphasis={props.emphasis} color={props.color} ariaLabel={props.ariaLabel}>
        <div className="vieolo-title-period-card">
            <div className="vieolo-title-period-card__header">
                <div className="vieolo-title-period-card__header__text">
                    <Typography type='paragraph-medium' text={props.title} ariaLabel={`${props.ariaLabel || props.title} title`} />

                    <div className="vieolo-title-period-card__header__text__date">
                        <Typography type="paragraph-medium" text={`${difference} ${differenceText}`} fontWeight="bold" ariaLabel={`${props.ariaLabel || props.title} day difference`} />
                        <Typography type="paragraph-small" text={`${finalStart.formatDate(props.dateDisplayFormat)} - ${finalEnd.formatDate(props.dateDisplayFormat)}`} ariaLabel={`${props.ariaLabel || props.title} dates`} />
                    </div>
                </div>

                <div className="vieolo-title-period-card__header__action">
                    {
                        (props.initialState && props.description) &&
                        <IconButton 
                            onClick={() => setState(state === 'expanded' ? 'collapsed' : "expanded")}
                            icon={state === 'expanded' ? <ArrowUp /> : <ArrowDown />}
                            size="extra-small"
                            emphasis="none"
                            ariaLabel={`${props.ariaLabel || props.title} expand button`}
                        />
                    }

                    {
                        props.actions &&
                        props.actions.map(a => {
                            return <IconButton 
                                key={a.id}
                                icon={a.icon}
                                onClick={a.onClick}
                                color={a.color}
                                size='extra-small'
                                emphasis="none"
                                ariaLabel={a.ariaLabel}
                            />
                        })
                    }
                </div>
            </div>
            
            {
                (props.description && state !== 'collapsed') &&
                <div className="vieolo-title-period-card__description">
                    <Spacer height="half" />
                    <Divider direction="horizontal" length="pc-50" position="center" />
                    <Spacer height="half" />
                    <Typography type="paragraph-medium" text={props.description} ariaLabel={`${props.ariaLabel || props.title} description`} />
                </div>
            }
        </div>
    </Card>

}