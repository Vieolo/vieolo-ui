// React
import React, { useState } from 'react';

// Components
import ItemRow from '../../lib/list/item_row';

// Main Creators
import { SelectCreator, selectOptions } from '../form/select';
import { PeriodSelectorCreator, periodSelectorOptions } from '../date_time/period_selector';
import { IconButtonCreator, iconButtonOptions } from '../button/icon_button';
import { ButtonCreator, buttonOptions } from '../button/button';
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
import Select from '../../lib/form/select';
import SwitchSet from '../../lib/form/switch_set';

// Charts
import { barChartOptions, BarChartCreator } from '../charts/bar_chart';


type ViewDataVariable = 'colors' | 'boolean' | {
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


export default function MainPage(props: {}): JSX.Element {

    let [selectedTitle, setSelectedTitle] = useState<string>("");
    let [selectedDataOptions, setSelectedDataOptions] = useState<ViewData>(null as ViewData);
    let [finalState, setFinalState] = useState<{ [key: string]: any }>(null);

    let items: { [key: string]: { title: string, data: ViewData, creator: any } } = {
        "Button": { title: "Button", data: buttonOptions(), creator: ButtonCreator },
        "Checkbox": { title: "Checkbox", data: checkboxOptions(), creator: CheckboxCreator },
        "Date Picker": { title: "Date Picker", data: datePickerOptions(), creator: DatePickerCreator },
        "Drop Down Menu": { title: "Drop Down Menu", data: dropDownMenuOptions(), creator: DropDownMenuCreator },
        "Gantt Chart": { title: "Gantt Chart", data: ganttChartOptions(), creator: GanttChartCreator },
        "Icon Button": { title: "Icon Button", data: iconButtonOptions(), creator: IconButtonCreator },
        "Input Set": { title: "Input Set", data: inputSetOptions(), creator: InputSetCreator },
        "PDF Viewer Embedded": { title: "PDF Viewer Embedded", data: pdfViewerEmbeddedOptions(), creator: PDFViewerEmbeddedCreator },
        "PDF Viewer Fullscreen": { title: "PDF Viewer Fullscreen", data: pdfViewerFullScreenOptions(), creator: PDFViewerFullScreenCreator },
        "Select": { title: "Select", data: selectOptions(), creator: SelectCreator },
        "Period Selector": { title: "Period Selector", data: periodSelectorOptions(), creator: PeriodSelectorCreator },
        "Switch Set": { title: "Switch Set", data: switchSetOptions(), creator: SwitchSetCreator },
        "List": { title: "List", data: listOptions(), creator: ListCreator },
        "Form Dialog": { title: "Form Dialog", data: formDialogOptions(), creator: FormDialogCreator },
        "Confirmation Dialog": { title: "Confirmation Dialog", data: confirmationDialogOptions(), creator: ConfirmationDialogCreator },
        "Table": { title: "Table", data: tableOptions(), creator: TableCreator },
        "Radio Group": { title: "Radio Group", data: radioGroupOptions(), creator: RadioGroupCreator },
        "Tab Switch": { title: "Tab Switch", data: tabSwitchOptions(), creator: TabSwitchCreator },
        "Bar Chart": { title: "Bar Chart", data: barChartOptions(), creator: BarChartCreator },
    }

    let content: React.ReactNode = null;

    if (selectedTitle && selectedDataOptions && finalState) {
        let C = items[selectedTitle].creator;
        content = <C p={finalState} />
    }

    return <main className="main-page">

        <div className="component-list">
            {
                Object.values(items).map(i => {
                    return <ItemRow
                        key={i.title}
                        title={i.title}
                        selected={selectedTitle === i.title}
                        cardStyle="card-no-shadow"
                        onClick={() => {
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
                                } else if (variable === 'colors') {
                                    finalVariable = {
                                        options: ['accessory-blue', 'accessory-green', 'accessory-orange', 'alert', 'error', 'primary', 'secondary', 'success', 'tertiary'],
                                        default: 'primary'
                                    }
                                } else {
                                    finalVariable = variable;
                                }
                                finalState[key] = finalVariable.default;
                            }
                            setFinalState(finalState);
                        }}
                    />
                })
            }
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
                    } else if (tempVariable === 'colors') {
                        variable = {
                            options: ['primary', 'secondary', 'tertiary', 'success', 'alert', 'error', 'accessory-blue', 'accessory-green', 'accessory-orange'],
                            default: 'primary'
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

        <div className="component-state-display">
            {
                (finalState !== null && content !== null) &&

                <div>{content}</div>

            }
        </div>

    </main>

}


function camelCaseToWords(org: string): string {
    let replaced = org.replace(/([A-Z])/g, " $1");
    return (replaced.charAt(0).toUpperCase() + replaced.slice(1)).trim();
}
