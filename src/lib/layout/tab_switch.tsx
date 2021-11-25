// Types
import { BorderRadiusType } from "../private/types";

export default function TabSwitch(props: {
    options: {value: string, title: string}[], 
    value: string, 
    onSelect: (o: string) => void,
    verticalMargin?: number,
    borderRadius?: BorderRadiusType,
    tabWidth?: number
}) {
    let left = 0;
    let anchors: any = [];
    
    props.options.forEach((o: {value: string, title: string}, i: number) => {
        if (o.value === props.value) left = i * (props.tabWidth || 140);

        anchors.push(
            // eslint-disable-next-line
            <a 
                key={o.value}
                className={o.value === props.value ? 'vieolo-tab-switch__tab-nav--active' : ''} 
                onClick={() => {
                    props.onSelect(o.value);        
                }}
                style={{width: props.tabWidth || 140}}
                >
                {o.title}
            </a>
        )
    })
    
    return <div className={`vieolo-tab-switch margin-vertical--${(props.verticalMargin || 10).toString()}`}>
        <nav className="vieolo-tab-switch__tab-nav">
            <div className={`vieolo-tab-switch__selector border-radius--${props.borderRadius || 'half'}`} style={{"left": left.toString() + "px", "width": `${props.tabWidth || 140}px`}}></div>
            {anchors}
        </nav>
    </div>
}