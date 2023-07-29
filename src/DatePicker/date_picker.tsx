// React
import React, { useState, useRef } from 'react';

// Material UI
import CalendarIcon from '@mui/icons-material/DateRangeRounded';

// Installed Packages
import VDate, { DateFormats } from '@vieolo/vdate';
import Device from '@vieolo/device-js';

// Vieolo UI
import CalendarStateful from '../CalendarStateful';
import Typography from '../Typography';
import Modal from '../Modal';

// Hooks
import { useAppearingContainer } from '../hooks/useAppearingContainer';

// Utility
import { handleOnKeyDown } from '../utility/onkeydown_utility';
import IconButton from '../IconButton';
import { CloseIcon } from '../icons';


export default function DatePicker(props: {
    /**
     * The custom date picker button to be rendered instead of the default button.
     * This component should NOT have a `onClick` event as clicking its parent will lead to opening of the date picker modal
     * Using this custom button will render the display of title, selected date, and week number useless.
     */
    buttonComponent?: React.ReactNode,
    onDateSelect: (selected: VDate) => void,
    /** 
     * The callback used when a week number is selected.
     * The first day of the week is passed in the callback 
     */
    onWeekSelect?: (selected: VDate) => void,
    /** Whether to show week number in the date picker modal */
    includeWeek?: boolean,
    selectedDate?: VDate,
    selectedWeek?: { weekNumber: number, startDate: VDate },
    /** The title to be shown above the selected date in the default button */
    title?: string,
    /** Whether to show the week number of the selected date in the dafault button */
    showSelectedWeek?: boolean,
    ariaLabel?: string,
    disabled?: boolean,
    dateFormat?: DateFormats,
    /** default: medium */
    width?: 'small' | 'medium' | 'full',
    error?: boolean,
    onClear?: () => void,
}): JSX.Element {

    let [open, setOpen] = useState<boolean>(false);
    let [openedByKeyboard, setOpenedByKeyboard] = useState<boolean>(false);

    let container = useRef<HTMLDivElement>(null);

    useAppearingContainer(
        container,
        open,
        setOpen,
        () => {
            setOpenedByKeyboard(false);
        }
    );

    function getStartDate(): VDate {
        if (props.selectedDate) return props.selectedDate;
        else if (props.selectedWeek) return props.selectedWeek.startDate;
        else return new VDate().setToDateStart();
    }
    
    let bc = "vieolo-date-picker__button-container__default-button"
    let buttonContainerClass = bc; 
    buttonContainerClass += ` ${bc}--${props.width || 'medium'}`
    
    if (props.error) {
        buttonContainerClass += ` ${bc}--error`
    } else {
        buttonContainerClass += ` ${bc}--normal`
    }

    let datePickerButton = props.buttonComponent ||
        <div className={buttonContainerClass}>
            <div>
                <Typography text={props.selectedDate ? props.selectedDate.formatDate(props.dateFormat || 'dd/mm/yyyy') : ""} fontWeight='bold' type='paragraph-small' />
                <Typography type='caption-large' text={(props.showSelectedWeek && props.selectedDate) ? `Week ${props.selectedDate.getWeek().weekNumber}` : ""} />
            </div>
            {
                (props.onClear && props.selectedDate) 
                    ? <IconButton 
                        icon={<CloseIcon />}
                        size='extra-small'
                        color='error'
                        onClick={() => {
                            props.onClear!()
                        }}
                    />
                    : <CalendarIcon />
            }
        </div>


    const calendarStatefulCompoment = <CalendarStateful
        showSearchInput={openedByKeyboard}
        onKeyboardExit={() => setOpen(false)}
        title={(Device.isTouchOnlyDevice && props.title) ? props.title : undefined}
        onDateSelect={s => {
            props.onDateSelect(s);
            setOpen(false);
            setOpenedByKeyboard(false);
        }}
        onWeekSelect={s => {
            if (props.onWeekSelect) {
                props.onWeekSelect(s);
                setOpen(false);
                setOpenedByKeyboard(false);
            }

        }}
        includeWeek={props.includeWeek}
        selectedDate={props.selectedDate ? [props.selectedDate.formatDate("yyyy-mm-dd")] : undefined}
        selectedWeek={props.selectedWeek}
        startDate={getStartDate()}
        ariaLabel={`${props.ariaLabel || props.title || "date picker"}`}
        dateCellAriaLabelSuffix={`${props.ariaLabel || props.title || "date picker"} date cell`}
    />

    return <div className={`vieolo-date-picker ${props.disabled ? 'disabled' : ''}`} ref={container}>
        {
            props.title &&
            <div className="label-container">
                <label>
                    {props.title}
                </label>
            </div>
        }
        <div
            className='vieolo-date-picker__button-container'
            onClick={() => setOpen(!open)}
            tabIndex={0}
            role="button"
            aria-label={`${props.ariaLabel || props.title || "date picker"} button`}
            onKeyDown={e => {
                if (props.disabled) return;
                handleOnKeyDown(e, {
                    onEnter: () => {
                        e.stopPropagation();
                        e.preventDefault();
                        setOpen(!open)
                        setOpenedByKeyboard(!open);
                    },
                    onEscape: () => {
                        if (open) {
                            setOpen(false);
                            setOpenedByKeyboard(false);
                        }
                    },
                    onTab: () => {
                        if (open) {
                            setOpen(false);
                            setOpenedByKeyboard(false);
                        }
                    }
                })
            }}
        >
            {datePickerButton}

        </div>
        {
            open && (Device.isTouchOnlyDevice ?
                <Modal onClose={() => setOpen(false)}>
                    {calendarStatefulCompoment}
                </Modal>
                : calendarStatefulCompoment
            )
        }
    </div>

}
