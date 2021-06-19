// React
import React, { useState } from 'react';


// Components
import ItemRow from '../../lib/list/item_row';


// Main Creators
import { SelectCreator, selectOptions } from '../form/select';
import { InputSetCreator, inputSetOptions } from '../form/input_set';


export default function MainPage(props: {}): JSX.Element {
    
    let [selectedTitle, setSelectedTitle] = useState<string>("");
    let [selectedDataOptions, setSelectedDataOptions] = useState<any>(null as any);
    let [selectedState, setSelectedState] = useState<string>("");
    let [selectedData, setSelectedData] = useState<any>(null);

    let items: {[key: string]: { title: string, data: any, creator: any }} = {
        "Input Set": { title: "Input Set", data: inputSetOptions(), creator: InputSetCreator },
        "Select": { title: "Select", data: selectOptions(), creator: SelectCreator }
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

