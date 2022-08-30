// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Installed Packages
import Device, { DeviceSizeCategory } from '@vieolo/device-js';

// Icons
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowLeft from '@mui/icons-material/ArrowLeft';

// Main Creators
import { spinnerOptions, SpinnerCreator } from '../auxiliary/spinner.view';
import { SelectCreator, selectOptions } from '../form/select.view';
import { PeriodSelectorCreator, periodSelectorOptions } from '../date_time/period_selector.view';
import { IconButtonCreator, iconButtonOptions } from '../button/icon_button.view';
import { ButtonCreator, buttonOptions } from '../button/button.view';
import { ChipCreator, chipOptions } from '../button/chip.view';
import { InputSetCreator, inputSetOptions } from '../form/input_set.view';
import { ListCreator, listOptions } from '../list/list.view';
import { SwitchSetCreator, switchSetOptions } from '../form/switch_set.view';
import { DropDownMenuCreator, dropDownMenuOptions } from '../menu/dropdown_menu.view';
import { PDFViewerEmbeddedCreator, pdfViewerEmbeddedOptions } from '../pdf_viewer/pdf_viewer_embedded.view';
import { PDFViewerFullScreenCreator, pdfViewerFullScreenOptions } from '../pdf_viewer/pdf_viewer_full_screen.view';
import { FormDialogCreator, formDialogOptions } from '../dialog/form_dialog.view';
import { ConfirmationDialogCreator, confirmationDialogOptions } from '../dialog/confirmation_dialog.view';
import { TableCreator, tableOptions } from '../table/table.view';
import { RadioGroupCreator, radioGroupOptions } from '../form/radio_group.view';
import { RadioGroupSetCreator, radioGroupSetOptions } from '../form/radio_group_set.view';
import { SelectSetCreator, selectSetOptions } from '../form/select_set.view';
import { FormSectionCreator, formSectionOptions } from '../form/form_section.view';
import { TabSwitchCreator, tabSwitchOptions } from '../layout/tab_switch.view';
import { DatePickerCreator, datePickerOptions } from '../date_time/date_picker.view';
import { ganttChartOptions, GanttChartCreator } from '../charts/gantt_chart.view';
import { checkboxOptions, CheckboxCreator } from '../form/checkbox.view';
import { fileInputOptions, FileInputCreator } from '../form/file_input.view';
import { timeInputOptions, TimeInputCreator } from '../date_time/time_input.view';
import { dateTimePickerOptions, DateTimePickerCreator } from '../date_time/date_time_picker.view';
import { dateInputOptions, DateInputCreator } from '../date_time/date_input.view';
import { cardOptions, CardCreator } from '../card/card.view';
import { expandableCardOptions, ExpandableCardCreator } from '../card/expandable_card.view';
import { titlePeriodCardOptions, TitlePeriodCardCreator } from '../card/title_period_card.view';
import { typographyOptions, TypographyCreator } from '../typography/typography.view';
import { gridOptions, GridCreator } from '../layout/grid/grid.view';
import { gridTwoOptions, GridTwoCreator } from '../layout/grid/grid_two.view';
import { gridThreeOptions, GridThreeCreator } from '../layout/grid/grid_three.view';
import { spacerOptions, SpacerCreator } from '../layout/auxiliary/spacer.view';
import { dividerOptions, DividerCreator } from '../layout/auxiliary/divider.view';
import { TableInteractiveCreator, tableInteractiveOptions } from '../table/table_interactive.view';
import { ClickableCardCreator, clickableCardOptions } from '../card/clickable_card.view';
import { ModalCreator, modalOptions } from '../dialog/modal.view';
import { DonutChartCreator, donutChartOptions } from '../charts/donut_chart.view';
import { SubNavbarRowCreator, subNavbarRowOptions } from '../layout/page/sub_navbar_row.view';
import { SubDashboardCreator, subDashboardOptions } from '../layout/page/sub_dashboard.view';
import { ActionCardCreator, actionCardOptions } from '../card/action_card.view';
import { DoubleToggleListCreator, doubleToggleOptions } from '../list/double_toggle_list.view';
import Select from '../../Select';
import SwitchSet from '../../SwitchSet';
import PageFrame from '../../PageFrame';

