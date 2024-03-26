"use client";
import { STEP } from "@/common/Text";
import { createContext, useState } from "react";

export const StepActionContext = createContext({
  stepAction: STEP.VIEW_DETAIL,
  setStepAction: () => {},
});

export const StepActionProvider = ({ children }) => {
  const [stepAction, setStepAction] = useState(STEP.VIEW_DETAIL);

  return (
    <StepActionContext.Provider value={{ stepAction, setStepAction }}>
      {children}
    </StepActionContext.Provider>
  );
};
