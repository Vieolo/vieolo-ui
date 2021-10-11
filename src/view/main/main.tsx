// React
import React, { useState } from 'react';


// Components
import ItemRow from '../../lib/list/item_row';


// Main Creators
import { SelectCreator, selectOptions } from '../form/select';
import { PeriodSelectorCreator, periodSelectorOptions } from '../date_time/period_selector';
import { IconButtonCreator, iconButtonOptions } from '../button/icon_button';
import { InputSetCreator, inputSetOptions } from '../form/input_set';
import { ListCreator, listOptions } from '../list/list';
import { SwitchSetCreator, switchSetOptions } from '../form/switch_set';
import { DropDownMenuCreator, dropDownMenuOptions } from '../menu/dropdown_menu';
import { PDFViewerEmbeddedCreator, pdfViewerEmbeddedOptions } from '../pdf_viewer/pdf_viewer_embedded';
import { PDFViewerFullScreenCreator, pdfViewerFullScreenOptions } from '../pdf_viewer/pdf_viewer_full_screen';
import { FormDialogCreator, formDialogOptions } from '../dialog/form_dialog';
import { TableCreator, tableOptions } from '../table/table';
import { RadioGroupCreator, radioGroupOptions } from '../form/radio_group';


export default function MainPage(props: {}): JSX.Element {
    
    let [selectedTitle, setSelectedTitle] = useState<string>("");
    let [selectedDataOptions, setSelectedDataOptions] = useState<any>(null as any);
    let [selectedState, setSelectedState] = useState<string>("");
    let [selectedData, setSelectedData] = useState<any>(null);

    let items: {[key: string]: { title: string, data: any, creator: any }} = {
        "Drop Down Menu": { title: "Drop Down Menu", data: dropDownMenuOptions(), creator: DropDownMenuCreator },
        "Icon Button": { title: "Icon Button", data: iconButtonOptions(), creator: IconButtonCreator },
        "Input Set": { title: "Input Set", data: inputSetOptions(), creator: InputSetCreator },
        "PDF Viewer Embedded": { title: "PDF Viewer Embedded", data: pdfViewerEmbeddedOptions(), creator: PDFViewerEmbeddedCreator },
        "PDF Viewer Fullscreen": { title: "PDF Viewer Fullscreen", data: pdfViewerFullScreenOptions(), creator: PDFViewerFullScreenCreator },
        "Select": { title: "Select", data: selectOptions(), creator: SelectCreator },
        "Period Selector": { title: "Period Selector", data: periodSelectorOptions(), creator: PeriodSelectorCreator },
        "Switch Set": { title: "Switch Set", data: switchSetOptions(), creator: SwitchSetCreator },
        "List": { title: "List", data: listOptions(), creator: ListCreator },
        "Form Dialog": { title: "Form Dialog", data: formDialogOptions(), creator: FormDialogCreator },
        "Table": { title: "Table", data: tableOptions(), creator: TableCreator },
        "Radio Group": { title: "Radio Group", data: radioGroupOptions(), creator: RadioGroupCreator },
    }

    let content: React.ReactNode = null;

    if (selectedTitle && selectedData) {
        let C = items[selectedTitle].creator;
        content = <C p={selectedData}/>
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
                            setSelectedData(null);
                            setSelectedTitle(i.title);
                            setSelectedDataOptions(i.data);
                        }}
                    />
                })
            }
        </div>

        <div className="state-list">
            {
                selectedDataOptions != null &&
                Object.keys(selectedDataOptions).map(k => {
                    return <ItemRow
                        key={selectedTitle + k}
                        title={k}
                        selected={selectedData && k === selectedState}
                        cardStyle="card-no-shadow"
                        onClick={() => {
                            setSelectedState(k);
                            setSelectedData(selectedDataOptions[k]);
                        }}
                    />
                })
            }
        </div>        

        <div className="component-state-display">
            {
                (selectedData != null && content != null) &&
                
                <div>{content}</div>

            }
        </div>

    </main>

}

