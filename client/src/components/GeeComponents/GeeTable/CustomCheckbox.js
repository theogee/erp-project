import React from "react";

import Checkbox from "@mui/material/Checkbox";

export default function CustomCheckbox(props) {
  const handleOnChange = () => {
    props.onChange(props.value);
  };

  return (
    <Checkbox
      color="primary"
      size="small"
      checked={props.value === props.selected}
      onChange={handleOnChange}
    />
  );
}
