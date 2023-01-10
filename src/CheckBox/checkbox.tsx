export default function Checkbox(props: {
    value: boolean,
    onChange: (v: boolean) => void,
    disabled?: boolean,
    ariaLabel?: string
}) {
    return <div
        className={`vieolo-checkbox ${props.disabled ? 'disabled' : ''}`}        
    >
        <input 
            type="checkbox" 
            checked={props.value} 
            onChange={e => {
                e.stopPropagation();
                if (props.disabled) return;
                props.onChange(!props.value);
            }} 
            aria-label={props.ariaLabel} />
    </div>
}