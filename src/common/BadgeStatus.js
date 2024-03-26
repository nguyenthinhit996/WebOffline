import React from "react";

import { Button } from "@mui/material";
import { STATUS_STASK } from "@/common/Text";

const renderFunctions = (stateInput) => {
  const component = {
    [STATUS_STASK.TODO]: {
      text: STATUS_STASK.TODO,
      variant: "contained",
      color: "primary",
    },
    [STATUS_STASK.IN_PROGRESS]: {
      text: STATUS_STASK.IN_PROGRESS,
      variant: "contained",
      color: "warning",
    },
    [STATUS_STASK.COMPLETED]: {
      text: STATUS_STASK.COMPLETED,
      variant: "contained",
      color: "success",
    },
  };

  const state = component[stateInput] || component[STATUS_STASK.TODO];

  return (
    <Button
      variant={state.variant}
      color={state.color}
      sx={{ borderRadius: 5, cursor: "text", fontSize: { xs: "12px" } }}
      size="small"
    >
      {state.text}
    </Button>
  );
};

function BedgeStatus(props) {
  return renderFunctions(props?.status);
}

export default BedgeStatus;
