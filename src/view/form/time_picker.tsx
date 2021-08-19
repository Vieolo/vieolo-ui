// React
import React, { useEffect, useState } from "react";

// Component
import TimePicker from "../../lib/form/time_picker";

type timePickerPropsType = React.ComponentProps<typeof TimePicker>;

export function timePickerOptions(): { [key: string]: timePickerPropsType } {
  let baseProps: timePickerPropsType = {
    onChange: (v) => {},
    value: "00:00",
  };

  return {
    Empty: {
      ...baseProps,
      value: "",
    },
    "With Label": {
      ...baseProps,
      label: "Label",
    },
  };
}

export function TimePickerCreator(props: { p: timePickerPropsType }) {
  const [value, setValue] = useState<number | string>(props.p.value);

  return (
    <TimePicker
      value={typeof value === "number" ? value.toString() : value}
      onChange={(v) => setValue(v)}
      label={props.p.label}
      disabled={props.p.disabled}
      tip={props.p.tip}
    />
  );
}
