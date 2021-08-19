// React
import React, { useEffect, useState } from "react";

// Materail UI

// Component
import ItemRow from "../../lib/list/item_row";

type itemRowPropsType = React.ComponentProps<typeof ItemRow>;

export function itemRowOptions(): { [key: string]: itemRowPropsType } {
  let baseProps: itemRowPropsType = {
    title: "Items Row",
  };
  return {
    "Primary Button Color": {
      ...baseProps,
      buttonColor: "primary",
    },
  };
}

export function ItemRowCreator(props: { p: itemRowPropsType }) {
  return (
    <div>
      <ItemRow
        title={props.p.title}
        subTitle={props.p.subTitle}
        onClick={() => {}}
        selected={props.p.selected}
        leadingIcon={props.p.leadingIcon}
        buttonIcon={props.p.buttonIcon}
        buttonClick={() => {}}
        buttonSize={props.p.buttonSize}
        buttonColor={props.p.buttonColor}
        cardStyle={props.p.cardStyle}
      />
    </div>
  );
}
