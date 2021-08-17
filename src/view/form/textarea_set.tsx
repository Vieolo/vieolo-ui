// React
import React, { useEffect, useState } from "react";

// Component
import TextareaSet from "../../lib/form/textarea_set";

type textareaSetPropsType = React.ComponentProps<typeof TextareaSet>;

export function textareaSetOptions(): { [key: string]: textareaSetPropsType } {
  let baseProps: textareaSetPropsType = {
    error: false,
    label: "Label",
    onChange: (v) => {},
    value: "Value",
  };

  return {
    Empty: {
      ...baseProps,
      value: "",
    },
    "With Error": {
      ...baseProps,
      error: true,
    },
    Disabled: {
      ...baseProps,
      disabled: true,
    },
    "With Placeholder": {
      ...baseProps,
      value: "",
      placeholder: "Search...",
    },
    "Size -- Small": {
      ...baseProps,
      size: "small",
    },
    "Size -- Medium": {
      ...baseProps,
      size: "medium",
    },
    "Size -- Large": {
      ...baseProps,
      size: "large",
    },
    "Size -- Full Width": {
      ...baseProps,
      size: "full",
    },
    "With Tip": {
      ...baseProps,
      tip: "This is a tip displayed to the user",
    },
  };
}

export function TextareaSetCreator(props: { p: textareaSetPropsType }) {
  let [value, setValue] = useState<string>(props.p.value);

  useEffect(() => {
    setValue(props.p.value);
  }, [props.p.value]);

  return (
    <TextareaSet
      error={props.p.error}
      label={props.p.label}
      onChange={(v) => setValue(v)}
      value={value}
      disabled={props.p.disabled}
      placeholder={props.p.placeholder}
      size={props.p.size}
      tip={props.p.tip}
    />
  );
}
