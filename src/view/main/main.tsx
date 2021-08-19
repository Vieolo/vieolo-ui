// React
import React, { useState } from 'react';


// Components
import ItemRow from '../../lib/list/item_row';


// Main Creators
// Main Creators
import { SelectCreator, selectOptions } from "../form/select";
import { InputSetCreator, inputSetOptions } from "../form/input_set";
import { FileInputCreator, fileInputOptions } from "../form/file_input";
import { InputCreator, inputOptions } from "../form/input";
import { DropDownMenuCreator, dropDownMenuOptions } from "../menu/dropdown_menu";
import { switchSetOptions, SwitchSetCreator } from "../form/switch_set";
import { switchOptions, SwitchCreator } from "../form/switch";
import { textareaOptions, TextareaCreator } from "../form/textarea";
import { textareaSetOptions, TextareaSetCreator } from "../form/textarea_set";
import { ItemRowCreator, itemRowOptions } from "../list/item_row";
import { TimePickerCreator, timePickerOptions } from "../form/time_picker";
import { ButtonCreator, buttonOptions } from "../button/button";
import { IconButtonCreator, iconButtonOptions } from "../button/icon_button";

export default function MainPage(props: {}): JSX.Element {   
    let [selectedTitle, setSelectedTitle] = useState<string>("");
    let [selectedDataOptions, setSelectedDataOptions] = useState<any>(null as any);
    let [selectedState, setSelectedState] = useState<string>("");
    let [selectedData, setSelectedData] = useState<any>(null);

    let items: {[key: string]: { title: string, data: any, creator: any }} = {
        "Input Set": { title: "Input Set", data: inputSetOptions(), creator: InputSetCreator },
        "Select": { title: "Select", data: selectOptions(), creator: SelectCreator },
        "Drop Down Menu": { title: "Drop Down Menu", data: dropDownMenuOptions(), creator: DropDownMenuCreator },
        "File Input": {
            title: "File Input",
            data: fileInputOptions(),
            creator: FileInputCreator,
        },
        Input: {
            title: "Input",
            data: inputOptions(),
            creator: InputCreator,
        },
        "Switch Set": {
            title: "Switch Set",
            data: switchSetOptions(),
            creator: SwitchSetCreator,
        },
        Switch: {
            title: "Switch",
            data: switchOptions(),
            creator: SwitchCreator,
        },
        Textarea: {
            title: "Textarea",
            data: textareaOptions(),
            creator: TextareaCreator,
        },
        "Textarea Set": {
            title: "Textarea Set",
            data: textareaSetOptions(),
            creator: TextareaSetCreator,
        },
        "Item Row": {
            title: "Item Row",
            data: itemRowOptions(),
            creator: ItemRowCreator,
        },
        "Time Picker": {
            title: "Time Picker",
            data: timePickerOptions(),
            creator: TimePickerCreator,
        },
        Button: {
            title: "Button",
            data: buttonOptions(),
            creator: ButtonCreator,
        },
        "Icon Button": {
            title: "Icon Button",
            data: iconButtonOptions(),
            creator: IconButtonCreator
        },
    }

    let content: React.ReactNode = null;

    if (selectedTitle && selectedData) {
        let C = items[selectedTitle].creator;
        content = <C p={selectedData}/>
    }

    return <div className="main-page">

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

    </div>

}

