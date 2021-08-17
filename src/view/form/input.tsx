// React
import React, { useEffect, useState } from "react";

// Component
import Input from "../../lib/form/input";

type inputPropsType = React.ComponentProps<typeof Input>;

export function inputOptions(): { [key: string]: inputPropsType } {
  let baseProps = {
    value: "Value",
    onChange: () => {},
    error: false,
  };

  return {
    "With Error": {
      ...baseProps,
      error: true,
    },
    Empty: {
      ...baseProps,
      value: "",
    },
    "With Placehoder": {
      ...baseProps,
      placeholder: "placeholder...",
      value: "",
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
    "Type -- Number": {
      ...baseProps,
      type: "number",
    },
    "Type -- Password": {
      ...baseProps,
      type: "password",
    },
  };
}

export function InputCreator(props: { p: inputPropsType }) {
  let [value, setValue] = useState<string>(props.p.value);

  useEffect(() => {
    setValue(props.p.value);
  }, [props.p.value]);

  return (
    <Input
      value={value}
      placeholder={props.p.placeholder}
      onChange={(v) => setValue(v)}
      error={props.p.error}
      size={props.p.size}
      type={props.p.type}
    />
  );
}