// Charts
import { barChartOptions, BarChartCreator } from '../charts/bar_chart.view';
import List from '../../List';
import Typography from '../../Typography';
import Spacer from '../../Spacer';


type ViewDataVariable = 'colors' | 'colorsOptional' | 'boolean' | "booleanTrueDefault" | "borderRadius" | 'fontWeightOptional' | 'emphasis' | 'typographyOptions' | {
    options: any[],
    default: any,
    type?: 'number' | "string" | "boolean"
}

export type ViewData = {
    constants: { [key: string]: any },
    variables: {
        [key: string]: ViewDataVariable
    }
};

type ViewItemData = {
    title: string,
    data: ViewData,
    creator: any,
    group: string
}


export default function MainPage(props: {}): JSX.Element {

    let [selectedTitle, setSelectedTitle] = useState<string>("");
    let [selectedDataOptions, setSelectedDataOptions] = useState<ViewData | undefined>(undefined);
    let [showComponent, setShowComponent] = useState<boolean>(false);
    let [finalState, setFinalState] = useState<{ [key: string]: any } | undefined>(undefined);
    let history = useHistory();

    let items: { [key: string]: ViewItemData } = {
        "Spinner": { title: "Spinner", data: spinnerOptions(), creator: SpinnerCreator, group: "Auxiliary" },

        "Button": { title: "Button", data: buttonOptions(), creator: ButtonCreator, group: "Buttons" },
        "Chip": { title: "Chip", data: chipOptions(), creator: ChipCreator, group: "Buttons" },
        "Icon Button": { title: "Icon Button", data: iconButtonOptions(), creator: IconButtonCreator, group: "Buttons" },

        "Card": { title: "Card", data: cardOptions(), creator: CardCreator, group: "Cards" },
        "Action Card": { title: "Action Card", data: actionCardOptions(), creator: ActionCardCreator, group: "Cards" },
        "Clickable Card": { title: "Clickable Card", data: clickableCardOptions(), creator: ClickableCardCreator, group: "Cards" },
        "Title Period Card": { title: "Title Period Card", data: titlePeriodCardOptions(), creator: TitlePeriodCardCreator, group: "Cards" },
        "Expandable Card": { title: "Expandable Card", data: expandableCardOptions(), creator: ExpandableCardCreator, group: "Cards" },

        "Bar Chart": { title: "Bar Chart", data: barChartOptions(), creator: BarChartCreator, group: "Charts" },
        "Gantt Chart": { title: "Gantt Chart", data: ganttChartOptions(), creator: GanttChartCreator, group: "Charts" },
        "Donut Chart": { title: "Donut Chart", data: donutChartOptions(), creator: DonutChartCreator, group: "Charts" },
        "Date Input": { title: "Date Input", data: dateInputOptions(), creator: DateInputCreator, group: "Date and Time" },
        "Date Picker": { title: "Date Picker", data: datePickerOptions(), creator: DatePickerCreator, group: "Date and Time" },
        "Date Time Picker": { title: "Date Time Picker", data: dateTimePickerOptions(), creator: DateTimePickerCreator, group: "Date and Time" },
        "Period Selector": { title: "Period Selector", data: periodSelectorOptions(), creator: PeriodSelectorCreator, group: "Date and Time" },
        "Time Input": { title: "Time Input", data: timeInputOptions(), creator: TimeInputCreator, group: "Date and Time" },

        "Confirmation Dialog": { title: "Confirmation Dialog", data: confirmationDialogOptions(), creator: ConfirmationDialogCreator, group: "Dialogs" },
        "Form Dialog": { title: "Form Dialog", data: formDialogOptions(), creator: FormDialogCreator, group: "Dialogs" },
        "Modal": { title: "Modal", data: modalOptions(), creator: ModalCreator, group: "Dialogs" },

        "Checkbox": { title: "Checkbox", data: checkboxOptions(), creator: CheckboxCreator, group: "Form" },
        "File Input": { title: "File Input", data: fileInputOptions(), creator: FileInputCreator, group: "Form" },
        "Input Set": { title: "Input Set", data: inputSetOptions(), creator: InputSetCreator, group: "Form" },
        "Radio Group": { title: "Radio Group", data: radioGroupOptions(), creator: RadioGroupCreator, group: "Form" },
        "Select": { title: "Select", data: selectOptions(), creator: SelectCreator, group: "Form" },
        "Select Set": { title: "Select Set", data: selectSetOptions(), creator: SelectSetCreator, group: "Form" },
        "Switch Set": { title: "Switch Set", data: switchSetOptions(), creator: SwitchSetCreator, group: "Form" },
        "Radio Group Set": { title: "Radio Group Set", data: radioGroupSetOptions(), creator: RadioGroupSetCreator, group: "Form" },
        "Drop Down Menu": { title: "Drop Down Menu", data: dropDownMenuOptions(), creator: DropDownMenuCreator, group: "Menu" },
        "Form Section": { title: "Form Section", data: formSectionOptions(), creator: FormSectionCreator, group: "Form" },
        "Tab Switch": { title: "Tab Switch", data: tabSwitchOptions(), creator: TabSwitchCreator, group: "Layout" },

        "Divider": { title: "Divider", data: dividerOptions(), creator: DividerCreator, group: "Layout/Auxiliary" },
        "Spacer": { title: "Spacer", data: spacerOptions(), creator: SpacerCreator, group: "Layout/Auxiliary" },

        "Grid": { title: "Grid", data: gridOptions(), creator: GridCreator, group: "Layout/Grid" },
        "Grid Two": { title: "Grid Two", data: gridTwoOptions(), creator: GridTwoCreator, group: "Layout/Grid" },
        "Grid Three": { title: "Grid Three", data: gridThreeOptions(), creator: GridThreeCreator, group: "Layout/Grid" },
        
        "SubNavbar Row": { title: "SubNavbar Row", data: subNavbarRowOptions(), creator: SubNavbarRowCreator, group: "Layout/Page" },
        "Sub Dashboard": { title: "Sub Dashboard", data: subDashboardOptions(), creator: SubDashboardCreator, group: "Layout/Page" },

        "List": { title: "List", data: listOptions(), creator: ListCreator, group: "List" },
        "Double Toggle List": { title: "Double Toggle List", data: doubleToggleOptions(), creator: DoubleToggleListCreator, group: "List" },

        "PDF Viewer Embedded": { title: "PDF Viewer Embedded", data: pdfViewerEmbeddedOptions(), creator: PDFViewerEmbeddedCreator, group: "PDF" },
        "PDF Viewer Fullscreen": { title: "PDF Viewer Fullscreen", data: pdfViewerFullScreenOptions(), creator: PDFViewerFullScreenCreator, group: "PDF" },

        "Table": { title: "Table", data: tableOptions(), creator: TableCreator, group: "Table" },
        "Table Interactive": { title: "Table Interactive", data: tableInteractiveOptions(), creator: TableInteractiveCreator, group: "Table" },

        "Typography": { title: "Typography", data: typographyOptions(), creator: TypographyCreator, group: "Typography" },
    }

    useEffect(() => {
        if (window.location.search.includes("tab")) {
            handleSelectComponent(
                Object.values(items).filter(i => i.title === window.location.search.split("tab=")[1].split("&")[0].replace(/__/g, " "))[0]
            );
        }

        // eslint-disable-next-line
    }, [])

    let content: React.ReactNode = null;

    if (selectedTitle && selectedDataOptions && finalState && showComponent) {
        let C = items[selectedTitle].creator;
        content = <C p={finalState} />
    }


    function handleSelectComponent(i: ViewItemData) {
        setSelectedTitle(i.title);
        setSelectedDataOptions(i.data);
        if (Device.sizeCategory() !== DeviceSizeCategory.mobile) {
            setShowComponent(true);
        }
        let finalState = { ...i.data.constants }

        for (let z = 0; z < Object.keys(i.data.variables).length; z++) {
            const key = Object.keys(i.data.variables)[z];
            const variable = i.data.variables[key];
            let finalVariable: ViewDataVariable;
            if (variable === 'boolean') {
                finalVariable = {
                    options: [false, true],
                    default: false
                }
            } else if (variable === 'booleanTrueDefault') {
                finalVariable = {
                    options: [false, true],
                    default: true
                }
            } else if (variable === "borderRadius") {
                finalVariable = {
                    options: ['default', 'full', 'normal', 'half', 'none'],
                    default: 'default'
                }
            } else if (variable === "typographyOptions") {
                finalVariable = {
                    options: ['title-large', 'title-medium', 'title-small', 'paragraph-large', 'paragraph-medium', 'paragraph-small', 'caption-large', 'caption-medium', 'caption-small'],
                    default: 'paragraph-medium'
                }
            } else if (variable === 'colors') {
                finalVariable = {
                    options: ['accessory-blue', 'accessory-green', 'accessory-orange', 'alert', 'error', 'primary', 'secondary', 'success', 'tertiary'],
                    default: 'primary'
                }
            } else if (variable === 'colorsOptional') {
                finalVariable = {
                    options: ['accessory-blue', 'accessory-green', 'accessory-orange', 'alert', 'error', 'primary', 'secondary', 'success', 'tertiary'],
                    default: ''
                }
            } else if (variable === 'fontWeightOptional') {
                finalVariable = {
                    options: ['light', 'normal', 'bold', 'extra-bold'],
                    default: ''
                }
            } else if (variable === 'emphasis') {
                finalVariable = {
                    options: ['high', 'medium', 'low', "low-normal", 'none', "none-normal"],
                    default: 'none'
                }
            } else {
                finalVariable = variable;
            }
            finalState[key] = finalVariable.default;
        }
        setFinalState(finalState);
    }

    return <PageFrame
        navbar={{
            title: 'Vieolo UI',
            logo: <img src='https://vieolo.com/static/logo-nav.svg' height={30} width={30} alt={"logo"} />
        }}
        drawer={{
            topContent: <div className='padding--one'>
                <Typography text='Vieolo UI' type='title-large' textAlign='center' />
                <Spacer height='one' />
                <Typography text='This is a reusable component package for React applications' />
            </div>,
            mainItems: [
                { title: "Item One", icon: "+", href: "/" },
                { title: "Item Two", icon: "X" },
                { title: "Item Three" },
                { title: "Item Four", icon: "€", selected: true },
            ],
            bottomItems: [
                { title: "Bottom 1" },
                { title: "Bottom 2" },
            ]
        }}
    >
        <div className={`main-page ${showComponent ? "main-page--content" : "main-page--no-content"}`}>
            <div className="component-list">

                <List
                    height={Device.isTouchOnlyDevice ? '80vh' : 'calc(100vh - 70px)'}
                    itemStyle={{
                        height: 'medium',
                        emphasis: 'low-normal'
                    }}
                    collapsedGroupStyle={{
                        height: 'medium',
                        emphasis: 'low',
                        color: 'primary',
                        borderRadius: 'full'
                    }}
                    expandedGroupStyle={{
                        height: 'small',
                        emphasis: 'low-normal',
                        color: 'primary',
                        borderRadius: 'full'
                    }}
                    controlItemBorderRadius
                    rowGap='none'
                    items={Object.values(items).map((i, index) => {
                        return {
                            id: index.toString(),
                            title: i.title,
                            selected: selectedTitle === i.title,
                            group: i.group,
                            onClick: () => {
                                handleSelectComponent(i);
                                history.replace({ pathname: window.location.pathname, search: `tab=${i.title.replace(/ /g, "__")}` });
                            },
                        }
                    })}
                />
            </div>

            <div className="state-list">
                {
                    selectedDataOptions !== undefined && selectedDataOptions.variables &&
                    Object.keys(selectedDataOptions.variables).map(k => {

                        let tempVariable = selectedDataOptions!.variables[k];
                        let variable: ViewDataVariable;

                        if (tempVariable === 'boolean') {
                            variable = {
                                options: [false, true],
                                default: false
                            }
                        } else if (tempVariable === "booleanTrueDefault") {
                            variable = {
                                options: [false, true],
                                default: true
                            }
                        } else if (tempVariable === "borderRadius") {
                            variable = {
                                options: ['default', 'full', 'normal', 'half', 'none'],
                                default: 'default'
                            }
                        } else if (tempVariable === "typographyOptions") {
                            variable = {
                                options: ['title-large', 'title-medium', 'title-small', 'paragraph-large', 'paragraph-medium', 'paragraph-small', 'caption-large', 'caption-medium', 'caption-small'],
                                default: 'paragraph-medium'
                            }
                        } else if (tempVariable === 'colors') {
                            variable = {
                                options: ['primary', 'secondary', 'tertiary', 'success', 'alert', 'error', 'accessory-blue', 'accessory-green', 'accessory-orange'],
                                default: 'primary'
                            }
                        } else if (tempVariable === 'colorsOptional') {
                            variable = {
                                options: ['primary', 'secondary', 'tertiary', 'success', 'alert', 'error', 'accessory-blue', 'accessory-green', 'accessory-orange'],
                                default: ''
                            }
                        } else if (tempVariable === 'fontWeightOptional') {
                            variable = {
                                options: ['light', 'normal', 'bold', 'extra-bold'],
                                default: ''
                            }
                        } else if (tempVariable === 'emphasis') {
                            variable = {
                                options: ['high', 'medium', 'low', 'low-normal', 'none', 'none-normal'],
                                default: 'none'
                            }
                        } else {
                            variable = tempVariable;
                        }

                        if (typeof variable.options[0] === 'string') {
                            return <div key={k} className="margin-bottom--one">
                                <Select
                                    error={false}
                                    items={variable.options.map(o => {
                                        return {
                                            title: o,
                                            value: o
                                        }
                                    })}
                                    onSelect={v => {
                                        let temp = { ...finalState }
                                        if (typeof variable !== 'string') {
                                            temp[k] = variable.type && variable.type === 'number' ? +v[0] : v[0];
                                        }
                                        setFinalState(temp);
                                    }}
                                    selectedItems={[finalState![k].toString()]}
                                    title={camelCaseToWords(k)}
                                />
                            </div>
                        } else {
                            return <div key={k} className="margin-bottom--one">
                                <SwitchSet
                                    on={finalState![k]}
                                    onChange={v => {
                                        let temp = { ...finalState }
                                        temp[k] = v;
                                        setFinalState(temp);
                                    }}
                                    switchID={`${k}_switch`}
                                    title={camelCaseToWords(k)}
                                />
                            </div>
                        }
                    })
                }
            </div>

            <main className="component-state-display">
                {
                    (finalState !== null && content !== null) &&

                    <div>{content}</div>

                }
            </main>

            {
                selectedDataOptions &&
                <div className="floating-action-button" onClick={() => {
                    if (showComponent) {
                        setShowComponent(false);
                    } else {
                        setShowComponent(true);
                    }
                }}>
                    {
                        showComponent
                            ? <ArrowLeft />
                            : <ArrowRight />
                    }
                </div>
            }
        </div>
    </PageFrame>



}


function camelCaseToWords(org: string): string {
    let replaced = org.replace(/([A-Z])/g, " $1");
    return (replaced.charAt(0).toUpperCase() + replaced.slice(1)).trim();
}
