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
import { TableCreator, tableOptions } from '../table/table';
import { RadioGroupCreator, radioGroupOptions } from '../form/radio_group';
import { TabSwitchCreator, tabSwitchOptions } from '../layout/tab_switch';
import Select from '../../lib/form/select';
import SwitchSet from '../../lib/form/switch_set';


export type ViewData = {
    constants: { [key: string]: any },
    variables: {
        [key: string]: {
            options: any[],
            default: any
        }
    }
};


export default function MainPage(props: {}): JSX.Element {

    let [selectedTitle, setSelectedTitle] = useState<string>("");
    let [selectedDataOptions, setSelectedDataOptions] = useState<ViewData>(null as ViewData);
    let [finalState, setFinalState] = useState<{ [key: string]: any }>(null);

    let items: { [key: string]: { title: string, data: ViewData, creator: any } } = {
        "Button": { title: "Button", data: buttonOptions(), creator: ButtonCreator },
        "Drop Down Menu": { title: "Drop Down Menu", data: dropDownMenuOptions(), creator: DropDownMenuCreator },
        "Icon Button": { title: "Icon Button", data: iconButtonOptions(), creator: IconButtonCreator },
        "Input Set": { title: "Input Set", data: inputSetOptions(), creator: InputSetCreator },
        "PDF Viewer Embedded": { title: "PDF Viewer Embedded", data: pdfViewerEmbeddedOptions(), creator: PDFViewerEmbeddedCreator },
        "PDF Viewer Fullscreen": { title: "PDF Viewer Fullscreen", data: pdfViewerFullScreenOptions(), creator: PDFViewerFullScreenCreator },
        "Select": { title: "Select", data: selectOptions(), creator: SelectCreator },
        "Period Selector": { title: "Period Selector", data: periodSelectorOptions(), creator: PeriodSelectorCreator },
        "Switch Set": { title: "Switch Set", data: switchSetOptions(), creator: SwitchSetCreator },
        "List": { title: "List", data: listOptions(), creator: ListCreator },
        // "Form Dialog": { title: "Form Dialog", data: formDialogOptions(), creator: FormDialogCreator },
        // "Table": { title: "Table", data: tableOptions(), creator: TableCreator },
        // "Radio Group": { title: "Radio Group", data: radioGroupOptions(), creator: RadioGroupCreator },
        // "Tab Switch": { title: "Tab Switch", data: tabSwitchOptions(), creator: TabSwitchCreator },
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
                                const variable = Object.keys(i.data.variables)[z];
                                finalState[variable] = i.data.variables[variable].default;
                            }
                            setFinalState(finalState);
                        }}
                    />
                })
            }
        </div>

        <div className="state-list">
            {
                selectedDataOptions != null &&
                Object.keys(selectedDataOptions.variables).map(k => {

                    let variable = selectedDataOptions.variables[k];

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
                                    temp[k] = v[0];
                                    setFinalState(temp);
                                }}
                                selectedItems={[finalState[k]]}
                                title={k}
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
                                title={k}
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

