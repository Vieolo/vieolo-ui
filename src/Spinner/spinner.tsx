// Types
import { ColorOptionType } from "../types/types"

export default function Spinner(props: {
    color?: ColorOptionType,
    size?: 'extra-small' | 'small' | 'medium' | 'large',
    colorType?: 'normal' | 'text' | 'text-light' | 'light'
}) {        
    
    return <svg className={`vieolo-spinner vieolo-spinner--${props.size || 'medium'}`} viewBox="0 0 50 50">
        <circle className={`vieolo-spinner__path vieolo-spinner__path--${props.color || 'primary'}-${props.colorType || 'normal'}`} cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
    </svg>
}