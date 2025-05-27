/// <reference types="react" />
import VDate, { DateFormats } from "@vieolo/vdate";
import { BorderRadiusType, CardExtraActionType, ColorOptionType, ElevationType } from "../types/types";
export default function TitlePeriodCard(props: {
    /**
     * If this prop is undefined, the card will not be collapsable
     * upon expansion, the description is displayed
     */
    initialState?: 'collapsed' | 'expanded';
    title: string;
    /** */
    description?: string;
    start: VDate | string;
    end: VDate | string;
    dateDisplayFormat?: DateFormats;
    /** default: "Day" */
    singleDayText?: string;
    /** default: "Days" */
    multipleDayText?: string;
    borderRadius?: BorderRadiusType;
    elevation?: ElevationType;
    emphasis?: "none" | "low";
    actions?: CardExtraActionType[];
    excludeLastDay?: boolean;
    color?: ColorOptionType;
    ariaLabel?: string;
}): JSX.Element;
