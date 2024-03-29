// React
import React, { useState, useEffect } from 'react';

// Vieolo UI
import Typography from '../Typography';

// Material UI
import PreviousIcon from '@mui/icons-material/ArrowBackIosRounded';
import NextIcon from '@mui/icons-material/ArrowForwardIosRounded';


// Installed Packages
import VDate from '@vieolo/vdate';


// Internal Components
import CalendarStateless from '../CalendarStateless';
import Device from '@vieolo/device-js';


// External Components
import IconButton from '../IconButton';
import DateInput from '../DateInput';

// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';


export default function CalendarStateful(props: {
    startDate?: VDate,
    selectedDate?: string[],
    selectedWeek?: { weekNumber: number, startDate: VDate },
    includeWeek?: boolean,
    onDateSelect: (selected: VDate) => void,
    onWeekSelect?: (selected: VDate) => void,
    minDate?: VDate,
    maxDate?: VDate,
    showSearchInput?: boolean,
    onKeyboardExit?: () => void,
    ariaLabel?: string,
    dateCellAriaLabelSuffix?: string,
    title?: string,
    firstDayOfWeek?: 0 | 1
}) {

    let [currentDate, setCurrentDate] = useState<VDate>(new VDate().setToDateStart());

    let [searchDate, setSearchDate] = useState<VDate | null>(null);
    let [searchText, setSearchText] = useState<string>('');

    useEffect(() => {
        if (props.startDate) setCurrentDate(props.startDate);
        else if (props.selectedWeek) setCurrentDate(props.selectedWeek.startDate);
        // eslint-disable-next-line
    }, [])


    let isTouchDevice = Device.isTouchOnlyDevice;

    let className = "vieolo-calendar-statefull-component";    

    return <div 
        className={className}
        aria-label={props.ariaLabel + " popup"}
    >

        {
            props.title &&
            <Typography text={props.title} type='title-medium' textAlign='center' className='padding-bottom--two padding-top--one' />
        }

        {
            props.showSearchInput &&
            <div className='padding-vertical--half center-by-flex-row'>
                <form onSubmit={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (searchDate === null) return null;
                    if ((props.minDate && searchDate.isBefore(props.minDate)) || (props.maxDate && searchDate.isAfter(props.maxDate))) return null
                    props.onDateSelect(searchDate);
                }}>
                    <DateInput
                        onChange={(d, t) => {
                            setSearchDate(d);
                            setSearchText(t);
                        }}
                        value={searchText.trim()}
                        onKeyDown={e => {
                            handleOnKeyDown(e, {
                                onTab: () => {
                                    if (props.onKeyboardExit) props.onKeyboardExit();
                                },
                                onEscape: () => {
                                    if (props.onKeyboardExit) props.onKeyboardExit();
                                }
                            })
                        }}
                        autoFocus
                        dateFormat='DD/MM/YYYY'
                        ariaLabel={props.ariaLabel + ` Search Date`}
                    />
                </form>
            </div>
        }

        <div className="vieolo-calendar-statefull-component__calendar-year">
            <IconButton
                icon={<PreviousIcon />}
                size={isTouchDevice ? "small" : "extra-small"}
                borderRadius='normal'
                ariaLabel={props.ariaLabel + " year decrease button"}
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addYear(-1);
                    setCurrentDate(newDate);
                }}
            />
            <Typography text={`${currentDate.getFullYear()}`} />
            <IconButton
                icon={<NextIcon />}
                size={isTouchDevice ? "small" : "extra-small"}
                borderRadius='normal'
                ariaLabel={props.ariaLabel + " year increase button"}
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addYear(1);
                    setCurrentDate(newDate);
                }}
            />
        </div>


        <div className="vieolo-calendar-statefull-component__calendar-month">
            <IconButton
                icon={<PreviousIcon />}
                size={isTouchDevice ? "small" : "extra-small"}
                borderRadius='normal'
                ariaLabel={props.ariaLabel + " month decrease button"}
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addDay(-1).setToMonthStart();
                    setCurrentDate(newDate);
                }}
            />
            <Typography text={`${currentDate.formatMonth().split(' ')[0]}`} />
            <IconButton
                icon={<NextIcon />}
                size={isTouchDevice ? "small" : "extra-small"}
                borderRadius='normal'
                ariaLabel={props.ariaLabel + " month increase button"}
                onClick={e => {
                    e.stopPropagation()
                    let newDate = new VDate(currentDate).setToMonthStart().addDay(33).setToMonthStart();
                    setCurrentDate(newDate);
                }}
            />

        </div>


        <CalendarStateless
            currentDate={currentDate}
            onDateSelect={props.onDateSelect}
            includeWeek={props.includeWeek}
            onWeekSelect={props.onWeekSelect}
            selectedDate={props.selectedDate}
            selectedWeek={props.selectedWeek ? [props.selectedWeek.weekNumber] : undefined}
            maxDate={props.maxDate}
            minDate={props.minDate}
            ariaLabel={props.ariaLabel + " day container"}
            dateCellAriaLabelSuffix={props.dateCellAriaLabelSuffix}
            firstDayOfWeek={props.firstDayOfWeek}
        />
    </div>
}
