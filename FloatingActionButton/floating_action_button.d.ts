/// <reference types="react" />
import Button from "../Button";
type ButtonPropType = Omit<React.ComponentProps<typeof Button>, "startIcon" | "endIcon" | "a" | "text" | "width" | "type" | "auxiliary">;
export default function FloatingActionButton(props: ButtonPropType & {
    icon: React.ReactNode;
    text?: string;
}): JSX.Element;
export {};
