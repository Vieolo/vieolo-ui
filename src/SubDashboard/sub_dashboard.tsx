// React
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Vieolo UI
import List, { ListItem } from '../List';
import Typography from '../Typography';
import { RowStyleType } from '../types';
import SubNavbarRow from '../SubNavbarRow';


export default function SubDashboard(props: {
    items: ListItem[],
    handleSubPageInURL?: boolean,
    children?: React.ReactNode,
    itemStyle?: RowStyleType,
    subNavbarOptions?: React.ComponentProps<typeof SubNavbarRow>,
    emptyText?: string,
    emptyIcon?: React.ReactNode
}) {

    let history = useHistory();

    useEffect(() => {
        if (props.handleSubPageInURL) {
            let selected = props.items.find(z => z.selected)
            if (selected) {
                history.replace({ pathname: window.location.pathname, search: `${window.location.search ? window.location.search.split("&").filter(z => !z.includes("sub-dash-page=")).join("&") + "&" : ""}sub-dash-page=${selected.id.replace(/ /g, "__")}` });
            } if (!selected && window.location.search.includes("sub-dash-page")) {
                let initial = props.items.find(z => z.id === window.location.search.split(`sub-dash-page=`)[1].split("&")[0].replace("__", " "))
                if (initial && initial.onClick) initial.onClick()
            }
        }
    }, [props, history])


    return <div className='vieolo-sub-dashboard'>

        {
            props.subNavbarOptions &&
            <SubNavbarRow
                actions={props.subNavbarOptions ? props.subNavbarOptions.actions : undefined}
                backButtonText={props.subNavbarOptions ? props.subNavbarOptions.backButtonText : undefined}
                center={props.subNavbarOptions ? props.subNavbarOptions.center : undefined}
                midColumnSize={props.subNavbarOptions ? props.subNavbarOptions.midColumnSize : undefined}
                icon={props.subNavbarOptions ? props.subNavbarOptions.icon : undefined}
                onBack={props.subNavbarOptions ? props.subNavbarOptions.onBack : undefined}
                removeBackButton={props.subNavbarOptions ? props.subNavbarOptions.removeBackButton : undefined}
            />
        }


        <div className={`vieolo-sub-dashboard__grid  vieolo-sub-dashboard__grid--${props.subNavbarOptions ? "subnavbar" : 'bare'}`}>
            <div className='vieolo-sub-dashboard__grid__left-col'>
                <List
                    height='100%'
                    title=''
                    itemStyle={props.itemStyle}
                    items={props.items}

                />
            </div>

            <div className="sub-dashboard__grid__right-col">
                {
                    props.children
                        ? props.children
                        : (props.emptyIcon || props.emptyText) &&
                        <div className="sub-dashboard__grid__right-col__empty">
                            {
                                props.emptyIcon &&
                                props.emptyIcon
                            }
                            {
                                props.emptyText &&
                                <Typography type='title-medium' text={props.emptyText} />
                            }                            
                        </div>
                }
            </div>
        </div>
    </div>
}