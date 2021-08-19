// React
import React, { useEffect, useState } from "react";

// Materail UI
import StartIcon from "@material-ui/icons/KeyboardArrowLeftRounded";
import EndIcon from "@material-ui/icons/KeyboardArrowRightRounded";

// Component
import Button from "../../lib/button/button";

type buttonPropsType = React.ComponentProps<typeof Button>;

export function buttonOptions(): { [key: string]: buttonPropsType } {
  let baseProps: buttonPropsType = {
    text: "Button",
    color: "primary",
  };

  return {
    "With Start Icon": {
      ...baseProps,
      startIcon: <StartIcon />,
    },
    "With End Icon": {
      ...baseProps,
      endIcon: <EndIcon />,
    },
    "With icons": {
      ...baseProps,
      startIcon: <StartIcon />,
      endIcon: <EndIcon />,
    },
    "Button -- small": {
      ...baseProps,
      size: "small",
    },
    "Button -- medium": {
      ...baseProps,
      size: "medium",
    },
    "Button -- large": {
      ...baseProps,
      size: "large",
    },
    "Button -- full-width": {
      ...baseProps,
      fullWidth: true,
    },
    "Button -- Text": {
      ...baseProps,
      variant: "text",
    },
    "Button -- Outlined": {
      ...baseProps,
      variant: "outlined",
    },
    "Button -- Contained": {
      ...baseProps,
      variant: "contained",
    },
    "Button -- Submit": {
      ...baseProps,
      type: "submit",
    },
    "Button -- Reset": {
      ...baseProps,
      type: "reset",
    },
    "Button -- lowercase": {
      ...baseProps,
      toLowerCase: true,
    },
    "Button -- Secondary": {
      ...baseProps,
      color: "secondary",
    },
    "Button -- Tertiary": {
      ...baseProps,
      color: "tertiary",
    },
    "Button -- error": {
      ...baseProps,
      color: "error",
    },
    "Button -- Success": {
      ...baseProps,
      color: "success",
    },
    "Button -- alert": {
      ...baseProps,
      color: "alert",
    },
    "Button -- Accessory-blue": {
      ...baseProps,
      color: "accessory-blue",
    },
    "Button -- Accessory-orange": {
      ...baseProps,
      color: "accessory-orange",
    },
    "Button -- Accessory-green": {
      ...baseProps,
      color: "accessory-green",
    },
  };
}

export function ButtonCreator(props: { p: buttonPropsType }) {
  return (
    <Button
      text={props.p.text}
      onClick={() => {}}
      disabled={props.p.disabled}
      color={props.p.color}
      startIcon={props.p.startIcon}
      endIcon={props.p.endIcon}
      fullWidth={props.p.fullWidth}
      size={props.p.size}
      className={props.p.className}
      toLowerCase={props.p.toLowerCase}
      fontSize={props.p.fontSize}
      style={props.p.style}
      type={props.p.type}
      variant={props.p.variant}
    />
  );
}
