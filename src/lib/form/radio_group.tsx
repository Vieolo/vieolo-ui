// Vieolo UI
import { useEffect, useRef, useState } from "react";
import Typography from "../typography/typography";

export type RadioButtonType = {
    id: string,
    /** If passing a component, do not add an on click functionality as it is handled by the Radio Button */
    button: string | React.ReactNode
}

export default function RadioGroup(props: {
    value: string,
    options: RadioButtonType[],
    onOptionChange: (o: string) => void,
    direction?: 'vertical' | 'horizontal',
    /** Defaults to 10px */
    horizontalButtonPadding?: number
}) {

    let [container, ] = useState(useRef<HTMLDivElement>(null));
    let [itemKeyboardFocus, setItemKeyboardFocus] = useState<string>(props.options[0].id);
    let itemKeyboardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        const handleClickOutside = (event: MouseEvent) => {
            if (container.current && !(container.current as any).contains(event.target)) {
                setItemKeyboardFocus("");
            }
        }
        
        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    }, [container])

    useEffect(() => {
        if (itemKeyboardFocus && itemKeyboardRef.current) {            
            itemKeyboardRef.current.scrollIntoView({block: 'center'});
        }
    }, [itemKeyboardFocus, itemKeyboardRef])

    function handleOpen(openedByKeyboard?: boolean) {
        if(openedByKeyboard) setItemKeyboardFocus(props.options[0].id);
    };

    let className = `vieolo-radio-group__radio-contents vieolo-radio-group__radio-contents--${props.direction || 'horizontal'}`;

    let buttonClass = 'vieolo-radio-group__radio-button';

    return <div className="vieolo-radio-group">
        <div
            className={className}
            tabIndex={0}
            onClick={()=>handleOpen()}
            onKeyDown={(e) => {
                if (e.code === "ArrowDown" || e.code === "ArrowRight") {
                    if(!itemKeyboardFocus) setItemKeyboardFocus(props.options[0].id);
                    else {
                        let lastIndex = props.options.map(f => f.id).indexOf(itemKeyboardFocus);
                        if ((lastIndex + 1) < props.options.length) {
                            setItemKeyboardFocus(props.options[lastIndex + 1].id);
                            props.onOptionChange(props.options[lastIndex + 1].id);
                        }
                    }
                    e.stopPropagation();
                    e.preventDefault();
                } else if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
                    if(itemKeyboardFocus){
                        e.stopPropagation();
                        e.preventDefault();
                        let lastIndex = props.options.map(f => f.id).indexOf(itemKeyboardFocus);
                        if ((lastIndex - 1) >= 0) {
                            setItemKeyboardFocus(props.options[lastIndex - 1].id);
                            props.onOptionChange(props.options[lastIndex - 1].id);
                        }
                    }
                } else if (e.code === "Tab" || e.code === "Escape") {
                    setItemKeyboardFocus("");
                }
            }}
        >
            {
                props.options.map((o: RadioButtonType) => {
                    return <div 
                        key={o.id} 
                        className={`${buttonClass} ${props.value === o.id ? buttonClass +  "--selected" : ""} ${buttonClass}--${props.direction || 'horizontal'}`} 
                        onClick={() => {
                            props.onOptionChange(o.id);
                        }}
                        style={{
                            padding: `0 ${props.horizontalButtonPadding || 10}px`
                        }}
                    >
                        {
                            typeof o.button === 'string'
                                ? <Typography text={o.button} />
                                : <>
                                    {o.button}
                                </>
                        }
                    </div>
                })
            }
        </div>
    </div>
}