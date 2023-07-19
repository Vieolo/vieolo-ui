export default function Checkbox(props: {
    value: boolean,
    onChange: (v: boolean) => void,
    disabled?: boolean,
    ariaLabel?: string,
    removeTabIndex?: boolean,
    /** defaults to square */
    type?: 'square' | 'round'
}) {
    return <div
        className={`vieolo-checkbox vieolo-checkbox--${props.type === 'round' ? 'round' : 'square'} ${props.disabled ? 'disabled' : ''}`}        
    >
        <input 
            type="checkbox" 
            checked={props.value} 
            tabIndex={props.removeTabIndex ? -1 : undefined}
            onChange={e => {
                e.stopPropagation();
                if (props.disabled) return;
                props.onChange(!props.value);
            }} 
            aria-label={props.ariaLabel} />
    </div>
}