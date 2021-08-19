// React
import React, { useEffect, useState } from "react";

// Component
import Switch from "../../lib/form/switch";

type switchPropsType = React.ComponentProps<typeof Switch>;

export function switchOptions(): { [key: string]: switchPropsType } {
  const baseProps = {
    switchID: "",
    on: true,
    onChange: () => {},
  };

  return {
    Empty: {
      ...baseProps,
    },
    Disabled: {
      ...baseProps,
      disabled: true,
    },
  };
}

export function SwitchCreator(props: { p: switchPropsType }) {
  const [switchOn, setSwitchOn] = useState<boolean>(props.p.on);

  return (
    <Switch
      switchID={props.p.switchID}
      on={switchOn}
      onChange={() => setSwitchOn(!switchOn)}
      disabled={props.p.disabled}
    />
  );
}
