// React
import React from "react";

/**
 *
 * @param props
 * @returns returns an icon button component
 */

export default function IconButton(props: {
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "background"
    | "alert"
    | "error"
    | "success"
    | "accessory-orange"
    | "accessory-blue"
    | "accessory-green";
  className?: string;
  disabled?: boolean;
  size?: "small" | "medium";
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon: React.ReactNode;
  tooltip?: string;
  tooltipPosition?:
    | "up"
    | "down"
    | "left"
    | "right"
    | "up-left"
    | "up-right"
    | "down-left"
    | "down-right";
}) {
  let rippleClass: string = `ripple-${props.color || "primary"}`;
  let hoverClass: string = `hover-${props.color || "primary"}`;
  let colorClass = `${props.color || "primary"}-color`;

  let className = `vieolo-icon-button ${colorClass} ${rippleClass} ${hoverClass} ${
    props.className || ""
  }`;

  if (props.tooltip) className += " vieolo-tooltip";

  if (props.size === "small") className += " vieolo-icon-button-small";

  if (props.disabled) className += " disabled";

  return (
    <button className={className} onClick={props.onClick}>
      {props.icon}
      {props.tooltip && (
        <div className={`tooltip-text-${props.tooltipPosition || "up"}`}>
          {props.tooltip}
        </div>
      )}
    </button>
  );
}
