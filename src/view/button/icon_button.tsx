// React
import React from "react";

// Materail UI
import RestoreIcon from "@material-ui/icons/SettingsBackupRestoreRounded";

// Component
import IconButton from "../../lib/button/icon_button";

type iconButtonPropsType = React.ComponentProps<typeof IconButton>;

export function iconButtonOptions(): { [key: string]: iconButtonPropsType } {
  let baseProps: iconButtonPropsType = {
    onClick: () => {},
    icon: <RestoreIcon />,
  };

  return {
    Empty: {
      ...baseProps,
    },
    Disabled: {
      ...baseProps,
      disabled: true,
    },
    "Icon Button -- small": {
      ...baseProps,
      size: "small",
    },
    "Icon Button -- medium": {
      ...baseProps,
      size: "medium",
    },
    "With Tooltip": {
      ...baseProps,
      tooltip: "Tool Tip for user",
    },
    "Tooltip -- up": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "up",
    },
    "Tooltip -- down": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "down",
    },
    "Tooltip -- left": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "left",
    },
    "Tooltip -- right": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "right",
    },
    "Tooltip -- up-left": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "up-left",
    },
    "Tooltip -- up-right": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "up-right",
    },
    "Tooltip -- down-left": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "down-left",
    },
    "Tooltip -- down-right": {
      ...baseProps,
      tooltip: "Tool Tip for user",
      tooltipPosition: "down-right",
    },
    "Icon Button -- Secondary": {
      ...baseProps,
      color: "secondary",
    },
    "Icon Button -- Tertiary": {
      ...baseProps,
      color: "tertiary",
    },
    "Icon Button -- error": {
      ...baseProps,
      color: "error",
    },
    "Icon Button -- Success": {
      ...baseProps,
      color: "success",
    },
    "Icon Button -- alert": {
      ...baseProps,
      color: "alert",
    },
    "Icon Button -- Accessory-blue": {
      ...baseProps,
      color: "accessory-blue",
    },
    "Icon Button -- Accessory-orange": {
      ...baseProps,
      color: "accessory-orange",
    },
    "Icon Button -- Accessory-green": {
      ...baseProps,
      color: "accessory-green",
    },
  };
}

export function IconButtonCreator(props: { p: iconButtonPropsType }) {
  return (
    <IconButton
      color={props.p.color}
      className={props.p.className}
      disabled={props.p.disabled}
      size={props.p.size}
      onClick={() => {}}
      icon={props.p.icon}
      tooltip={props.p.tooltip}
      tooltipPosition={props.p.tooltipPosition}
    />
  );
}
