import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material";
import { useTheme, useMediaQuery } from "@mui/material";

const steps = ["To WareHouse", "To Customer", "To Station"];

const StyleStepLabel = styled(StepLabel)(({ theme }) => ({
  "& .MuiSvgIcon-root.Mui-active": {
    color: theme.palette.buttonPrimary.hover,
  },
  "& .MuiSvgIcon-root.Mui-completed": {
    color: theme.palette.buttonPrimary.main,
  },
}));

export default function HorizontalLinearStepper(props) {
  const { activeStep, stepProps = {}, labelProps = {} } = props || 1;

  const theme = useTheme(); // Access the theme for breakpoint values

  // Define your media queries using MUI's breakpoint functions or custom queries
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Up to medium size screens

  return (
    <Box sx={{ width: "100%", paddingLeft: "1rem", paddingRight: "1rem" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => {
          return (
            <Step key={label} {...stepProps}>
              <StyleStepLabel
                StepIconProps={{ fontSize: "large" }}
                {...labelProps}
              >
                {!isMobile && label}
              </StyleStepLabel>
            </Step>
          );
        })}
      </Stepper>
    </Box>
  );
}
