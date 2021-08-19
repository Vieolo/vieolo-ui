// React
import React, { useEffect, useState } from "react";

// Materail UI
import FileIcon from "@material-ui/icons/InsertDriveFileRounded";

// Component
import FileInput from "../../lib/form/file_input";

type fileInputPropsType = React.ComponentProps<typeof FileInput>;

export function fileInputOptions(): { [key: string]: fileInputPropsType } {
  let baseProps: fileInputPropsType = {
    onChange: () => {},
    onError: () => {},
  };

  return {
    empty: {
      ...baseProps,
    },
    "With Icon": {
      ...baseProps,
      icon: <FileIcon />,
    },
    "With Text": {
      ...baseProps,
      text: "Some Text",
    },
    "With Icon and Text": {
      ...baseProps,
      text: "Some Text",
      icon: <FileIcon />,
    },
  };
}

export function FileInputCreator(props: { p: fileInputPropsType }) {
  return (
    <FileInput
      icon={props.p.icon}
      onChange={() => {}}
      onError={() => {}}
      text={props.p.text}
      multiple={props.p.multiple}
      accept={props.p.accept}
      validateFileName={props.p.validateFileName}
    />
  );
}
