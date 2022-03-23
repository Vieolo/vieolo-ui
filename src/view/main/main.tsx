// React
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Main Creators
import { SelectCreator, selectOptions } from '../form/select';
import { PeriodSelectorCreator, periodSelectorOptions } from '../date_time/period_selector';
import { IconButtonCreator, iconButtonOptions } from '../button/icon_button';
import { ButtonCreator, buttonOptions } from '../button/button';
import { ChipCreator, chipOptions } from '../button/chip';
import { InputSetCreator, inputSetOptions } from '../form/input_set';
import { ListCreator, listOptions } from '../list/list';
import { SwitchSetCreator, switchSetOptions } from '../form/switch_set';
import { DropDownMenuCreator, dropDownMenuOptions } from '../menu/dropdown_menu';
import { PDFViewerEmbeddedCreator, pdfViewerEmbeddedOptions } from '../pdf_viewer/pdf_viewer_embedded';
import { PDFViewerFullScreenCreator, pdfViewerFullScreenOptions } from '../pdf_viewer/pdf_viewer_full_screen';
import { FormDialogCreator, formDialogOptions } from '../dialog/form_dialog';
import { ConfirmationDialogCreator, confirmationDialogOptions } from '../dialog/confirmation_dialog';
import { TableCreator, tableOptions } from '../table/table';
import { RadioGroupCreator, radioGroupOptions } from '../form/radio_group';
import { TabSwitchCreator, tabSwitchOptions } from '../layout/tab_switch';
import { DatePickerCreator, datePickerOptions } from '../date_time/date_picker';
import { ganttChartOptions, GanttChartCreator } from '../charts/gantt_chart';
import { checkboxOptions, CheckboxCreator } from '../form/checkbox';
import { fileInputOptions, FileInputCreator } from '../form/file_input';
import { timeInputOptions, TimeInputCreator } from '../date_time/time_input';
import { dateTimePickerOptions, DateTimePickerCreator } from '../date_time/date_time_picker';
import { dateInputOptions, DateInputCreator } from '../date_time/date_input';
import { cardOptions, CardCreator } from '../card/card';
import { typographyOptions, TypographyCreator } from '../typography/typography';
import { gridOptions, GridCreator } from '../layout/grid/grid';
import { gridTwoOptions, GridTwoCreator } from '../layout/grid/grid_two';
import { gridThreeOptions, GridThreeCreator } from '../layout/grid/grid_three';
import { spacerOptions, SpacerCreator } from '../layout/auxiliary/spacer';
import { dividerOptions, DividerCreator } from '../layout/auxiliary/divider';
import Select from '../../lib/form/select';
import SwitchSet from '../../lib/form/switch_set';

// Charts
import { barChartOptions, BarChartCreator } from '../charts/bar_chart';
import List from '../../lib/list/list';


