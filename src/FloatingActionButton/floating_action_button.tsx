// Vieolo UI
import Button from "../Button";


type ButtonPropType = Omit<React.ComponentProps<typeof Button>, "startIcon" | "endIcon" | "a" | "text" | "width" | "type" | "auxiliary"> 


export default function FloatingActionButton(props: ButtonPropType & {
    icon: React.ReactNode,
    text?: string,
}) {
    return <div className="vieolo-floating-action-button">
        <Button 
            {...props}
            text={props.text || ""}
            startIcon={props.icon}
            emphasis={props.emphasis || 'high'}
        />
    </div>
}
