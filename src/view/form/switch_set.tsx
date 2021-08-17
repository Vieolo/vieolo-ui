// React
import React, { useEffect, useState } from "react";

// Component
import SwitchSet from "../../lib/form/switch_set";

type switchSetPropsType = React.ComponentProps<typeof SwitchSet>;

export function switchSetOptions(): { [key: string]: switchSetPropsType } {
  let baseProps = {
    title: "",
    on: true,
    onChange: () => {},
    switchID: "",
  };

  return {
    Empty: {
      ...baseProps,
    },
    "With Title": {
      ...baseProps,
      title: "Title",
    },
    "With Subtitle": {
      ...baseProps,
      title: "Title",
      subtitle: "Subtitle",
    },
    Disabled: {
      ...baseProps,
      title: "Title",
      disabled: true,
    },
  };
}

export function SwitchSetCreator(props: { p: switchSetPropsType }) {
  const [switchOn, setSwitchOn] = useState<boolean>(props.p.on);

  return (
    <SwitchSet
      title={props.p.title}
      subtitle={props.p.subtitle}
      on={switchOn}
      onChange={() => setSwitchOn(!switchOn)}
      disabled={props.p.disabled}
      switchID={props.p.switchID}
    />
  );
}