type ViewDataVariable = 'colors' | 'colorsOptional' | 'boolean' | "booleanTrueDefault" | "borderRadius" | 'fontWeightOptional' | 'emphasis' | {
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
    let [selectedDataOptions, setSelectedDataOptions] = useState<ViewData>(null as ViewData);
    let [finalState, setFinalState] = useState<{ [key: string]: any }>(null);
    let history = useHistory();    

    let items: { [key: string]: ViewItemData } = {
        "Button": { title: "Button", data: buttonOptions(), creator: ButtonCreator, group: "Buttons" },
        "Chip": { title: "Chip", data: chipOptions(), creator: ChipCreator, group: "Buttons" },
        "Icon Button": { title: "Icon Button", data: iconButtonOptions(), creator: IconButtonCreator, group: "Buttons" },
        
        "Card": { title: "Card", data: cardOptions(), creator: CardCreator, group: "Cards" },
        
        "Bar Chart": { title: "Bar Chart", data: barChartOptions(), creator: BarChartCreator, group: "Charts"},
        "Gantt Chart": { title: "Gantt Chart", data: ganttChartOptions(), creator: GanttChartCreator, group: "Charts" },
        
        "Date Input": { title: "Date Input", data: dateInputOptions(), creator: DateInputCreator, group: "Date and Time" },
        "Date Picker": { title: "Date Picker", data: datePickerOptions(), creator: DatePickerCreator, group: "Date and Time" },
        "Date Time Picker": { title: "Date Time Picker", data: dateTimePickerOptions(), creator: DateTimePickerCreator, group: "Date and Time" },
        "Period Selector": { title: "Period Selector", data: periodSelectorOptions(), creator: PeriodSelectorCreator, group: "Date and Time" },
        "Time Input": { title: "Time Input", data: timeInputOptions(), creator: TimeInputCreator, group: "Date and Time" },
        
        "Confirmation Dialog": { title: "Confirmation Dialog", data: confirmationDialogOptions(), creator: ConfirmationDialogCreator, group: "Dialogs" },
        "Form Dialog": { title: "Form Dialog", data: formDialogOptions(), creator: FormDialogCreator, group: "Dialogs" },
        
        "Checkbox": { title: "Checkbox", data: checkboxOptions(), creator: CheckboxCreator, group: "Form" },
        "File Input": { title: "File Input", data: fileInputOptions(), creator: FileInputCreator, group: "Form" },
        "Input Set": { title: "Input Set", data: inputSetOptions(), creator: InputSetCreator, group: "Form" },
        "Radio Group": { title: "Radio Group", data: radioGroupOptions(), creator: RadioGroupCreator, group: "Form" },
        "Select": { title: "Select", data: selectOptions(), creator: SelectCreator, group: "Form" },
        "Switch Set": { title: "Switch Set", data: switchSetOptions(), creator: SwitchSetCreator, group: "Form" },
        
        "Drop Down Menu": { title: "Drop Down Menu", data: dropDownMenuOptions(), creator: DropDownMenuCreator, group: "Menu" },
        
        "Tab Switch": { title: "Tab Switch", data: tabSwitchOptions(), creator: TabSwitchCreator, group: "Layout" },
        
        "Divider": { title: "Divider", data: dividerOptions(), creator: DividerCreator, group: "Layout/Auxiliary" },
        "Spacer": { title: "Spacer", data: spacerOptions(), creator: SpacerCreator, group: "Layout/Auxiliary" },
        
        "Grid": { title: "Grid", data: gridOptions(), creator: GridCreator, group: "Layout/Grid" },
        "Grid Two": { title: "Grid Two", data: gridTwoOptions(), creator: GridTwoCreator, group: "Layout/Grid" },
        "Grid Three": { title: "Grid Three", data: gridThreeOptions(), creator: GridThreeCreator, group: "Layout/Grid" },
        
        "List": { title: "List", data: listOptions(), creator: ListCreator, group: "List" },
        
        "PDF Viewer Embedded": { title: "PDF Viewer Embedded", data: pdfViewerEmbeddedOptions(), creator: PDFViewerEmbeddedCreator, group: "PDF" },
        "PDF Viewer Fullscreen": { title: "PDF Viewer Fullscreen", data: pdfViewerFullScreenOptions(), creator: PDFViewerFullScreenCreator, group: "PDF" },
        
        "Table": { title: "Table", data: tableOptions(), creator: TableCreator, group: "Table" },
        
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

    if (selectedTitle && selectedDataOptions && finalState) {
        let C = items[selectedTitle].creator;
        content = <C p={finalState} />
    }


    function handleSelectComponent(i: ViewItemData) {
        setSelectedTitle(i.title);
        setSelectedDataOptions(i.data);
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
                    options: ['high', 'medium', 'low', 'none'],
                    default: 'none'
                }
            } else {
                finalVariable = variable;
            }
            finalState[key] = finalVariable.default;
        }
        setFinalState(finalState);
    }

    return <div className="main-page">

        <div className="component-list">

            <List 
                height='calc(100vh - 20px)'
                itemStyle={{
                    height: 'medium'
                }}
                collapsedGroupStyle={{
                    height: 'medium',
                    emphasis: 'none',
                    color: 'secondary'
                }}
                expandedGroupStyle={{
                    height: 'small',
                    emphasis: 'low',
                    color: 'primary'
                }}
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
                selectedDataOptions != null && selectedDataOptions.variables &&
                Object.keys(selectedDataOptions.variables).map(k => {

                    let tempVariable = selectedDataOptions.variables[k];
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
                            options: ['high', 'medium', 'low', 'none'],
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
                                selectedItems={[finalState[k].toString()]}
                                title={camelCaseToWords(k)}
                            />
                        </div>
                    } else {
                        return <div key={k} className="margin-bottom--one">
                            <SwitchSet
                                on={finalState[k]}
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

    </div>

}


function camelCaseToWords(org: string): string {
    let replaced = org.replace(/([A-Z])/g, " $1");
    return (replaced.charAt(0).toUpperCase() + replaced.slice(1)).trim();
}
