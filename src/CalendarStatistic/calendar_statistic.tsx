
// React
import React, { useState } from 'react';

// Material UI
import ExpandIcon from '@mui/icons-material/FullscreenRounded';
import CollapseIcon from '@mui/icons-material/FullscreenExitRounded';

// Vieolo UI
import IconButton from '../IconButton';
import Modal from '../Modal';
import Typography from '../Typography';
import Card from '../Card';

// Installed Packages
import VDate from '@vieolo/date';
import { toFixed } from '@vieolo/parsers/number_parsers';

// Types
import { ColorOptionType } from '../types';


export type CalendarStatisticData = {
    [day: string]: {
        text: string,
        disabled?: boolean,
        percent?: number | {
            value: number,
            color: ColorOptionType
        }
    }
}


export default function CalendarStatistic(props: {
    selectedMonth: VDate,
    /** A map of data to be displayed for each day of the month */
    data: CalendarStatisticData,
    /** The text to be displayed for the days that have no data */
    defaultText: string,
    showPercentage?: boolean
}) {

    // States
    let [expanded, setExpanded] = useState<boolean>(false);

    let dayCards: any = {};
    let startDate = new VDate(props.selectedMonth).setToMonthStart().getWeek().start;
    let endDate = new VDate(props.selectedMonth).setToMonthEnd().getWeek().end;
    let contentClass = `vieolo-calendar-statistic__content-${expanded ? "large" : "small"}`;

    for (let i = 0; i < 45; i++) {

        let thisDate = new VDate(startDate).addDay(i);
        let thisDateFormatted = thisDate.formatDate("yyyy-mm-dd");
        if (thisDate.isAfter(endDate)) break;
        let thisWeek = thisDate.getWeek();
        let defaultValue = props.defaultText;
        let dayData = props.data[thisDateFormatted]
        let cellClass = `${contentClass}__day-container__day-cell`;
        let className = `${cellClass}`;
        let hoverTitle = dayData ? dayData.text : defaultValue
        if (props.showPercentage) {
            hoverTitle += ` - ${(!dayData || !dayData.percent) ? '0' : toFixed((typeof dayData.percent === 'number' ? dayData.percent : dayData.percent.value) * 100, 2)}%`
        }

        if (thisDate.getMonth() !== props.selectedMonth.getMonth()) {
            className += " disabled";
            defaultValue = "";
        } else if (!dayData || dayData.disabled) {
            className += " disabled";
        }

        (dayCards[`week ${thisWeek.weekNumber}`] = dayCards[`week ${thisWeek.weekNumber}`] || []).push(
            <div className={className} key={thisDateFormatted} title={hoverTitle}>
                <Typography type='caption-medium' text={thisDate.getDate().toString()} nonselectable />
                <Typography type='paragraph-small' text={thisDateFormatted in props.data ? props.data[thisDateFormatted].text : defaultValue} nonselectable />
                {
                    (props.showPercentage && dayData && dayData.percent) &&
                    <div 
                        className={`${cellClass}__percent background-color--${typeof dayData.percent === 'number' ? 'primary' : dayData.percent.color}-transparent`} 
                        style={{height: `${(typeof dayData.percent === 'number' ? dayData.percent : dayData.percent!.value) * 100}%`}}>
                    </div>
                }
            </div>
        )
    }

    

    let sc = <div className="vieolo-calendar-statistic">
        <div className={contentClass}>
            <div className={`${contentClass}__header`}>
                <Typography type='paragraph-large' text={props.selectedMonth.formatMonth()} />

                <IconButton
                    icon={expanded ? <CollapseIcon /> : <ExpandIcon />}
                    onClick={() => setExpanded(!expanded)}
                    color={"primary"}
                    size="small"
                />
            </div>

            <div className={`${contentClass}__day-container`}>
                <div className={`${contentClass}__day-container__weekday-row`}>
                    {
                        ["M", "T", "W", "T", "F", "S", "S"].map((wd, i) => {
                            return <div key={`${wd}${i}`} className={`${contentClass}__day-container__day-cell`}>
                                <Typography type='caption-large' text={wd} />
                            </div>
                        })
                    }
                </div>
                {
                    Object.keys(dayCards).map((w, i) => {
                        return <div key={`${w[0]}${i}`} className={`${contentClass}__day-container__day-row`}>
                            {
                                dayCards[w]
                            }
                        </div>
                    })
                }
            </div>
        </div>
    </div>

    if (!expanded) return sc;

    return <Modal
        onClose={() => setExpanded(false)}
    >   
        <Card>
            {sc}
        </Card>
    </Modal>
}
