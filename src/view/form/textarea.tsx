// React
import React, { useEffect, useState } from "react";

// Component
import Textarea from "../../lib/form/textarea";

type textareaPropsType = React.ComponentProps<typeof Textarea>;

export function textareaOptions(): { [key: string]: textareaPropsType } {
  let baseProps: textareaPropsType = {
    value: "Value",
    onChange: () => {},
    error: false,
  };

  return {
    Empty: {
      ...baseProps,
      value: "",
    },
    "With Value": {
      ...baseProps,
    },
    "With Error": {
      ...baseProps,
      error: true,
    },
    "With Placeholder": {
      ...baseProps,
      placeholder: "Placeholder",
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
  };
}

export function TextareaCreator(props: { p: textareaPropsType }) {
  const [value, setValue] = useState<string>(props.p.value);

  return (
    <Textarea
      error={props.p.error}
      value={value}
      onChange={(v) => setValue(v)}
      placeholder={props.p.placeholder}
      size={props.p.size}
    />
  );
}
