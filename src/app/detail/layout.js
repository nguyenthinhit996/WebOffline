"use client";
import FullScreenDialog from "@/common/DialogNotificationFullScreen";
import NavBar from "@/components/common/NavBar";
import { useTheme, useMediaQuery } from "@mui/material";
import { Guard } from "@/components/common/Guard.js";
import { useContext } from "react";
import { StepActionContext } from "@/context/StepContext";
import { STEP } from "@/common/Text";
export default function TaskLayout({ children }) {
  const theme = useTheme(); // Access the theme for breakpoint values

  // Define your media queries using MUI's breakpoint functions or custom queries
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Up to medium size screens

  const { stepAction } = useContext(StepActionContext);

  return (
    <Guard>
      {stepAction === STEP.VIEW_DETAIL && <NavBar />}
      {isMobile && <FullScreenDialog />}
      {children}
    </Guard>
  );
}
