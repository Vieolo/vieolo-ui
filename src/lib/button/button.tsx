// React
import React from "react";

/**
 *
 * @param props
 * @returns a Button component
 */

export default function Button(props: {
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  disabled?: boolean;
  color:
    | "primary"
    | "secondary"
    | "tertiary"
    | "error"
    | "success"
    | "alert"
    | "accessory-blue"
    | "accessory-orange"
    | "accessory-green";
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fullWidth?: boolean;
  size?: "large" | "medium" | "small";
  className?: string;
  toLowerCase?: boolean;
  fontSize?: number;
  style?: React.CSSProperties;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outlined" | "contained";
}) {
  let s: { [key: string]: any } = {};
  let c: string = `vieolo-button`;

  if (props.toLowerCase) {
    s["textTransform"] = "lowercase";
  }

  if (props.fontSize) {
    s["fontSize"] = `${props.fontSize}px`;
  }

  if (props.className) c += " " + props.className;

  if (props.variant) c += " " + props.variant;

  if (props.startIcon && props.endIcon) c += " flex-row-space-between";
  else if (props.startIcon) c += " with-start-icon";
  else if (props.endIcon) c += " with-end-icon";

  if (props.color) {
    c += " " + props.color + "-background";
    c += " ripple-" + props.color;
  }

  if (props.disabled) c += " disabled";

  let size = props.size || "medium";
  s["width"] = "180px";
  if (size === "small") s["width"] = "100px";
  else if (size === "large") s["width"] = "240px";
  if (props.fullWidth) s["width"] = "100%";

  return (
    <button className={c} onClick={props.onClick} style={s}>
      {props.startIcon && <span className="start-icon">{props.startIcon}</span>}
      <p className="button-text">{props.text}</p>
      {props.endIcon && <span className="end-icon">{props.endIcon}</span>}
    </button>
  );
}
