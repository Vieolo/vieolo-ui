import TypographyParagraphMedium from "../typography/typography_paragraph_medium";

export type RadioButtonType = {
    id: string,
    button: string | React.ReactNode
}

export default function RadioGroup(props: {
    value: string,
    options: RadioButtonType[],
    onOptionChange: (o: string) => void,
    direction: 'vertical' | 'horizontal',
    horizontalButtonPadding?: number
}) {

    let className = `vieolo-radio-group__radio-contents vieolo-radio-group__radio-contents--${props.direction}`;            

    return <div className="vieolo-radio-group">
        <div className={className}>
            {
                props.options.map((o: RadioButtonType) => {
                    return <div 
                        key={o.id} 
                        className={`vieolo-radio-group__radio-button ${props.value === o.id ? "vieolo-radio-group__radio-button--selected" : ""}`} 
                        onClick={() => {
                            props.onOptionChange(o.id);
                        }}
                        style={{
                            padding: `0 ${props.horizontalButtonPadding || 10}px`
                        }}
                    >
                        {
                            typeof o.button === 'string'
                                ? <TypographyParagraphMedium text={o.button} />
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